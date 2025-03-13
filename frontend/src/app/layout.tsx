'use client';

import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode, useState, useEffect } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '@/config/AuthConfig';
import { UserProvider } from '@/components/UserContext';

// Initialize MSAL outside of component to ensure it's only created once
const msalInstance = new PublicClientApplication(msalConfig);

export default function RootLayout({ children }: { children: ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);
    
    useEffect(() => {
        msalInstance.initialize().then(() => {
            setIsInitialized(true);
        });
    }, []);

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