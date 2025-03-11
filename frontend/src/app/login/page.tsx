"use client";

import { LoginForm } from "@/components/LoginForm"
import {useRouter} from "next/navigation";
import {useMsal} from "@azure/msal-react";
import {useEffect} from "react";
import {InteractionStatus} from "@azure/msal-browser";
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
                    }
                } catch (error) {
                    console.error("Error during authentication:", error);
                }
            })();
        }
    }, [instance, router, inProgress]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-neutral-100 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}