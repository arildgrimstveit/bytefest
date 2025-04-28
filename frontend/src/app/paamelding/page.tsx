"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PixelInput } from "@/components/InputPixelCorners";
import Image from "next/image";
import { useUser } from "@/components/UserContext";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import Link from "next/link";

export default function Paamelding() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const { instance, inProgress } = useMsal();

  const [bu, setBu] = useState("");
  const [participationLocation, setParticipationLocation] = useState("");
  const [wantsFood, setWantsFood] = useState("");
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [attendsParty, setAttendsParty] = useState("");
  const [willPresent, setWillPresent] = useState("");

  const [isBuDropdownOpen, setIsBuDropdownOpen] = useState(false);
  const [isParticipationLocationDropdownOpen, setIsParticipationLocationDropdownOpen] = useState(false);

  const buDropdownRef = useRef<HTMLDivElement>(null);
  const participationLocationDropdownRef = useRef<HTMLDivElement>(null);

  const [showBuError, setShowBuError] = useState(false);
  const [showParticipationLocationError, setShowParticipationLocationError] = useState(false);
  const [showWantsFoodError, setShowWantsFoodError] = useState(false);
  const [showAttendsPartyError, setShowAttendsPartyError] = useState(false);
  const [showWillPresentError, setShowWillPresentError] = useState(false);

  // State for the 'Annet' text input
  const [annetText, setAnnetText] = useState("");

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      (async () => {
        try {
          const response = await instance.handleRedirectPromise();
          if (response) {
            console.log("Authentication successful, redirect response:", response);
            instance.setActiveAccount(response.account);
            window.setTimeout(() => {
              setIsLoggedIn(true);
              window.dispatchEvent(new Event('msal:login:complete'));
            }, 100);
          } else if (isAuthenticated) {
            console.log("User already authenticated");
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error handling redirect:", error);
        }
      })();
    }
  }, [instance, inProgress, isAuthenticated]);

  useEffect(() => {
    const isReturning = localStorage.getItem('isReturningFromPaameldingSummary');
    if (isReturning === 'true') {
      setIsLoggedIn(true);
      localStorage.removeItem('isReturningFromPaameldingSummary');

      // Restore form data
      setBu(localStorage.getItem('paameldingBu') || '');
      setParticipationLocation(localStorage.getItem('paameldingParticipationLocation') || '');
      setWantsFood(localStorage.getItem('paameldingWantsFood') || '');
      // --- Handle Dietary Needs Restoration --- 
      const storedDietaryNeeds: string[] = JSON.parse(localStorage.getItem('paameldingDietaryNeeds') || '[]');
      const annetEntry = storedDietaryNeeds.find(need => need.startsWith("Annet: "));
      const otherNeeds = storedDietaryNeeds.filter(need => !need.startsWith("Annet: "));
      
      if (annetEntry) {
          // Found specific "Annet" text
          const text = annetEntry.substring("Annet: ".length);
          setAnnetText(text); // Set the text state
          setDietaryNeeds(["Annet", ...otherNeeds]); // Set needs state with "Annet" marker
      } else {
          // No specific "Annet" text found
          setAnnetText(""); // Clear the text state
          setDietaryNeeds(otherNeeds); // Set needs state without "Annet" marker
      }
      // --- End Handle Dietary Needs ---
      setAttendsParty(localStorage.getItem('paameldingAttendsParty') || '');
      setWillPresent(localStorage.getItem('paameldingWillPresent') || '');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buDropdownRef.current && !buDropdownRef.current.contains(event.target as Node)) {
        setIsBuDropdownOpen(false);
      }
      if (participationLocationDropdownRef.current && !participationLocationDropdownRef.current.contains(event.target as Node)) {
        setIsParticipationLocationDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBuSelect = (value: string) => {
    setBu(value);
    setIsBuDropdownOpen(false);
    setShowBuError(false);
  };

  const handleParticipationLocationSelect = (value: string) => {
    setParticipationLocation(value);
    setIsParticipationLocationDropdownOpen(false);
    setShowParticipationLocationError(false);
  };

  const handleWantsFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setWantsFood(newValue);
    setShowWantsFoodError(false);

    // If user does NOT want food, clear dietary needs and annet text
    if (newValue !== 'yes') {
        setDietaryNeeds([]);
        setAnnetText("");
    }
  };

  const handleDietaryNeedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setDietaryNeeds(prev =>
      checked ? [...prev, value] : prev.filter(need => need !== value)
    );
    // Clear text if 'Annet' is unchecked
    if (value === 'Annet' && !checked) {
      setAnnetText("");
    }
  };

  const handleAttendsPartyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttendsParty(e.target.value);
    setShowAttendsPartyError(false);
  };

  const handleWillPresentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWillPresent(e.target.value);
    setShowWillPresentError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    let firstErrorElement: HTMLElement | null = null;

    // Reset errors first
    setShowBuError(false);
    setShowParticipationLocationError(false);
    setShowWantsFoodError(false);
    setShowAttendsPartyError(false);
    setShowWillPresentError(false);

    // Check required fields in order and find the first error element
    if (!bu) {
      setShowBuError(true);
      isValid = false;
      if (!firstErrorElement) {
          // Target the button that opens the dropdown
          firstErrorElement = document.querySelector('[aria-controls="bu-dropdown"]');
      }
    }
    if (!participationLocation) {
      setShowParticipationLocationError(true);
      isValid = false;
      if (!firstErrorElement) {
          firstErrorElement = document.querySelector('[aria-controls="participation-location-dropdown"]');
      }
    }
    if (!wantsFood) {
      setShowWantsFoodError(true);
      isValid = false;
       if (!firstErrorElement) {
            // Target the first radio button in the group
            firstErrorElement = document.querySelector('input[name="wantsFood"]');
        }
    }
    if (!attendsParty) {
      setShowAttendsPartyError(true);
      isValid = false;
      if (!firstErrorElement) {
            firstErrorElement = document.querySelector('input[name="attendsParty"]');
        }
    }
    if (!willPresent) {
      setShowWillPresentError(true);
      isValid = false;
      if (!firstErrorElement) {
            firstErrorElement = document.querySelector('input[name="willPresent"]');
        }
    }

    // Scroll to the first error field
    if (!isValid && firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optionally focus the element if it's focusable (might be tricky for custom dropdowns)
        // firstErrorElement.focus({ preventScroll: true }); 
        return; // Stop submission
    }

    // --- If valid, proceed with submission --- 

    // Process dietary needs for submission
    const isAnnetChecked = dietaryNeeds.includes("Annet");
    const needsToSubmit = dietaryNeeds.filter(need => need !== "Annet"); // Remove the marker

    if (isAnnetChecked && annetText.trim()) {
        // If "Annet" was checked and text exists, add the specific entry
        needsToSubmit.push(`Annet: ${annetText.trim()}`);
    } // No need for an else, if checkbox or text is missing, "Annet" is simply excluded

    // --- Save processed data to localStorage --- 
    localStorage.setItem('paameldingBu', bu);
    localStorage.setItem('paameldingParticipationLocation', participationLocation);
    localStorage.setItem('paameldingWantsFood', wantsFood);
    localStorage.setItem('paameldingDietaryNeeds', JSON.stringify(needsToSubmit)); // Save the processed list
    localStorage.setItem('paameldingAttendsParty', attendsParty);
    localStorage.setItem('paameldingWillPresent', willPresent);
    localStorage.setItem('isReturningFromPaameldingSummary', 'false');

    // Navigate to summary page
    router.push("/paamelding/summary");
  };

  const buOptions = [
    { value: "Applications", label: "Applications" },
    { value: "Digital Platform Services", label: "Digital Platform Services" },
    { value: "Advisory", label: "Advisory" },
  ];

  const participationLocationOptions = [
    { value: "Bergen", label: "Bergen" },
    { value: "Drammen", label: "Drammen" },
    { value: "Fredrikstad", label: "Fredrikstad" },
    { value: "Hamar", label: "Hamar" },
    { value: "Kristiansand", label: "Kristiansand" },
    { value: "København", label: "København" },
    { value: "Oslo", label: "Oslo" },
    { value: "Stavanger", label: "Stavanger" },
    { value: "Tromsø", label: "Tromsø" },
    { value: "Trondheim", label: "Trondheim" },
    { value: "Digitalt", label: "Digitalt" },
  ];

  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      {!isLoggedIn ? (
        <div className="w-full max-w-sm mt-8 sm:mt-0 mb-12 sm:mb-0">
          <div className="text-center p-10 bg-white shadow-lg border-2 border-black">
            <h2 className="text-2xl argent mb-4">Logg inn</h2>
            <p className="mb-6">Du må logge inn for å melde deg på Bytefest.</p>
          </div>
        </div>
      ) : (
        <div id="application-form" className="w-full max-w-4xl mx-auto my-8">
          <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20">
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
            <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Meld deg på</h1>

            <form id="paamelding-form-element" onSubmit={handleSubmit} className="space-y-6">
              <p className="text-left mb-8">
                Takk for at du vil delta på Bytefest! Hvis du lurer på noe før du melder deg på, kan du finne mer informasjon på <Link href="/bytefest" className="underline hover:no-underline">Bytefestsiden</Link>.
              </p>

              <div>
                <label htmlFor="bu" className="mb-3 block text-md font-bold">Hvilken BU tilhører du?</label>
                <div className="w-full relative" ref={buDropdownRef}>
                  <PixelInput>
                    <button
                      type="button"
                      className="w-full p-3 bg-white focus:outline-none appearance-none cursor-pointer text-left flex justify-between items-center"
                      onClick={() => setIsBuDropdownOpen(!isBuDropdownOpen)}
                      aria-expanded={isBuDropdownOpen}
                      aria-controls="bu-dropdown"
                    >
                      <span className={bu ? "" : "text-gray-500"}>
                        {bu || "Velg"}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isBuDropdownOpen ? 'rotate-180' : ''}`}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </PixelInput>
                  {showBuError && (
                    <p className="text-red-600 text-sm mt-1 font-medium px-1">
                      Vennligst velg din BU
                    </p>
                  )}
                  {isBuDropdownOpen && (
                    <div id="bu-dropdown" className="absolute z-20 w-full mt-1 border-2 border-black bg-white max-h-60 overflow-auto p-0 shadow-lg">
                      {buOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`w-full px-4 py-2 text-left hover:bg-[#F8F5D3] cursor-pointer ${bu === option.value ? 'bg-[#F8F5D3]' : 'bg-white'}`}
                          onClick={() => handleBuSelect(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="participation-location" className="mb-3 block text-md font-bold">Hvor vil du delta?</label>
                <div className="w-full relative" ref={participationLocationDropdownRef}>
                  <PixelInput>
                    <button
                      type="button"
                      className="w-full p-3 bg-white focus:outline-none appearance-none cursor-pointer text-left flex justify-between items-center"
                      onClick={() => setIsParticipationLocationDropdownOpen(!isParticipationLocationDropdownOpen)}
                      aria-expanded={isParticipationLocationDropdownOpen}
                      aria-controls="participation-location-dropdown"
                    >
                      <span className={participationLocation ? "" : "text-gray-500"}>
                        {participationLocation || "Velg"}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isParticipationLocationDropdownOpen ? 'rotate-180' : ''}`}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </PixelInput>
                  {showParticipationLocationError && (
                    <p className="text-red-600 text-sm mt-1 font-medium px-1">
                      Vennligst velg hvor du vil delta
                    </p>
                  )}
                  {isParticipationLocationDropdownOpen && (
                    <div id="participation-location-dropdown" className="absolute z-20 w-full mt-1 border-2 border-black bg-white max-h-60 overflow-auto p-0 shadow-lg">
                      {participationLocationOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`w-full px-4 py-2 text-left hover:bg-[#F8F5D3] cursor-pointer ${participationLocation === option.value ? 'bg-[#F8F5D3]' : 'bg-white'}`}
                          onClick={() => handleParticipationLocationSelect(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-md font-bold">Ønsker du mat under arangementet?</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="wantsFood" value="yes" checked={wantsFood === 'yes'} onChange={handleWantsFoodChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"/>
                    <span>Ja</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="wantsFood" value="no" checked={wantsFood === 'no'} onChange={handleWantsFoodChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"/>
                    <span>Nei</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="wantsFood" value="digital" checked={wantsFood === 'digital'} onChange={handleWantsFoodChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"/>
                    <span>Jeg deltar digitalt og skal ikke ha mat</span>
                  </label>
                </div>
                {showWantsFoodError && (
                  <p className="text-red-600 text-sm mt-1 font-medium px-1">
                    Vennligst svar på om du ønsker mat
                  </p>
                )}
              </div>

              {/* Conditionally render the entire dietary needs section */}
              {wantsFood === 'yes' && (
                <div className="w-full"> 
                  <label className="mb-3 block text-md font-bold">Dietthensyn (valgfritt)</label>
                  <div className="flex flex-col space-y-3">
                    <label className="inline-flex items-center space-x-2 cursor-pointer max-w-fit">
                      <div className="relative w-5 h-5">
                        <input 
                          type="checkbox" 
                          value="Vegetarisk" 
                          checked={dietaryNeeds.includes('Vegetarisk')} 
                          onChange={handleDietaryNeedsChange} 
                          className="appearance-none w-full h-full border-2 border-black rounded-sm cursor-pointer"
                        />
                        {dietaryNeeds.includes('Vegetarisk') && (
                          <span className="absolute inset-0 flex items-center justify-center text-black pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span>
                        Vegetarisk
                      </span>
                    </label>
                    <label className="inline-flex items-center space-x-2 cursor-pointer max-w-fit">
                      <div className="relative w-5 h-5">
                        <input 
                          type="checkbox" 
                          value="Vegansk" 
                          checked={dietaryNeeds.includes('Vegansk')} 
                          onChange={handleDietaryNeedsChange} 
                          className="appearance-none w-full h-full border-2 border-black rounded-sm cursor-pointer"
                        />
                        {dietaryNeeds.includes('Vegansk') && (
                          <span className="absolute inset-0 flex items-center justify-center text-black pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span>Vegansk</span>
                    </label>
                    <label className="inline-flex items-center space-x-2 cursor-pointer max-w-fit">
                      <div className="relative w-5 h-5">
                        <input 
                          type="checkbox" 
                          value="Glutenfritt" 
                          checked={dietaryNeeds.includes('Glutenfritt')} 
                          onChange={handleDietaryNeedsChange} 
                          className="appearance-none w-full h-full border-2 border-black rounded-sm cursor-pointer"
                        />
                        {dietaryNeeds.includes('Glutenfritt') && (
                          <span className="absolute inset-0 flex items-center justify-center text-black pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span>Glutenfritt</span>
                    </label>
                    <label className="inline-flex items-center space-x-2 cursor-pointer max-w-fit">
                      <div className="relative w-5 h-5">
                        <input 
                          type="checkbox" 
                          value="Melkefritt" 
                          checked={dietaryNeeds.includes('Melkefritt')} 
                          onChange={handleDietaryNeedsChange} 
                          className="appearance-none w-full h-full border-2 border-black rounded-sm cursor-pointer"
                        />
                        {dietaryNeeds.includes('Melkefritt') && (
                          <span className="absolute inset-0 flex items-center justify-center text-black pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span>Melkefritt</span>
                    </label>
                    <label className="inline-flex items-center space-x-2 cursor-pointer max-w-fit">
                      <div className="relative w-5 h-5">
                        <input 
                          type="checkbox" 
                          value="Laktosefritt" 
                          checked={dietaryNeeds.includes('Laktosefritt')} 
                          onChange={handleDietaryNeedsChange} 
                          className="appearance-none w-full h-full border-2 border-black rounded-sm cursor-pointer"
                        />
                        {dietaryNeeds.includes('Laktosefritt') && (
                          <span className="absolute inset-0 flex items-center justify-center text-black pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span>Laktosefritt</span>
                    </label>
                    <label className="inline-flex items-center space-x-2 cursor-pointer max-w-fit flex-shrink-0">
                      <div className="relative w-5 h-5">
                        <input 
                          id="diet-other"
                          type="checkbox" 
                          value="Annet" 
                          checked={dietaryNeeds.includes('Annet')} 
                          onChange={handleDietaryNeedsChange} 
                          className="appearance-none w-full h-full border-2 border-black rounded-sm cursor-pointer"
                        />
                        {dietaryNeeds.includes('Annet') && (
                          <span className="absolute inset-0 flex items-center justify-center text-black pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span>Annet</span>
                    </label>
                  </div>
                </div>
              )}
              {/* End of conditional dietary needs section */}

              {/* --- Conditionally Rendered Text Input --- */}
              {wantsFood === 'yes' && dietaryNeeds.includes('Annet') && (
                <div className="w-full mt-3">
                  <PixelInput>
                    <input
                      id="diet-other-text"
                      type="text"
                      placeholder="Spesifiser"
                      maxLength={75}
                      className="w-full p-3 bg-white focus:outline-none"
                      value={annetText} 
                      onChange={(e) => setAnnetText(e.target.value)}
                    />
                  </PixelInput>
                </div>
              )}

              <div>
                <label className="mb-3 block text-md font-bold">Ønsker du å delta på fest etter det faglige programmet?</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="attendsParty" value="yes" checked={attendsParty === 'yes'} onChange={handleAttendsPartyChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"/>
                    <span>Ja, jeg er med på det sosiale</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="attendsParty" value="no" checked={attendsParty === 'no'} onChange={handleAttendsPartyChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"/>
                    <span>Nei, jeg kan dessverre ikke</span>
                  </label>
                </div>
                {showAttendsPartyError && (
                  <p className="text-red-600 text-sm mt-1 font-medium px-1">
                    Vennligst svar på om du vil delta på festen
                  </p>
                )}
              </div>

              <div>
                <label className="mb-3 block text-md font-bold">Skal du holde foredrag på Bytefest?</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="willPresent" value="yes" checked={willPresent === 'yes'} onChange={handleWillPresentChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"/>
                    <span>Ja</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="willPresent" value="no" checked={willPresent === 'no'} onChange={handleWillPresentChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"/>
                    <span>Nei</span>
                  </label>
                </div>
                {showWillPresentError && (
                  <p className="text-red-600 text-sm mt-1 font-medium px-1">
                    Vennligst svar på om du skal holde foredrag
                  </p>
                )}
              </div>

              <p className="text-sm text-left pt-4">
                Ved påmelding samtykker du til lagring av personopplysninger, les <Link href="/privacy-policy" className="underline hover:no-underline">personvernerklæring</Link>.
              </p>

              <div className="pt-5 flex justify-start">
                <button
                  type="submit"
                  className="cursor-pointer transition-transform active:scale-95 hover:opacity-80"
                >
                  <Image
                    src="/images/SendInn.svg"
                    alt="Send inn"
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