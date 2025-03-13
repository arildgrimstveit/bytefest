"use client";

import { LoginForm } from "@/components/LoginForm"
import {useRouter} from "next/navigation";
import {useMsal} from "@azure/msal-react";
import {useEffect, useState} from "react";
import {InteractionStatus} from "@azure/msal-browser";
// loginRequest is only needed for explicit login, which happens in the LoginForm component
// import {loginRequest} from "@/config/AuthConfig";

export default function LoginPage() {
    const router = useRouter();
    const { instance, inProgress } = useMsal();
    const [isProcessingAuth, setIsProcessingAuth] = useState(false);

    useEffect(() => {
        // Centralized function to handle successful authentication
        const handleAuthSuccess = () => {
            // Trigger a re-render of the app
            window.dispatchEvent(new Event('msal:login:complete'));
            
            // Check if we should redirect to bli-foredragsholder page
            const shouldRedirectToForm = localStorage.getItem('returnToFormAfterLogin') === 'true';
            
            // Clear the flag
            localStorage.removeItem('returnToFormAfterLogin');
            
            // Navigate to the appropriate page
            if (shouldRedirectToForm) {
                router.push("/bli-foredragsholder");
            } else {
                router.push("/");
            }
        };

        if (inProgress === InteractionStatus.None && !isProcessingAuth) {
            (async () => {
                try {
                    setIsProcessingAuth(true);
                    const response = await instance.handleRedirectPromise();
                    
                    // Handle successful authentication redirect response
                    if (response?.account) {
                        instance.setActiveAccount(response.account);
                        handleAuthSuccess();
                    } else {
                        // Check for existing sessions
                        const accounts = instance.getAllAccounts();
                        if (accounts.length > 0) {
                            // If user is already logged in, use the first (active) MS account
                            instance.setActiveAccount(accounts[0]);
                            handleAuthSuccess();
                        } else {
                            setIsProcessingAuth(false);
                        }
                    }
                } catch (error) {
                    console.error("Error during authentication:", error);
                    setIsProcessingAuth(false);
                }
            })();
        }
    }, [instance, router, inProgress, isProcessingAuth]);

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