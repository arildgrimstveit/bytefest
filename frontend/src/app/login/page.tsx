"use client";

import { LoginForm } from "@/components/LoginForm"
import { useRouter } from "next/navigation";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState, useCallback } from "react";
import { InteractionStatus } from "@azure/msal-browser";

export default function LoginPage() {
    const router = useRouter();
    const { instance, inProgress, accounts } = useMsal();
    const [isRedirectHandled, setIsRedirectHandled] = useState(false);

    // Handle authentication success with proper state management
    const handleAuthSuccess = useCallback(() => {
        // Trigger a re-render of the app
        window.dispatchEvent(new Event('msal:login:complete'));

        let intent = localStorage.getItem('loginRedirectIntent');
        localStorage.removeItem('loginRedirectIntent'); // Clear from local storage once read
        localStorage.removeItem('returnToFormAfterLogin'); // Clean up old one too

        // If not found in localStorage, check current URL params (e.g., from /program redirecting here)
        if (!intent) {
            const params = new URLSearchParams(window.location.search);
            intent = params.get('intent');
        }

        if (intent === 'program') {
            router.push("/program");
        } else if (intent === 'paamelding') {
            router.push("/paamelding");
        } else {
            router.push("/");
        }
    }, [router]);

    // Handle MSAL redirect once on component mount
    useEffect(() => {
        if (isRedirectHandled) {
            return;
        }
        if (inProgress !== InteractionStatus.None) {
            return;
        }
        setIsRedirectHandled(true);
        (async () => {
            try {
                const response = await instance.handleRedirectPromise();
                if (response?.account) {
                    instance.setActiveAccount(response.account);
                    handleAuthSuccess();
                } else {
                    if (accounts.length > 0) {
                        instance.setActiveAccount(accounts[0]);
                        handleAuthSuccess();
                    } else {
                        // No account found, ready for login
                    }
                }
            } catch (error) {
                console.error("Error handling redirect:", error);
            }
        })();
    }, [instance, handleAuthSuccess, inProgress, isRedirectHandled, accounts]);

    return (
        <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4 mb-12 sm:mb-0">
            <div className="w-full max-w-sm mt-8 sm:mt-0">
                <LoginForm
                    title="Velkommen"
                />
            </div>
        </div>
    )
}