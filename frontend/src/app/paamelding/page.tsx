"use client";

import { useState, useEffect, useRef, Suspense, useCallback, useMemo } from "react";
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

interface BusinessUnitInputProps {
  bu: string;
  setBu: (value: string) => void;
  isBuDropdownOpen: boolean;
  setIsBuDropdownOpen: (isOpen: boolean) => void;
  showBuError: boolean;
  setShowBuError: (show: boolean) => void;
  buDropdownRef: React.RefObject<HTMLDivElement | null>;
  buOptions: Array<{ value: string; label: string }>;
}

const BusinessUnitInput: React.FC<BusinessUnitInputProps> = ({
  bu,
  setBu,
  isBuDropdownOpen,
  setIsBuDropdownOpen,
  showBuError,
  setShowBuError,
  buDropdownRef,
  buOptions,
}) => {
  return (
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
              {buOptions.find(opt => opt.value === bu)?.label || "Velg"}
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
                onClick={() => { setBu(option.value); setIsBuDropdownOpen(false); setShowBuError(false); }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ParticipationLocationInputProps {
  participationLocation: string;
  setParticipationLocation: (value: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  showError: boolean;
  setShowError: (show: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  options: Array<{ value: string; label: string }>;
}

const ParticipationLocationInput: React.FC<ParticipationLocationInputProps> = ({
  participationLocation,
  setParticipationLocation,
  isDropdownOpen,
  setIsDropdownOpen,
  showError,
  setShowError,
  dropdownRef,
  options,
}) => {
  return (
    <div>
      <label htmlFor="participation-location" className="mb-3 block text-md font-bold">Hvor vil du delta?</label>
      <div className="w-full relative" ref={dropdownRef}>
        <PixelInput>
          <button
            type="button"
            className="w-full p-3 bg-white focus:outline-none appearance-none cursor-pointer text-left flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            aria-controls="participation-location-dropdown"
          >
            <span className={participationLocation ? "" : "text-gray-500"}>
              {options.find(opt => opt.value === participationLocation)?.label || "Velg"}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </PixelInput>
        {showError && (
          <p className="text-red-600 text-sm mt-1 font-medium px-1">
            Vennligst velg hvor du vil delta
          </p>
        )}
        {isDropdownOpen && (
          <div id="participation-location-dropdown" className="absolute z-20 w-full mt-1 border-2 border-black bg-white max-h-60 overflow-auto p-0 shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full px-4 py-2 text-left hover:bg-[#F8F5D3] cursor-pointer ${participationLocation === option.value ? 'bg-[#F8F5D3]' : 'bg-white'}`}
                onClick={() => { setParticipationLocation(option.value); setIsDropdownOpen(false); setShowError(false); }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface FoodPreferencesSectionProps {
  wantsFood: string;
  setWantsFood: (value: string) => void;
  showWantsFoodError: boolean;
  setShowWantsFoodError: (show: boolean) => void;
  dietaryNeeds: string[];
  setDietaryNeeds: React.Dispatch<React.SetStateAction<string[]>>;
  annetText: string;
  setAnnetText: (value: string) => void;
}

const FoodPreferencesSection: React.FC<FoodPreferencesSectionProps> = ({
  wantsFood,
  setWantsFood,
  showWantsFoodError,
  setShowWantsFoodError,
  dietaryNeeds,
  setDietaryNeeds,
  annetText,
  setAnnetText,
}) => {
  const dietaryOptionsList = [
    { value: "Vegetarisk", label: "Vegetarisk" },
    { value: "Vegansk", label: "Vegansk" },
    { value: "Glutenfritt", label: "Glutenfritt" },
    { value: "Melkefritt", label: "Melkefritt" },
    { value: "Laktosefritt", label: "Laktosefritt" },
    { value: "Annet", label: "Annet", id: "diet-other" }
  ];

  return (
    <>
      <div>
        <label className="mb-3 block text-md font-bold">Ønsker du mat under arangementet?</label>
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="wantsFood" value="yes" checked={wantsFood === 'yes'} onChange={(e) => { setWantsFood(e.target.value); setShowWantsFoodError(false); }} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
            <span>Ja</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="wantsFood" value="no" checked={wantsFood === 'no'} onChange={(e) => { setWantsFood(e.target.value); setShowWantsFoodError(false); if (e.target.value !== 'yes') { setDietaryNeeds([]); setAnnetText("");} }} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
            <span>Nei</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="wantsFood" value="digital" checked={wantsFood === 'digital'} onChange={(e) => { setWantsFood(e.target.value); setShowWantsFoodError(false); if (e.target.value !== 'yes') { setDietaryNeeds([]); setAnnetText("");} }} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
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
            {dietaryOptionsList.map(option => (
              <label key={option.value} className="inline-flex items-center space-x-2 cursor-pointer max-w-fit flex-shrink-0">
                <div className="relative w-5 h-5">
                  <input
                    id={option.id}
                    type="checkbox"
                    value={option.value}
                    checked={dietaryNeeds.includes(option.value)}
                    onChange={(e) => {
                        const { value, checked } = e.target;
                        setDietaryNeeds(prev => checked ? [...prev, value] : prev.filter(need => need !== value));
                        if (value === 'Annet' && !checked) setAnnetText("");
                    }}
                    className="appearance-none w-full h-full border-2 border-black rounded-sm cursor-pointer"
                  />
                  {dietaryNeeds.includes(option.value) && (
                    <span className="absolute inset-0 flex items-center justify-center text-black pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  )}
                </div>
                <span>{option.label}</span>
              </label>
            ))}
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
    </>
  );
};

interface PartyAttendanceSectionProps {
  attendsParty: string;
  setAttendsParty: (value: string) => void;
  showAttendsPartyError: boolean;
  setShowAttendsPartyError: (show: boolean) => void;
}

const PartyAttendanceSection: React.FC<PartyAttendanceSectionProps> = ({
  attendsParty,
  setAttendsParty,
  showAttendsPartyError,
  setShowAttendsPartyError,
}) => {
  return (
    <div>
      <label className="mb-3 block text-md font-bold">Ønsker du å delta på fest etter det faglige programmet?</label>
      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="attendsParty" value="yes" checked={attendsParty === 'yes'} onChange={(e) => { setAttendsParty(e.target.value); setShowAttendsPartyError(false);}} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
          <span>Ja, jeg er med på det sosiale</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="radio" name="attendsParty" value="no" checked={attendsParty === 'no'} onChange={(e) => { setAttendsParty(e.target.value); setShowAttendsPartyError(false);}} className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer" />
          <span>Nei, jeg kan dessverre ikke</span>
        </label>
      </div>
      {showAttendsPartyError && (
        <p className="text-red-600 text-sm mt-1 font-medium px-1">
          Vennligst svar på om du vil delta på festen
        </p>
      )}
    </div>
  );
};

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
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useUser();
  const { instance, inProgress } = useMsal();

  // Form field states
  const [bu, setBu] = useState("");
  const [participationLocation, setParticipationLocation] = useState("");
  const [wantsFood, setWantsFood] = useState("");
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [attendsParty, setAttendsParty] = useState("");

  // UI state for dropdowns
  const [isBuDropdownOpen, setIsBuDropdownOpen] = useState(false);
  const [isParticipationLocationDropdownOpen, setIsParticipationLocationDropdownOpen] = useState(false);
  const buDropdownRef = useRef<HTMLDivElement | null>(null);
  const participationLocationDropdownRef = useRef<HTMLDivElement | null>(null);

  // Validation error states
  const [showBuError, setShowBuError] = useState(false);
  const [showParticipationLocationError, setShowParticipationLocationError] = useState(false);
  const [showWantsFoodError, setShowWantsFoodError] = useState(false);
  const [showAttendsPartyError, setShowAttendsPartyError] = useState(false);

  // Other form states
  const [annetText, setAnnetText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Component/Page lifecycle states
  const [pageStatus, setPageStatus] = useState<'loading' | 'authenticating' | 'checkingRegistration' | 'formReady' | 'loginRequired'>('loading');

  const buOptionsList = [
    { value: "Applications", label: "Applications" },
    { value: "Digital Platform Services", label: "Digital Platform Services" },
    { value: "Advisory", label: "Advisory" },
    { value: "Andre", label: "Andre" },
  ];

  // Define participationLocationOptions before it's used in useCallback, and memoize it.
  const participationLocationOptions = useMemo(() => [
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
  ], []);

  const mapDepartmentToBu = useCallback((adDepartment: string | undefined): string => {
    if (!adDepartment) return "";
    if (adDepartment.includes("Application services")) return "Applications";
    if (adDepartment.includes("DPS Consulting")) return "Digital Platform Services";
    if (adDepartment.includes("Advisory")) return "Advisory";
    return "Andre";
  }, []);

  const mapOfficeLocationToParticipationLocation = useCallback((officeLocation: string | undefined): string => {
    if (!officeLocation) return "";
    const city = officeLocation.split(" ")[0];
    const matchedOption = participationLocationOptions.find(opt => opt.value.toLowerCase() === city.toLowerCase());
    return matchedOption ? matchedOption.value : "";
  }, [participationLocationOptions]);

  // Effect 1: Handle MSAL redirect and initial authentication status
  useEffect(() => {
    if (inProgress === InteractionStatus.Startup) {
        setPageStatus('authenticating'); // MSAL is starting up
        return;
    }
    if (inProgress === InteractionStatus.HandleRedirect) {
        setPageStatus('authenticating'); // MSAL is handling redirect
        instance.handleRedirectPromise().then((response) => {
            if (response) {
                instance.setActiveAccount(response.account);
                window.setTimeout(() => window.dispatchEvent(new Event('msal:login:complete')), 100);
            }
            // After handling, UserContext will update isAuthenticated, triggering other effects
        }).catch(error => {
            console.error("Error handling redirect in PaameldingPage:", error);
            setPageStatus('loginRequired'); // Or some error state
        });
        return;
    }

    if (inProgress === InteractionStatus.None) {
        if (isAuthenticated) {
            setPageStatus('checkingRegistration');
        } else {
            setPageStatus('loginRequired');
        }
    }
  }, [inProgress, isAuthenticated, instance]);

  // Effect 2: Fetch existing registration or prepare for new registration
  useEffect(() => {
    if (pageStatus !== 'checkingRegistration' || !isAuthenticated || !user?.email) {
      return; // Only run if auth is confirmed and user email is available
    }

    const isEditMode = searchParams.get('edit') === 'true';

    const loadRegistrationData = async () => {
      try {
        const query = isEditMode
          ? `*[_type == "attendee" && attendeeEmail == $email][0]`
          : `*[_type == "attendee" && attendeeEmail == $email][0]{_id}`;
        const params = { email: user.email! }; // user.email is checked above
        const existingData: Attendee | { _id: string } | null = await sanityClient.withConfig({ useCdn: false }).fetch(query, params);

        if (existingData) {
          if (isEditMode) {
            const fullData = existingData as Attendee;
            setBu(fullData.bu || "");
            setParticipationLocation(fullData.participationLocation || "");
            setWantsFood(fullData.wantsFood || "");
            const fetchedDietaryNeeds = fullData.dietaryNeeds || [];
            const annetEntry = fetchedDietaryNeeds.find((need: string) => need.startsWith("Annet: "));
            const otherNeeds = fetchedDietaryNeeds.filter((need: string) => !need.startsWith("Annet: "));
            if (annetEntry) {
              setAnnetText(annetEntry.substring("Annet: ".length));
              setDietaryNeeds(["Annet", ...otherNeeds]);
            } else {
              setAnnetText("");
              setDietaryNeeds(otherNeeds);
            }
            setAttendsParty(fullData.attendsParty || "");
            setPageStatus('formReady');
          } else {
            router.push("/paamelding/summary");
            return;
          }
        } else {
          // New registration: prefill BU if department exists
          if (user?.department) {
            setBu(mapDepartmentToBu(user.department));
          }
          // New registration: prefill participationLocation if officeLocation exists
          if (user?.officeLocation) {
            setParticipationLocation(mapOfficeLocationToParticipationLocation(user.officeLocation));
          }
          setPageStatus('formReady');
        }
      } catch (error) {
        console.error("Error in loadRegistrationData:", error);
        setSubmitError("Feil ved lasting av påmeldingsdata.");
        setPageStatus('formReady'); // Allow showing form even if data load fails, with an error
      }
    };

    loadRegistrationData();
  }, [pageStatus, isAuthenticated, user?.email, user?.department, user?.officeLocation, searchParams, router, instance, mapDepartmentToBu, mapOfficeLocationToParticipationLocation]);

  // Effect for dropdown clicks (no change)
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    let isValid = true;
    let firstErrorElement: HTMLElement | null = null;

    // Reset all error states
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
        // Attempt to find the first radio button of the group
        firstErrorElement = document.querySelector('input[name="wantsFood"]');
      }
    }
    if (!attendsParty) {
      setShowAttendsPartyError(true);
      isValid = false;
      if (!firstErrorElement) {
        // Attempt to find the first radio button of the group
        firstErrorElement = document.querySelector('input[name="attendsParty"]');
      }
    }

    if (!isValid && firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return isValid;
  };

  const prepareSubmissionData = () => {
    const finalDietaryNeeds = dietaryNeeds.filter((need: string) => need !== "Annet");
    if (dietaryNeeds.includes("Annet") && annetText.trim()) {
      finalDietaryNeeds.push(`Annet: ${annetText.trim()}`);
    }

    let localFavoriteSlugsForApi: string[] = [];
    try {
      const item = localStorage.getItem('favoriteTalks');
      if (item) {
        const parsedSlugs = JSON.parse(item);
        if (Array.isArray(parsedSlugs) && parsedSlugs.every(slug => typeof slug === 'string')) {
          localFavoriteSlugsForApi = parsedSlugs;
        }
      }
    } catch (error) {
      console.error("Error reading local favorites for migration:", error);
      // Optionally, inform the user or send a report, but for now, just log and continue
    }

    // user.name and user.email are confirmed to exist by the check in handleSubmit before this would be called
    return {
      attendeeName: user!.name!,
      attendeeEmail: user!.email!,
      phoneNumber: user!.phoneNumber || "",
      bu: bu,
      participationLocation: participationLocation,
      wantsFood: wantsFood,
      dietaryNeeds: finalDietaryNeeds,
      attendsParty: attendsParty,
      localFavoriteSlugs: localFavoriteSlugsForApi,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    if (!user?.email || !user?.name) {
      setSubmitError("Brukerinformasjon mangler. Prøv å logge ut og inn igjen.");
      return;
    }

    setIsSubmitting(true);

    const submissionData = prepareSubmissionData();

    try {
      const response = await fetch('/api/registerAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", result);
        throw new Error(result.error || result.details || `Network response was not ok (status: ${response.status})`);
      }
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

  const buOptions = buOptionsList; // Use the defined list for rendering

  // --- Conditional Rendering based on pageStatus ---
  if (pageStatus === 'loading' || pageStatus === 'authenticating') {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-white text-xl">Laster påmeldingsskjema...</p>
      </div>
    );
  }

  if (pageStatus === 'loginRequired') {
    return (
      <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4 mb-12 sm:mb-0">
        <div className="w-full max-w-sm mt-8 sm:mt-0">
          <LoginForm title="Meld deg på" />
        </div>
      </div>
    );
  }

  if (pageStatus === 'checkingRegistration') {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-white text-xl">Sjekker din påmeldingsstatus...</p>
      </div>
    );
  }
  
  // Only render form if pageStatus is 'formReady'
  if (pageStatus !== 'formReady') {
    // This is a fallback, should ideally be handled by one of the specific status returns above
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <p className="text-white text-xl">Laster...</p>
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

          <BusinessUnitInput
            bu={bu}
            setBu={setBu}
            isBuDropdownOpen={isBuDropdownOpen}
            setIsBuDropdownOpen={setIsBuDropdownOpen}
            showBuError={showBuError}
            setShowBuError={setShowBuError}
            buDropdownRef={buDropdownRef}
            buOptions={buOptions}
          />

          <ParticipationLocationInput
            participationLocation={participationLocation}
            setParticipationLocation={setParticipationLocation}
            isDropdownOpen={isParticipationLocationDropdownOpen}
            setIsDropdownOpen={setIsParticipationLocationDropdownOpen}
            showError={showParticipationLocationError}
            setShowError={setShowParticipationLocationError}
            dropdownRef={participationLocationDropdownRef}
            options={participationLocationOptions}
          />

          <FoodPreferencesSection 
            wantsFood={wantsFood}
            setWantsFood={setWantsFood}
            showWantsFoodError={showWantsFoodError}
            setShowWantsFoodError={setShowWantsFoodError}
            dietaryNeeds={dietaryNeeds}
            setDietaryNeeds={setDietaryNeeds}
            annetText={annetText}
            setAnnetText={setAnnetText}
          />

          <PartyAttendanceSection 
            attendsParty={attendsParty}
            setAttendsParty={setAttendsParty}
            showAttendsPartyError={showAttendsPartyError}
            setShowAttendsPartyError={setShowAttendsPartyError}
          />

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