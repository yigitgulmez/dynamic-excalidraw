import NextAuth, { DefaultSession } from "next-auth"

export type Storages = {
  github?: {
    enabled: boolean
    path?: string
  }
  googleDrive?: {
    enabled: boolean
    folderId?: string
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      name: string
      email: string
      createdAt: string
      storages: Storages
      image?: string
    } & DefaultSession["user"]
    accessToken?: string
  }

  interface User {
    id: string
    username: string
    name: string
    email: string
    createdAt: string
    storages: Storages
  }
}
