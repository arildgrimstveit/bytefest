"use client";

import { LoginForm } from "@/components/LoginForm"
import {useRouter, useSearchParams} from "next/navigation";
import {useMsal} from "@azure/msal-react";
import {useEffect, useState, useCallback} from "react";
import {InteractionStatus} from "@azure/msal-browser";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { instance, inProgress, accounts } = useMsal();
    const [isRedirectHandled, setIsRedirectHandled] = useState(false);

    // Handle authentication success with proper state management
    const handleAuthSuccess = useCallback(() => {
        // Trigger a re-render of the app
        window.dispatchEvent(new Event('msal:login:complete'));
        
        // Check if we should redirect back to the registration form (now /paamelding)
        const shouldRedirectToForm = localStorage.getItem('returnToFormAfterLogin') === 'true';
        
        // Clear the flag
        localStorage.removeItem('returnToFormAfterLogin');
        
        // Navigate to the appropriate page
        if (shouldRedirectToForm) {
            router.push("/paamelding"); // Corrected redirect target
        } else {
            router.push("/");
        }
    }, [router]);

    // Handle MSAL redirect once on component mount
    useEffect(() => {
        // Skip if we've already handled the redirect
        if (isRedirectHandled) {
            return;
        }

        // Only process when interaction status is None
        if (inProgress !== InteractionStatus.None) {
            return;
        }

        // Set flag to prevent multiple processing attempts
        setIsRedirectHandled(true);
        
        // Handle redirect response
        (async () => {
            try {
                console.log("Attempting to handle redirect response");
                const response = await instance.handleRedirectPromise();
                
                if (response?.account) {
                    // Valid account returned from redirect flow
                    console.log("Redirect handled with account", response.account.username);
                    instance.setActiveAccount(response.account);
                    handleAuthSuccess();
                } else {
                    // No redirect response, check for existing session
                    if (accounts.length > 0) {
                        // User is already logged in
                        console.log("User already logged in", accounts[0].username);
                        instance.setActiveAccount(accounts[0]);
                        handleAuthSuccess();
                    } else {
                        console.log("No account found, ready for login");
                    }
                }
            } catch (error) {
                console.error("Error handling redirect:", error);
            }
        })();
    }, [instance, handleAuthSuccess, inProgress, isRedirectHandled, accounts]);

    useEffect(() => {
        // Check accounts array to see if user is logged in
        if (inProgress === InteractionStatus.None && accounts && accounts.length > 0) {
            const shouldRedirect = searchParams.get("from") === "registerSpeaker";
            // Check if we should redirect to the paamelding page (previously bli-foredragsholder)
            if (shouldRedirect) {
                // Or just redirect directly if user is already authenticated via accounts array check
                console.log("Redirecting authenticated user from login to paamelding page.");
                router.push("/paamelding"); // Changed target page
            } else {
                // If authenticated and not coming from registerSpeaker, redirect away from login
                console.log("User is authenticated, redirecting away from login page.");
                router.push("/"); 
            }
        }
    }, [router, searchParams, inProgress, accounts]);

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