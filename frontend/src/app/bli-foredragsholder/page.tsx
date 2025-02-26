"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { LoginForm } from "@/components/login-form"
import { PixelInput } from "@/components/pixel-input";
import Image from "next/image";

export default function BliForedragsholder() {
  // For demo purposes, we'll use a state to simulate login
  // In a real app, you would check authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit application logic would go here
    router.push("/bli-foredragsholder/confirmation");
  };

  return (
    <div className="flex min-h-[calc(100vh-99px)] items-center justify-center -mt-[99px] pt-[99px]">
      {!isLoggedIn ? (
        <div className="w-full max-w-sm">
          <div onClick={() => setIsLoggedIn(true)}>
            <LoginForm 
              title="Bli foredragsholder" 
              redirectUrl="#"
              buttonText="Gå til søknadsskjema"
            />
          </div>
        </div>
      ) : (
        // Container for logged-in state
        <div id="application-form" className="w-full max-w-4xl mx-auto my-8">
          {/* White main container with relative positioning */}
          <div className="relative bg-white p-8 shadow-lg px-20">
            {/* Orange shadow rectangle positioned behind */}
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
            
            <h1 className="text-5xl argent text-center mb-6">Send inn ditt foredrag</h1>
            
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <p className="text-left mb-10">
              Takk for at du vil dele dine erfaringer med kolleger! 
              Send inn ditt forslag til et foredrag. Du kan forvente å få svar innen ... 
              </p>

              <div>
                <Label htmlFor="title" className="mb-3 block text-md">Tittel</Label>
                <PixelInput>
                  <input 
                    id="title" 
                    required 
                    maxLength={100}
                    className="w-full p-3 bg-white focus:outline-none"
                  />
                </PixelInput>
              </div>
              
              <div>
                <Label htmlFor="description" className="mb-3 block text-md">Beskrivelse</Label>
                <PixelInput>
                  <textarea 
                    id="description"
                    className="w-full p-3 bg-white focus:outline-none min-h-[120px]"
                    maxLength={500}
                    required
                  />
                </PixelInput>
              </div>

              <div>
                <Label htmlFor="tags" className="mb-3 block text-md">Tags</Label>
                <PixelInput>
                  <input 
                    id="tags" 
                    required 
                    maxLength={50}
                    className="w-full p-3 bg-white focus:outline-none"
                  />
                </PixelInput>
              </div>
              
              <div>
                <Label htmlFor="experience" className="mb-3 block text-md">Forventede forkunnskaper</Label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="none"
                      name="experience"
                      value="none"
                      required
                      className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px]"
                    />
                    <label htmlFor="none" className="ml-2">Ingen grad</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="low"
                      name="experience"
                      value="low"
                      className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px]"
                    />
                    <label htmlFor="low" className="ml-2">Liten grad</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="medium"
                      name="experience"
                      value="medium"
                      className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px]"
                    />
                    <label htmlFor="medium" className="ml-2">Middels grad</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="high"
                      name="experience"
                      value="high"
                      className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px]"
                    />
                    <label htmlFor="high" className="ml-2">Stor grad</label>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Label className="mb-3 block text-md">Foredragsholder (hentet fra SSO)</Label>
                <div className="relative bg-[#F6EBD5] p-6 border-2 border-black">
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 border-2 border-black">
                      <Image
                        src="/images/NavnNavnesen.svg"
                        alt="NavnNavnesen"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2">Navn navnesen</h3>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/Mail.svg"
                          alt="Mail"
                          width={20}
                          height={20}
                        />
                        <span className="text-gray-700">navn.navnesen@soprasteria.com</span>
                      </div>
                    </div>
                    <div className="absolute top-0 right-10 h-full flex items-center">
                      <Image
                        src="/images/FargerikFisk.svg"
                        alt="FargerikFisk"
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                </div>
                
                <button className="flex items-center iceland text-xl gap-3 mt-4 hover:opacity-80">
                  <Image
                    src="/images/Plus.svg"
                    alt="Add speaker"
                    width={16}
                    height={16}
                  />
                  <span>Legg til foredragsholder</span>
                </button>
              </div>

              <div className="pt-10">
                <Image 
                  src="/images/Lagre.svg"
                  alt="Lagre"
                  width={250}
                  height={16}
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => router.push("/bli-foredragsholder/confirmation")}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 