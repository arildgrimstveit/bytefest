import { useEffect, useState } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '@/config/AuthConfig';
import { useRouter, usePathname } from 'next/navigation';

const msalInstance = new PublicClientApplication(msalConfig);

export const useAuth = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const isAuthenticated = useIsAuthenticated();
    const [isBrowser, setIsBrowser] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    useEffect(() => {
        msalInstance.initialize().then(() => {
            setIsInitialized(true);
        });
    }, []);

    /* TODO useEffect(() => {
        if (isBrowser && !isAuthenticated && pathname !== '/login') {
            router.push('/login'); // Redirect to /login if not authenticated
        }
    }, [isAuthenticated, isBrowser, pathname, router]);
    */

    return { isInitialized, msalInstance };
};
