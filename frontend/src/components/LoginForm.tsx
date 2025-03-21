"use client";

import Image from "next/image"
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "@/config/AuthConfig";
import { usePathname } from "next/navigation";
import { LoginFormProps } from "@/types/props";

export function LoginForm({
  title = "Velkommen",
  buttonText = "Logg Inn",
  className,
  ...props
}: LoginFormProps) {
  const { instance, inProgress } = useMsal();
  const currentPath = usePathname();

  const handleLogin = async () => {
    if (inProgress === InteractionStatus.None) {
      try {
        // First clear any existing redirect flags to prevent unintended redirects
        localStorage.removeItem('returnToFormAfterLogin');
        
        // Only set the redirect flag if we're on the bli-foredragsholder page
        if (currentPath.includes('/bli-foredragsholder')) {
          localStorage.setItem('returnToFormAfterLogin', 'true');
          console.log("Set returnToFormAfterLogin flag for bli-foredragsholder");
        } else {
          console.log("Login from regular page, will redirect to homepage");
        }

        // Get the current URI to use as redirect
        const redirectUri = window.location.origin;
        
        // Log the login attempt
        console.log('Attempting login with:', {
          redirectUri,
          currentPath,
          windowLocation: window.location.href,
          timestamp: new Date().toISOString()
        });

        // Use loginRedirect with explicit configuration
        await instance.loginRedirect({
          ...loginRequest,
          redirectUri,
          prompt: 'select_account',
          extraQueryParameters: {
            login_hint: 'user@soprasteria.com'
          }
        });
        
      } catch (error) {
        console.error("Login failed:", {
          error,
          timestamp: new Date().toISOString(),
          location: window.location.href
        });
      }
    } else {
      console.log('Login in progress, current status:', inProgress);
    }
  };
  
  return (
    <div className={`flex flex-col gap-6 ${className || ''}`} {...props}>
      <div className="relative">
        {/* Orange shadow rectangle with custom color #FFAB5F */}
        <div className="absolute bg-[#FFAB5F] w-full h-full translate-x-1 translate-y-1"></div>
        
        {/* White main container */}
        <div className="relative bg-white p-6 sm:p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl argent text-[#2A1449]">{title}</h2>
            <p className="text-[#2A1449] mt-4 sm:mt-6">
              Logg inn med din Sopra Steria-konto
            </p>
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-center">
            <button
              className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
              onClick={handleLogin}
            >
              <Image
                src="/images/LoggInn.svg"
                alt={buttonText}
                width={299}
                height={59}
                priority
                style={{ width: '226px', height: 'auto' }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}