'use client';

import '../styles/globals.css';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { useAuth } from '@/hooks/useAuth';

export default function RootLayout({ children }: { children: ReactNode }) {
    const { isInitialized, msalInstance } = useAuth();

    if (!isInitialized) {
        return <html lang="en"><body><div>Initializing...</div></body></html>;
    }

    return (
        <html lang="en">
            <body>
                <MsalProvider instance={msalInstance}>
                    <Header />
                    <main>{children}</main>
                </MsalProvider>
            </body>
        </html>
    );
}