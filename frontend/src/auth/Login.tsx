'use client';

import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import { InteractionStatus } from "@azure/msal-browser";
import {loginRequest} from "@/config/AuthConfig";

export default function LoginPage() {
    const router = useRouter();
    const { instance, inProgress } = useMsal();

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            (async () => {
                try {
                    const response = await instance.handleRedirectPromise();
                    if (response?.account) {
                        instance.setActiveAccount(response.account);
                        router.push("/");
                    } else {
                        // Silent SSO hvis ingen respons
                        const accounts = instance.getAllAccounts();
                        if (accounts.length > 0) {
                            // Om bruker allerede er logget inn, logg inn paa foerste MS acc (aktive)
                            instance.setActiveAccount(accounts[0]);
                            router.push("/");
                        } else {
                            await instance.loginRedirect(loginRequest);
                        }
                    }
                } catch (error) {
                    console.error("Error during authentication:", error);
                }
            })();
        }
    }, [instance, router, inProgress]);

    return (
        <div className="min-h-screen">
            <LoginForm />
        </div>
    );
}