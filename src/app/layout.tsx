import { Fira_Code } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Dynamic Excalidraw',
  description: '',
  robots: 'all',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Dynamic Excalidraw',
    description: '',
    url: '/en',
    siteName: 'Dynamic Excalidraw',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Dynamic Excalidraw',
        type: 'image/png',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dynamic Excalidraw',
    description: '',
    images: ['/android-chrome-512x512.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${firaCode.variable} antialiased`}>
        <Providers  >
          {children}
        </Providers>
      </body>
    </html>
  );
}
