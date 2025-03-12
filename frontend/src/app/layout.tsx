'use client';

import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { useAuth } from '@/hooks/useAuth';
import { UserProvider } from '@/components/UserContext';

export default function RootLayout({ children }: { children: ReactNode }) {
    const { isInitialized, msalInstance } = useAuth();

    if (!isInitialized) {
        return <html lang="en"><body><div>Initializing...</div></body></html>;
    }

    return (
        <html lang="en">
            <body>
                <MsalProvider instance={msalInstance}>
                    <UserProvider>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </UserProvider>
                </MsalProvider>
            </body>
        </html>
    );
}