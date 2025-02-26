"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function BliFoedragsholder() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // This would normally check with your authentication system
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in a real app, this would verify credentials
    setIsLoggedIn(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit application logic would go here
    router.push("/bli-foredragsholder/confirmation");
  };

  return (
    <div className="min-h-screen bg-[#161E38] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Bli Foredragsholder</h1>
        
        {!isLoggedIn ? (
          // Login form
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">E-post</Label>
              <Input 
                id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.no" 
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="password">Passord</Label>
              <Input 
                id="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full bg-[#00afea] hover:bg-[#0099d1]">
                Logg Inn
              </Button>
            </div>
            
            <div className="text-center text-sm mt-4">
              Har du ikke en konto? {" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Registrer deg
              </Link>
            </div>
          </form>
        ) : (
          // Speaker application form
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
        )}
      </div>
    </div>
  );
} 