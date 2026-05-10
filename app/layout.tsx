import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DinoBot - Générateur de Fiches de Révision',
  description: 'Créez des fiches de révision intelligemment avec DinoBot, votre assistant pédagogique IA.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen`}>
        {children}
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: 'oklch(0.16 0.02 270)',
              color: 'oklch(0.98 0 0)',
              border: '1px solid oklch(0.28 0.02 270)',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
