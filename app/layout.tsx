import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Whop Auth App',
  description: 'Next.js 13 app with Whop authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}