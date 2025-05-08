"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PixelInput } from "@/components/InputPixelCorners";
import Image from "next/image";
import { useUser } from "@/components/UserContext";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import sanityClient from "@/sanityClient";
import type { Attendee } from "@/types/attendee";

// Wrap the main component export in Suspense for useSearchParams
export default function PaameldingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Paamelding />
    </Suspense>
  );
}

// Loading component shown while Suspense is resolving
function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <p className="text-white text-xl">Laster...</p>
    </div>
  );
}

function Paamelding() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to read search params
  const { user, isAuthenticated } = useUser();
  const { instance, inProgress } = useMsal();

  const [bu, setBu] = useState("");
  const [participationLocation, setParticipationLocation] = useState("");
  const [wantsFood, setWantsFood] = useState("");
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [attendsParty, setAttendsParty] = useState("");

  const [isBuDropdownOpen, setIsBuDropdownOpen] = useState(false);
  const [isParticipationLocationDropdownOpen, setIsParticipationLocationDropdownOpen] = useState(false);

  const buDropdownRef = useRef<HTMLDivElement>(null);
  const participationLocationDropdownRef = useRef<HTMLDivElement>(null);

  const [showBuError, setShowBuError] = useState(false);
  const [showParticipationLocationError, setShowParticipationLocationError] = useState(false);
  const [showWantsFoodError, setShowWantsFoodError] = useState(false);
  const [showAttendsPartyError, setShowAttendsPartyError] = useState(false);

  const [annetText, setAnnetText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(true);

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      (async () => {
        try {
          const response = await instance.handleRedirectPromise();
          if (response) {
            console.log("Authentication successful, redirect response:", response);
            instance.setActiveAccount(response.account);
            window.setTimeout(() => {
              window.dispatchEvent(new Event('msal:login:complete'));
            }, 100);
          } else if (isAuthenticated) {
            console.log("User already authenticated");
          }
        } catch (error) {
          console.error("Error handling redirect:", error);
        }
      })();
    }
  }, [instance, inProgress, isAuthenticated]);

  useEffect(() => {
    const isEditMode = searchParams.get('edit') === 'true';

    const checkAndFetchRegistration = async () => {
      if (isAuthenticated && user?.email) {
        console.log(`Checking/Fetching registration for: ${user.email}, Edit Mode: ${isEditMode}`);
        try {
          // Fetch full data or just ID based on edit mode
          const query = isEditMode
            ? `*[_type == "attendee" && attendeeEmail == $email][0]` // Fetch full data for edit
            : `*[_type == "attendee" && attendeeEmail == $email][0]{_id}`; // Fetch only ID for initial check
          const params = { email: user.email };
          const existingData: Attendee | { _id: string } | null = await sanityClient.fetch(query, params);

          if (existingData) {
            if (isEditMode) {
              console.log("Edit mode: Found existing registration, populating form.", existingData);
              const fullData = existingData as Attendee; // Type assertion using imported type
              setIsCheckingRegistration(false); // Allow rendering form
              // Populate form state
              setBu(fullData.bu || "");
              setParticipationLocation(fullData.participationLocation || "");
              setWantsFood(fullData.wantsFood || "");
              const fetchedDietaryNeeds = fullData.dietaryNeeds || [];
              const annetEntry = fetchedDietaryNeeds.find((need: string) => need.startsWith("Annet: "));
              const otherNeeds = fetchedDietaryNeeds.filter((need: string) => !need.startsWith("Annet: "));
              if (annetEntry) {
                const text = annetEntry.substring("Annet: ".length);
                setAnnetText(text);
                setDietaryNeeds(["Annet", ...otherNeeds]);
              } else {
                setAnnetText("");
                setDietaryNeeds(otherNeeds);
              }
              setAttendsParty(fullData.attendsParty || "");
            } else {
              // Not edit mode, but found registration -> redirect to summary
              console.log("User already registered (not in edit mode). Redirecting to summary.");
              router.push("/paamelding/summary");
              return; // Prevent further state updates
            }
          } else {
            // No existing registration found
            console.log("No existing registration found. Ready for new registration.");
            setIsCheckingRegistration(false); // Allow rendering form
          }
        } catch (error) {
          console.error("Error checking/fetching registration from Sanity:", error);
          setIsCheckingRegistration(false); // Allow rendering form (with potential error state later?)
        }
      } else if (!isAuthenticated && inProgress === InteractionStatus.None) {
        setIsCheckingRegistration(false); // Not logged in, allow login form render
      } else if (inProgress === InteractionStatus.None) {
        setIsCheckingRegistration(false); // Logged in but user info pending?
      }
      // While inProgress, isCheckingRegistration remains true
    };

    setIsCheckingRegistration(true); // Reset on dependency change
    checkAndFetchRegistration();

  }, [isAuthenticated, user?.email, inProgress, router, searchParams]); // Added searchParams dependency

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
    if (value === 'Annet' && !checked) {
      setAnnetText("");
    }
  };

  const handleAttendsPartyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttendsParty(e.target.value);
    setShowAttendsPartyError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    let isValid = true;
    let firstErrorElement: HTMLElement | null = null;

    setShowBuError(false);
    setShowParticipationLocationError(false);
    setShowWantsFoodError(false);
    setShowAttendsPartyError(false);

    if (!bu) {
      setShowBuError(true);
      isValid = false;
      if (!firstErrorElement) {
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

    if (!isValid && firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!user?.email || !user?.name) {
      setSubmitError("Brukerinformasjon mangler. Prøv å logge ut og inn igjen.");
      return;
    }

    setIsSubmitting(true);

    const finalDietaryNeeds = dietaryNeeds.filter((need: string) => need !== "Annet");
    if (dietaryNeeds.includes("Annet") && annetText.trim()) {
      finalDietaryNeeds.push(`Annet: ${annetText.trim()}`);
    }

    // Attempt to read favorite talk slugs from local storage for migration
    let localFavoriteSlugsForApi: string[] = [];
    try {
      const item = localStorage.getItem('favoriteTalks');
      if (item) {
        const parsedSlugs = JSON.parse(item);
        if (Array.isArray(parsedSlugs) && parsedSlugs.every(slug => typeof slug === 'string')) {
          localFavoriteSlugsForApi = parsedSlugs;
        } else {
          console.warn("Local favorites format is invalid, not migrating.");
        }
      }
    } catch (error) {
      console.error("Error reading local favorites for migration:", error);
      // Proceed without local favorites if there's an error reading/parsing
    }

    const submissionData = {
      attendeeName: user.name,
      attendeeEmail: user.email,
      bu: bu,
      participationLocation: participationLocation,
      wantsFood: wantsFood,
      dietaryNeeds: finalDietaryNeeds,
      attendsParty: attendsParty,
      localFavoriteSlugs: localFavoriteSlugsForApi, // Pass the fetched slugs
    };

    try {
      console.log("Submitting registration data to API:", submissionData);
      const response = await fetch('/api/registerAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Log the full error from the API if available
        console.error("API Error Response:", result);
        throw new Error(result.error || result.details || `Network response was not ok (status: ${response.status})`);
      }

      console.log("API Success Response:", result);
      // --- Navigate on success --- 
      router.push("/paamelding/summary");

    } catch (error) {
      console.error("Error submitting registration via API:", error);
      if (error instanceof Error) {
        setSubmitError(`Kunne ikke sende inn påmeldingen: ${error.message}`);
      } else {
        setSubmitError("Kunne ikke sende inn påmeldingen. En ukjent feil oppstod.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const buOptions = [
    { value: "Applications", label: "Applications" },
    { value: "Digital Platform Services", label: "Digital Platform Services" },
    { value: "Advisory", label: "Advisory" },
    { value: "Andre", label: "Andre" },
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

  if (isCheckingRegistration) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-white text-xl">Laster påmelding...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4 mb-12 sm:mb-0">
        <div className="w-full max-w-sm mt-8 sm:mt-0">
          <LoginForm title="Meld deg på" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
      <div className="relative bg-white pt-8 pb-10 px-6 sm:pt-10 sm:pb-12 sm:px-10 md:pt-12 md:pb-16 md:px-16 shadow-lg font-plex">
        <h1 className="text-center text-5xl argent text-black mb-6">
          Meld deg på
        </h1>
        <form id="paamelding-form-element" onSubmit={handleSubmit} className="space-y-6">
          <p className="text-left text-lg mb-8">
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
                <input type="radio" name="wantsFood" value="yes" checked={wantsFood === 'yes'} onChange={handleWantsFoodChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
                <span>Ja</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="wantsFood" value="no" checked={wantsFood === 'no'} onChange={handleWantsFoodChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
                <span>Nei</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="wantsFood" value="digital" checked={wantsFood === 'digital'} onChange={handleWantsFoodChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
                <span>Jeg deltar digitalt og skal ikke ha mat</span>
              </label>
            </div>
            {showWantsFoodError && (
              <p className="text-red-600 text-sm mt-1 font-medium px-1">
                Vennligst svar på om du ønsker mat
              </p>
            )}
          </div>

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
                  autoComplete="off"
                />
              </PixelInput>
            </div>
          )}

          <div>
            <label className="mb-3 block text-md font-bold">Ønsker du å delta på fest etter det faglige programmet?</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="attendsParty" value="yes" checked={attendsParty === 'yes'} onChange={handleAttendsPartyChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
                <span>Ja, jeg er med på det sosiale</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="attendsParty" value="no" checked={attendsParty === 'no'} onChange={handleAttendsPartyChange} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
                <span>Nei, jeg kan dessverre ikke</span>
              </label>
            </div>
            {showAttendsPartyError && (
              <p className="text-red-600 text-sm mt-1 font-medium px-1">
                Vennligst svar på om du vil delta på festen
              </p>
            )}
          </div>

          <div className="pt-3 flex justify-start">
            <button
              type="submit"
              className="cursor-pointer transition-transform active:scale-95 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-block w-[250px] text-center py-4 iceland text-xl">Sender...</span>
              ) : (
                <Image
                  src="/images/SendInn.svg"
                  alt="Send inn"
                  width={211}
                  height={59}
                  style={{ width: '250px', height: 'auto' }}
                />
              )}
            </button>
          </div>
          {submitError && (
            <p className="text-red-600 text-sm mt-2 font-medium px-1">
              {submitError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
} 