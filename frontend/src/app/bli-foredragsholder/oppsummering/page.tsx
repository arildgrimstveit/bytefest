"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PixelInput } from "@/components/pixel-input";

export default function Oppsummering() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    experience: ''
  });
  const [loading, setLoading] = useState(true);
  const [allergens, setAllergens] = useState({
    none: false,
    gluten: false,
    milk: false,
    other: false
  });
  const [otherAllergenText, setOtherAllergenText] = useState('');

  useEffect(() => {
    // Retrieve data from localStorage
    const title = localStorage.getItem('applicationTitle') || '';
    const description = localStorage.getItem('applicationDescription') || '';
    const tags = JSON.parse(localStorage.getItem('applicationTags') || '[]');
    const experience = localStorage.getItem('applicationExperience') || '';

    setFormData({
      title,
      description,
      tags,
      experience
    });
    setLoading(false);
  }, []);

  // Map experience value to readable text
  const getExperienceText = (value: string) => {
    switch (value) {
      case 'none': return 'Ingen grad';
      case 'low': return 'Liten grad';
      case 'medium': return 'Middels grad';
      case 'high': return 'Stor grad';
      default: return '';
    }
  };

  const handleAllergenChange = (allergen: keyof typeof allergens) => {
    setAllergens({
      ...allergens,
      [allergen]: !allergens[allergen]
    });
  };

  const handleSubmit = () => {
    // Submit the form data to your backend
    // For now, we just redirect to the confirmation page
    localStorage.removeItem('applicationTitle');
    localStorage.removeItem('applicationDescription');
    localStorage.removeItem('applicationTags');
    localStorage.removeItem('applicationExperience');
    
    window.location.href = '/bli-foredragsholder/confirmation';
  };

  const handleGoBack = () => {
    // Store a flag to indicate the user was already logged in
    // This will be checked by the bli-foredragsholder page
    localStorage.setItem('isAlreadyLoggedIn', 'true');
    window.location.href = '/bli-foredragsholder';
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Laster inn...</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-99px)] items-center justify-center -mt-[99px] pt-[99px]">
      <div className="w-full max-w-4xl mx-auto my-8">
        <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20 break-words">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Oppsummering</h1>
          
          <div className="space-y-8">
            <p className="text-left mb-8 break-words">
                Det severes mat something something. Det severes mat something something. Det severes mat something something.
            </p>
            
            <div className="mb-8">
              <h3 className="mb-2 font-bold">Allergener</h3>
              <div className="space-y-2">
                <div className="flex">
                  <label className="flex items-center space-x-2 cursor-pointer inline-flex">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={allergens.none}
                        onChange={() => handleAllergenChange('none')}
                      />
                      <div className={`w-5 h-5 rounded-md border-2 border-black ${allergens.none ? 'flex items-center justify-center' : 'bg-white'}`}>
                        {allergens.none && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="break-words">Jeg ønsker ikke mat</span>
                  </label>
                </div>
                
                <div className="flex">
                  <label className="flex items-center space-x-2 cursor-pointer inline-flex">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={allergens.gluten}
                        onChange={() => handleAllergenChange('gluten')}
                      />
                      <div className={`w-5 h-5 rounded-md border-2 border-black ${allergens.gluten ? 'flex items-center justify-center' : 'bg-white'}`}>
                        {allergens.gluten && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="break-words">Gluten</span>
                  </label>
                </div>
                
                <div className="flex">
                  <label className="flex items-center space-x-2 cursor-pointer inline-flex">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={allergens.milk}
                        onChange={() => handleAllergenChange('milk')}
                      />
                      <div className={`w-5 h-5 rounded-md border-2 border-black ${allergens.milk ? 'flex items-center justify-center' : 'bg-white'}`}>
                        {allergens.milk && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="break-words">Melk</span>
                  </label>
                </div>
                
                <div className="flex flex-col">
                  <label className="flex items-center space-x-2 cursor-pointer inline-flex">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={allergens.other}
                        onChange={() => handleAllergenChange('other')}
                      />
                      <div className={`w-5 h-5 rounded-md border-2 border-black ${allergens.other ? 'flex items-center justify-center' : 'bg-white'}`}>
                        {allergens.other && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="break-words">Annet</span>
                  </label>
                  
                  {allergens.other && (
                    <div className="mt-4">
                      <PixelInput>
                        <input 
                          type="text"
                          value={otherAllergenText}
                          onChange={(e) => setOtherAllergenText(e.target.value)}
                          placeholder="Skriv inn din allergi her"
                          className="w-full p-3 bg-white focus:outline-none break-words"
                        />
                      </PixelInput>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-[#F6EBD5] p-6 border-2 border-black">
              <h2 className="text-2xl font-medium mb-4 break-words overflow-hidden">{formData.title}</h2>
              
              <div className="mb-6">
                <p className="whitespace-pre-wrap break-words overflow-hidden">{formData.description}</p>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <div 
                        key={index} 
                        className="bg-[#161E38] text-white px-4 py-1 break-words overflow-hidden max-w-full"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {formData.experience && (
                <div>
                  <h3 className="font-medium mb-2">Forventede forkunnskaper:</h3>
                  <p className="break-words overflow-hidden">{getExperienceText(formData.experience)}</p>
                </div>
              )}
              
              <div className="mt-8 pt-6 border-t-2 border-black">
                <h3 className="font-medium mb-4">Foredragsholder:</h3>
                <div className="flex flex-col items-start sm:flex-row sm:items-center gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-black shrink-0">
                    <Image
                      src="/images/NavnNavnesen.svg"
                      alt="Foredragsholder"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-medium mb-2 break-words overflow-hidden">Navn Navnesen</h3>
                    <div className="flex flex-row items-end justify-start gap-2">
                      <Image
                        src="/images/Mail.svg"
                        alt="Mail"
                        width={16}
                        height={16}
                        className="shrink-0 w-3 h-3 sm:w-4 sm:h-4"
                      />
                      <span className="text-gray-700 text-xs sm:text-sm sm:text-base break-all translate-y-[2px]">navn.navnesen@soprasteria.com</span>
                    </div>
                  </div>
                  <div className="absolute right-30 h-full hidden md:flex md:items-center">
                    <Image
                      src="/images/FargerikFisk.svg"
                      alt="FargerikFisk"
                      width={36}
                      height={36}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
              <button 
                onClick={handleGoBack}
                className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
              >
                <Image 
                  src="/images/Tilbake.svg" 
                  alt="Tilbake til skjema" 
                  width={250}
                  height={55}
                />
              </button>
              
              <button 
                onClick={handleSubmit}
                className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
              >
                <Image 
                  src="/images/SendInn.svg" 
                  alt="Send inn" 
                  width={250}
                  height={55}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 