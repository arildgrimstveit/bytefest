'use client';

import '../styles/globals.css';
import { AuthProvider } from "@/config/AuthConfig";
import { UserProvider } from '@/components/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UserProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  )
}