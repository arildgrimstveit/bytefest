"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoginForm } from "@/components/login-form"
import { PixelInput } from "@/components/pixel-input";

export default function BliFoedragsholder() {
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
        <div id="application-form" className="w-full max-w-xl mx-auto my-8">
          {/* White main container with relative positioning */}
          <div className="relative bg-white p-8 shadow-lg">
            {/* Orange shadow rectangle positioned behind */}
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
            
            <h1 className="text-3xl argent text-center mb-6">Send inn ditt foredrag</h1>
            
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <p className="text-center mb-4">
              Takk for at du vil dele dine erfaringer med kolleger! 
              Send inn ditt forslag til et foredrag. 
              </p>

              <div>
                <Label htmlFor="title">Tittel</Label>
                <PixelInput>
                  <input 
                    id="title" 
                    placeholder="Din foredragstittel (maks 100 tegn)" 
                    required 
                    maxLength={100}
                    className="w-full p-3 bg-white focus:outline-none"
                  />
                </PixelInput>
              </div>
              
              <div>
                <Label htmlFor="description">Beskrivelse</Label>
                <PixelInput>
                  <textarea 
                    id="description"
                    className="w-full p-3 bg-white focus:outline-none min-h-[120px]"
                    placeholder="Fortell oss om ditt foredrag (maks 500 tegn)"
                    maxLength={500}
                    required
                  />
                </PixelInput>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <PixelInput>
                  <input 
                    id="tags" 
                    placeholder="Hva handler foredraget om? (maks 50 tegn)" 
                    required 
                    maxLength={50}
                    className="w-full p-3 bg-white focus:outline-none"
                  />
                </PixelInput>
              </div>
              
              <div>
                <Label htmlFor="experience">Forkunnskaper</Label>
                <PixelInput>
                  <select 
                    id="experience" 
                    className="w-full p-3 bg-white focus:outline-none appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Velg</option>
                    <option value="none">Ingen tidligere erfaring</option>
                    <option value="some">Noen foredrag tidligere</option>
                    <option value="experienced">Erfaren foredragsholder</option>
                  </select>
                </PixelInput>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#00afea] hover:bg-[#0099d1]"
                >
                  Send Søknad
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 