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
        if (inProgress === InteractionStatus.None && !isProcessingAuth) {
            (async () => {
                try {
                    setIsProcessingAuth(true);
                    const response = await instance.handleRedirectPromise();
                    if (response?.account) {
                        console.log("Login page: Authentication successful, setting active account");
                        instance.setActiveAccount(response.account);
                        
                        // Force a re-render of the app by triggering a small state change and dispatching an event
                        // This is critical to ensure the header and UserAvatar update properly
                        window.setTimeout(() => {
                            console.log("Login page: Dispatching login complete event");
                            window.dispatchEvent(new Event('msal:login:complete'));
                            
                            // Check if we should redirect to bli-foredragsholder page
                            const shouldRedirectToForm = localStorage.getItem('returnToFormAfterLogin') === 'true';
                            if (shouldRedirectToForm) {
                                // Clear the flag
                                localStorage.removeItem('returnToFormAfterLogin');
                                router.push("/bli-foredragsholder");
                            } else {
                                router.push("/");
                            }
                        }, 100);
                    } else {
                        // Silent SSO if no response
                        const accounts = instance.getAllAccounts();
                        if (accounts.length > 0) {
                            // If user is already logged in, use the first (active) MS account
                            console.log("Login page: User already authenticated, setting active account");
                            instance.setActiveAccount(accounts[0]);
                            
                            // Also dispatch event for this case to ensure UI updates
                            window.setTimeout(() => {
                                console.log("Login page: Dispatching login complete event");
                                window.dispatchEvent(new Event('msal:login:complete'));
                                
                                // Check if we should redirect to bli-foredragsholder page
                                const shouldRedirectToForm = localStorage.getItem('returnToFormAfterLogin') === 'true';
                                if (shouldRedirectToForm) {
                                    // Clear the flag
                                    localStorage.removeItem('returnToFormAfterLogin');
                                    router.push("/bli-foredragsholder");
                                } else {
                                    router.push("/");
                                }
                            }, 100);
                        } else {
                            setIsProcessingAuth(false);
                        }
                        // Otherwise, stay on login page for manual login
                    }
                } catch (error) {
                    console.error("Error during authentication:", error);
                    setIsProcessingAuth(false);
                }
            })();
        }
    }, [instance, router, inProgress, isProcessingAuth]);

  return (
    <div className="flex min-h-[calc(100vh-99px)] items-center justify-center -mt-[99px] pt-[99px]">
      <div className="w-full max-w-sm">
        <LoginForm 
          title="Velkommen" 
        />
      </div>
    </div>
  )
}