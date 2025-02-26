"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
  redirectUrl?: string;
  buttonText?: string;
}

export function LoginForm({
  className,
  title = "Velkommen",
  redirectUrl = "/",
  buttonText = "Logg Inn",
  ...props
}: LoginFormProps) {
  const router = useRouter();
  
  const handleLogin = () => {
    // In a real app, this would authenticate the user
    console.log("SSO login initiated");
    console.log("Will redirect to:", redirectUrl);
    
    // For demo purposes, we'll just redirect to the specified URL
    router.push(redirectUrl);
  };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="relative">
        {/* Orange shadow rectangle with custom color #FFAB5F */}
        <div className="absolute bg-[#FFAB5F] w-full h-full translate-x-1 translate-y-1"></div>
        
        {/* White main container */}
        <div className="relative bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-3xl argent text-[#2A1449]">{title}</h2>
            <p className="text-[#2A1449] mt-6">
              Logg inn med din Sopra Steria-konto
            </p>
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-center">
            <button
              className="transition-transform active:scale-95 hover:opacity-90 cursor-pointer"
              onClick={handleLogin}
            >
              <Image
                src="/images/LoggInn.svg"
                alt={buttonText}
                width={226}
                height={55}
                priority
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
