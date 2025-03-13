"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/LoginForm"
import { PixelInput } from "@/components/InputPixelCorners";
import Image from "next/image";
import { useUser } from "@/components/UserContext";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

export default function BliForedragsholder() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const { user, isAuthenticated, profilePic } = useUser();
  const { instance, inProgress } = useMsal();
  
  // Handle MSAL redirect - this is crucial for the authentication flow
  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      (async () => {
        try {
          // This handles the redirect response from Azure AD authentication
          const response = await instance.handleRedirectPromise();
          if (response) {
            // Login was successful, we have a response
            console.log("Authentication successful, redirect response:", response);
            instance.setActiveAccount(response.account);
            
            // Force a re-render of the app by triggering a small state change
            // This helps ensure the header and other components update
            window.setTimeout(() => {
              setIsLoggedIn(true);
              
              // Force a re-render by dispatching a custom event
              window.dispatchEvent(new Event('msal:login:complete'));
            }, 100);
          } else if (isAuthenticated) {
            // No response, but user is already authenticated
            console.log("User already authenticated");
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error handling redirect:", error);
        }
      })();
    }
  }, [instance, inProgress, isAuthenticated]);
  
  // Update this path to your actual talk application form

  // Check localStorage on component mount
  useEffect(() => {
    // Check if user is returning from oppsummering page
    const isAlreadyLoggedIn = localStorage.getItem('isAlreadyLoggedIn');
    if (isAlreadyLoggedIn === 'true') {
      setIsLoggedIn(true);
      // Clear the flag
      localStorage.removeItem('isAlreadyLoggedIn');
      
      // Restore form data from localStorage
      const savedTitle = localStorage.getItem('applicationTitle') || '';
      const savedDescription = localStorage.getItem('applicationDescription') || '';
      const savedTags = JSON.parse(localStorage.getItem('applicationTags') || '[]');
      const savedExperience = localStorage.getItem('applicationExperience') || '';
      const savedDuration = localStorage.getItem('applicationDuration') || '';
      
      // Set tags from localStorage
      setTags(savedTags);
      
      // Wait for DOM to be ready before setting form values
      setTimeout(() => {
        const titleInput = document.getElementById('title') as HTMLInputElement;
        const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
        
        if (titleInput) titleInput.value = savedTitle;
        if (descriptionInput) descriptionInput.value = savedDescription;
        
        // Set the experience radio button
        if (savedExperience) {
          const radioButton = document.querySelector(`input[name="experience"][value="${savedExperience}"]`) as HTMLInputElement;
          if (radioButton) radioButton.checked = true;
        }
        
        // Set the duration radio button
        if (savedDuration) {
          const durationButton = document.querySelector(`input[name="duration"][value="${savedDuration}"]`) as HTMLInputElement;
          if (durationButton) durationButton.checked = true;
        }
      }, 0);
    }
  }, []);

  // Set isLoggedIn based on authentication state
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(true);
    }
  }, [isAuthenticated]);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit application logic would go here
    router.push("/bli-foredragsholder/oppsummering");
  };

  const handleAddTag = () => {
    if (tagInput.trim() === "") return;
    if (!tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      {!isLoggedIn ? (
        <div className="w-full max-w-sm mt-8 sm:mt-0 mb-12 sm:mb-0">
          <LoginForm 
            title="Bli foredragsholder" 
            buttonText="Gå til søknadsskjema"
          />
        </div>
      ) : (
        <div id="application-form" className="w-full max-w-4xl mx-auto my-8">
          <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20">
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
            <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Send inn ditt foredrag</h1>
            
            <form id="application-form-element" onSubmit={handleSubmitApplication} className="space-y-4">
              <p className="text-left mb-8">
              Takk for at du vil dele dine erfaringer med kolleger! 
              Send inn ditt forslag til et foredrag. Du kan forvente å få svar innen ... 
              </p>

              <div>
                <label htmlFor="title" className="mb-3 block text-md font-bold">Tittel</label>
                <PixelInput>
                  <input 
                    id="title" 
                    required 
                    maxLength={80}
                    placeholder="Tittel på foredraget (Maks 80 tegn)"
                    className="w-full p-3 bg-white focus:outline-none"
                  />
                </PixelInput>
              </div>
              
              <div>
                <label htmlFor="description" className="mb-3 block text-md font-bold">Beskrivelse</label>
                <PixelInput>
                  <textarea 
                    id="description"
                    className="w-full p-3 bg-white focus:outline-none min-h-[120px]"
                    maxLength={1000}
                    placeholder="Beskrivelse av foredraget (Maks 1000 tegn)"
                    required
                  />
                </PixelInput>
              </div>

              <div>
                <label htmlFor="tags" className="mb-1 block text-md font-bold">Tags</label>
                <label htmlFor="tags" className="mb-3 block text-md">Nøkkelord som gjør det lettere å finne foredraget ditt</label>
                <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-3 sm:gap-5">
                  <div className="w-full">
                    <PixelInput>
                      <input 
                        id="tags" 
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagInputKeyDown}
                        placeholder="Skriv inn og trykk enter eller legg til"
                        maxLength={50}
                        className="w-full p-3 bg-white focus:outline-none"
                      />
                    </PixelInput>
                  </div>
                  <div className="flex-shrink-0 w-auto">
                    <button 
                      type="button"
                      onClick={handleAddTag}
                      className="flex items-center justify-start transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
                      style={{ height: "52px" }}
                    >
                      <Image
                        src="/images/LeggTil.svg"
                        alt="Legg til"
                        width={152}
                        height={44}
                        className="h-full w-auto"
                      />
                    </button>
                  </div>
                </div>
                
                {/* Display added tags with truncation */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 w-full">
                    {tags.map((tag, index) => (
                      <div 
                        key={index} 
                        className="flex items-center bg-[#161E38] text-white px-4 py-1 mb-2 max-w-[160px] sm:max-w-[200px] md:max-w-[300px]"
                      >
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap uppercase">{tag}</span>
                        <button 
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 flex-shrink-0 text-white hover:text-red-300"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="duration" className="mt-10 mb-3 block text-md font-bold">Hvor lenge varer foredraget?</label>
                <div className="space-y-3">
                  <div className="flex">
                    <label htmlFor="10min" className="flex items-center space-x-2 cursor-pointer inline-flex">
                      <input
                        type="radio"
                        id="10min"
                        name="duration"
                        value="10min"
                        required
                        className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                      />
                      <span>10 minutter</span>
                    </label>
                  </div>
                  <div className="flex">
                    <label htmlFor="20min" className="flex items-center space-x-2 cursor-pointer inline-flex">
                      <input
                        type="radio"
                        id="20min"
                        name="duration"
                        value="20min"
                        className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                      />
                      <span>20 minutter</span>
                    </label>
                  </div>
                  <div className="flex">
                    <label htmlFor="30min" className="flex items-center space-x-2 cursor-pointer inline-flex">
                      <input
                        type="radio"
                        id="30min"
                        name="duration"
                        value="30min"
                        className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                      />
                      <span>30 minutter</span>
                    </label>
                  </div>
                  <div className="flex">
                    <label htmlFor="45min" className="flex items-center space-x-2 cursor-pointer inline-flex">
                      <input
                        type="radio"
                        id="45min"
                        name="duration"
                        value="45min"
                        className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                      />
                      <span>45 minutter</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="experience" className="mt-10 mb-3 block text-md font-bold">Hvor mye forkunnskap forventer du av deltakerne?</label>
                <div className="space-y-3">
                  <div className="flex">
                    <label htmlFor="none" className="flex items-center space-x-2 cursor-pointer inline-flex">
                      <input
                        type="radio"
                        id="none"
                        name="experience"
                        value="none"
                        required
                        className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                      />
                      <span>Ingen grad</span>
                    </label>
                  </div>
                  <div className="flex">
                    <label htmlFor="low" className="flex items-center space-x-2 cursor-pointer inline-flex">
                      <input
                        type="radio"
                        id="low"
                        name="experience"
                        value="low"
                        className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                      />
                      <span>Liten grad</span>
                    </label>
                  </div>
                  <div className="flex">
                    <label htmlFor="medium" className="flex items-center space-x-2 cursor-pointer inline-flex">
                      <input
                        type="radio"
                        id="medium"
                        name="experience"
                        value="medium"
                        className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                      />
                      <span>Middels grad</span>
                    </label>
                  </div>
                  <div className="flex">
                    <label htmlFor="high" className="flex items-center space-x-2 cursor-pointer inline-flex">
                      <input
                        type="radio"
                        id="high"
                        name="experience"
                        value="high"
                        className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                      />
                      <span>Stor grad</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <label className="mb-3 block text-md"><span className="font-bold">Foredragsholder</span> (hentet fra SSO)</label>
                <div className="relative bg-[#F6EBD5] p-6 border-2 border-black">
                  <div className="flex flex-col items-start sm:flex-row sm:items-center gap-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-black shrink-0 bg-white flex items-center justify-center overflow-hidden">
                      {profilePic ? (
                        <Image
                          src={profilePic}
                          alt={user?.name || "User"}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#2A1449] text-white text-5xl">
                          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-medium mb-2">{user?.name || "Laster navn..."}</h3>
                      <div className="flex flex-row items-end justify-start gap-2">
                        <Image
                          src="/images/Mail.svg"
                          alt="Mail"
                          width={16}
                          height={14}
                          className="shrink-0 w-2 xs:w-3 sm:w-4 mb-[1px]"
                          style={{ height: "auto" }}
                        />
                        <span className="text-gray-700 text-xs sm:text-sm sm:text-base break-all translate-y-[2px]">
                          {user?.email || "Laster e-post..."}
                        </span>
                      </div>
                    </div>
                    <div className="absolute right-10 h-full hidden md:flex md:items-center">
                      <Image
                        src="/images/FargerikFisk.svg"
                        alt="FargerikFisk"
                        width={43}
                        height={40}
                        style={{ width: '36px', height: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button"
                  className="flex items-center iceland text-xl gap-3 mt-4 hover:opacity-80 cursor-pointer transition-transform active:scale-95"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Add speaker clicked");
                  }}
                >
                  <Image
                    src="/images/Plus.svg"
                    alt="Add speaker"
                    width={14}
                    height={14}
                  />
                  <span>Legg til foredragsholder</span>
                </button>
              </div>

              <div className="pt-10">
                <button 
                  type="submit"
                  className="cursor-pointer transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
                  onClick={(e) => {
                    const form = document.getElementById('application-form-element') as HTMLFormElement;
                    
                    if (form?.checkValidity()) {
                      const titleInput = document.getElementById('title') as HTMLInputElement;
                      const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
                      const experienceLevel = document.querySelector('input[name="experience"]:checked') as HTMLInputElement;
                      const durationLevel = document.querySelector('input[name="duration"]:checked') as HTMLInputElement;
                      
                      localStorage.setItem('applicationTags', JSON.stringify(tags));
                      localStorage.setItem('applicationTitle', titleInput.value);
                      localStorage.setItem('applicationDescription', descriptionInput.value);
                      localStorage.setItem('applicationExperience', experienceLevel.value);
                      localStorage.setItem('applicationDuration', durationLevel.value);
                      
                      router.push("/bli-foredragsholder/oppsummering");
                    } else {
                      form?.reportValidity();
                    }
                    e.preventDefault();
                  }}
                >
                  <Image 
                    src="/images/Lagre.svg"
                    alt="Lagre"
                    width={211}
                    height={59}
                    style={{ width: '250px', height: 'auto' }}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 