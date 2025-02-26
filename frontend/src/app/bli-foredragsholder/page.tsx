"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoginForm } from "@/components/login-form"

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
    <div className="flex min-h-[calc(100vh-99px)] items-center justify-center -mt-[99px] pt-[99px] px-4">
      {!isLoggedIn ? (
        // Use the LoginForm component with a special onClick handler
        <div className="w-full max-w-sm">
          <div onClick={() => setIsLoggedIn(true)}>
            <LoginForm 
              title="Bli Foredragsholder" 
              redirectUrl="#"
              buttonText="Gå til søknadsskjema"
            />
          </div>
        </div>
      ) : (
        // Container for logged-in state
        <div id="application-form" className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">Bli Foredragsholder</h1>
          
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <p className="text-center mb-4">
              Fyll ut dette skjemaet for å bli en foredragsholder på Bytefest 2025.
            </p>
            
            <div>
              <Label htmlFor="title">Foredragstittel</Label>
              <Input id="title" placeholder="Din foredragstittel" required />
            </div>
            
            <div>
              <Label htmlFor="description">Kort beskrivelse</Label>
              <textarea 
                id="description"
                className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                placeholder="Fortell oss om ditt foredrag (maks 500 tegn)"
                maxLength={500}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="experience">Erfaring som foredragsholder</Label>
              <select 
                id="experience" 
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Velg</option>
                <option value="none">Ingen tidligere erfaring</option>
                <option value="some">Noen foredrag tidligere</option>
                <option value="experienced">Erfaren foredragsholder</option>
              </select>
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
      )}
    </div>
  );
} 