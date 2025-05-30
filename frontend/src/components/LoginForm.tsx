"use client";

import Image from "next/image"
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "@/config/AuthConfig";
import { LoginFormProps } from "@/types/props";

export function LoginForm({
  title = "Velkommen",
  buttonText = "Logg Inn",
  className,
  ...props
}: LoginFormProps) {
  const { instance, inProgress } = useMsal();

  const handleLogin = async () => {
    // Only proceed if no interaction is in progress
    if (inProgress !== InteractionStatus.None) {
      console.log("Login already in progress, status:", inProgress);
      return;
    }
    
    try {
      console.log("Starting login process from button click");
      
      const params = new URLSearchParams(window.location.search);
      const intentValue = params.get('intent');

      if (intentValue) {
        localStorage.setItem('loginRedirectIntent', intentValue);
        console.log(`Login intent found: ${intentValue}. Stored in localStorage.`);
        // Clean up old paamelding-specific flag if it exists
        localStorage.removeItem('returnToFormAfterLogin'); 
      } else {
        localStorage.removeItem('loginRedirectIntent');
        // Also ensure old flag is cleared if no new intent
        localStorage.removeItem('returnToFormAfterLogin');
      }

      // Use loginRedirect with minimal configuration
      await instance.loginRedirect({
        ...loginRequest,
        onRedirectNavigate: (url) => {
          // This callback is triggered right before redirect
          console.log("Redirecting to login provider:", url);
          return true; // Return true to allow the redirect
        }
      });
    } catch (error) {
      console.error("Failed to initiate login:", error);
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
              disabled={inProgress !== InteractionStatus.None}
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