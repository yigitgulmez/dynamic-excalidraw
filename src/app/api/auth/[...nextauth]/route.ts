import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/utils/mongodb'
import crypto from 'crypto'
import { Storages } from '@/types'

const ALGORITHM = 'aes-256-gcm'
const KEY = Buffer.from(process.env.TOKEN_SECRET!, 'hex')
const IV_LENGTH = 16

function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag().toString('hex')
  return `${iv.toString('hex')}:${authTag}:${encrypted}`
}

function decrypt(data: string) {
  const [ivHex, authTagHex, encrypted] = data.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
  decipher.setAuthTag(authTag)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/drive.file',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          username: profile.email.split('@')[0],
          name: profile.name,
          email: profile.email,
          createdAt: new Date().toISOString(),
          storages: { googleDrive: { enabled: true } },
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: { params: { scope: 'read:user repo user:email' } },
      async profile(profile, tokens) {
        // GitHub primary email yoksa ek API çağrısı yapabilirsin
        const email = profile.email || (tokens?.access_token ? await fetchGitHubEmail(tokens.access_token) : null)
        return {
          id: profile.id.toString(),
          username: profile.login,
          name: profile.name,
          email: email || '',
          createdAt: new Date().toISOString(),
          storages: { github: { enabled: true } },
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.access_token) {
        token.accessToken = encrypt(account.access_token)
      }
      if (user) {
        token.user = { ...user, image: user.image || null } // image runtime
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        const u = token.user as {
          id: string
          username: string
          name: string
          email: string
          createdAt: string
          storages: Storages
          image?: string
        }

        session.user = {
          ...u,
          image: u.image ?? undefined,
        }
      }

      if (token.accessToken && typeof token.accessToken === 'string') {
        try {
          session.accessToken = decrypt(token.accessToken)
        } catch (e) {
          console.error('Token decrypt error:', e)
          session.accessToken = undefined
        }
      }

      return session
    }
  },
})

export { handler as GET, handler as POST }

async function fetchGitHubEmail(accessToken: string) {
  const res = await fetch('https://api.github.com/user/emails', {
    headers: { Authorization: `token ${accessToken}` },
  })
  const emails: { email: string; primary: boolean }[] = await res.json()
  const primary = emails.find(e => e.primary)
  return primary?.email || emails[0]?.email || null
}
