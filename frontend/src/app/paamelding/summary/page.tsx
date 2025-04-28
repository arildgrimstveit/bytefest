"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserContext";

// Export the interface
export interface RegistrationSubmitData {
  bu: string;
  participationLocation: string;
  wantsFood: string;
  dietaryNeeds: string[];
  attendsParty: string;
  willPresent: string;
  attendeeName?: string;
  attendeeEmail?: string;
}

export default function Summary() {
  const router = useRouter();
  const { user } = useUser(); // Only need user context here

  // State for the form data retrieved from localStorage
  const [formData, setFormData] = useState<RegistrationSubmitData>({
    bu: '',
    participationLocation: '',
    wantsFood: '',
    dietaryNeeds: [],
    attendsParty: '',
    willPresent: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Retrieve data from localStorage using the keys set in the form page
    const bu = localStorage.getItem('paameldingBu') || '';
    const participationLocation = localStorage.getItem('paameldingParticipationLocation') || '';
    const wantsFood = localStorage.getItem('paameldingWantsFood') || '';
    const dietaryNeeds = JSON.parse(localStorage.getItem('paameldingDietaryNeeds') || '[]');
    const attendsParty = localStorage.getItem('paameldingAttendsParty') || '';
    const willPresent = localStorage.getItem('paameldingWillPresent') || '';

    setFormData({
      bu,
      participationLocation,
      wantsFood,
      dietaryNeeds,
      attendsParty,
      willPresent,
    });
    setLoading(false);
  }, []);

  // --- Helper Functions for Display --- 

  const getWantsFoodText = (value: string) => {
    switch (value) {
      case 'yes': return 'Ja';
      case 'no': return 'Nei';
      case 'digital': return 'Jeg deltar digitalt';
      default: return '';
    }
  };

  const getAttendsPartyText = (value: string) => {
    switch (value) {
      case 'yes': return 'Ja, jeg er med på det sosiale';
      case 'no': return 'Nei, jeg kan dessverre ikke';
      default: return '';
    }
  };

  const getWillPresentText = (value: string) => {
    switch (value) {
      case 'yes': return 'Ja';
      case 'no': return 'Nei';
      default: return '';
    }
  };

  // --- Event Handlers ---

  const handleSubmit = async () => {
    setIsSubmitting(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const submitData: RegistrationSubmitData = {
      ...formData,
      attendeeName: user?.name || "",
      attendeeEmail: user?.email || ""
    };

    // console.log("Submitting registration data:", submitData);

    // ** Call the API route **
    try {
      const response = await fetch('/api/registerAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
         // Attempt to parse error details from the API response
         let errorDetails = 'Unknown error';
         try {
            const errorBody = await response.json();
            errorDetails = errorBody.error || errorBody.details || JSON.stringify(errorBody);
         } catch (parseError) {
             // Log the parsing error and fallback to text
             console.warn("Failed to parse error response body as JSON:", parseError); 
             errorDetails = await response.text(); // Fallback to raw text
         }
         throw new Error(`Failed to submit registration (${response.status}): ${errorDetails}`);
      }
      
      // // Simulate API call delay -- REMOVED
      // await new Promise(resolve => setTimeout(resolve, 1500)); 

      // Clear localStorage items after successful API submission
      // Re-enabled clearing on this page now that API call is added
      localStorage.removeItem('paameldingBu');
      localStorage.removeItem('paameldingParticipationLocation');
      localStorage.removeItem('paameldingWantsFood');
      localStorage.removeItem('paameldingDietaryNeeds');
      localStorage.removeItem('paameldingAttendsParty');
      localStorage.removeItem('paameldingWillPresent');
      localStorage.removeItem('isReturningFromPaameldingSummary'); 
      

      // Redirect to confirmation page
      router.push('/paamelding/confirmation'); // Use Next.js router

    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Det oppstod en feil ved innsending av påmeldingen. Vennligst prøv igjen senere.');
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    // Set flag so the form page knows to restore data
    localStorage.setItem('isReturningFromPaameldingSummary', 'true');
    router.push('/paamelding'); // Navigate back to the form
  };

  // --- Render Logic ---

  if (loading) {
    // Basic loading state while retrieving from localStorage
    return (
      <div className="flex min-h-screen items-center justify-center">
        Laster oppsummering...
      </div>
    );
  }

  if (isSubmitting) {
    // Display submitting state
    return (
      <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
        <div className="w-full max-w-4xl mx-auto my-8 relative">
          <div className="relative bg-white p-6 sm:p-8 shadow-lg px-4 sm:px-10 md:px-20 break-words">
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
            <div className="flex flex-col items-center justify-center py-10">
              <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Sender inn...</h1>
              <p className="text-center">Vennligst vent mens påmeldingen din blir registrert.</p>
              {/* Optional: Add a spinner */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      <div className="w-full max-w-4xl mx-auto my-8">
         {/* Reuse the outer card structure */}
        <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20">
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
            <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Oppsummering</h1>
          
            <p className="mb-6">Ble det riktig? Se over det du har skrevet og gjør eventuelle endringer før du sender inn.</p>
            
             {/* Summary Box - Style similar to the first image */}
            <div className="bg-[#FDF4E3] p-6 border-2 border-black space-y-4 mb-8">
              
              {/* BU */}
              <div>
                <h3 className="font-bold text-md mb-1">Hvilken BU tilhører du?</h3>
                <p>{formData.bu || "Ikke valgt"}</p>
              </div>
              
              {/* Participation Location */}
              <div>
                <h3 className="font-bold text-md mb-1">Hvor vil du delta?</h3>
                <p>{formData.participationLocation || "Ikke valgt"}</p>
              </div>

              {/* Wants Food - Conditionally shown? Or always? Let's show if not digital */}
              {formData.participationLocation !== 'Digitalt' && (
                <div>
                  <h3 className="font-bold text-md mb-1">Ønsker du mat under arangementet?</h3>
                  <p>{getWantsFoodText(formData.wantsFood) || "Ikke valgt"}</p>
                </div>
              )}

              {/* Add Dietary Needs Display */}
              {formData.dietaryNeeds.length > 0 && (
                <div>
                  <h3 className="font-bold text-md mb-1">Dietthensyn</h3>
                  <p>{formData.dietaryNeeds.join(", ")}</p>
                </div>
              )}
              
               {/* Attends Party */}
               <div>
                  <h3 className="font-bold text-md mb-1">Ønsker du å delta på fest etter det faglige programmet?</h3>
                  <p>{getAttendsPartyText(formData.attendsParty) || "Ikke valgt"}</p>
                </div>

                {/* Will Present */}
                <div>
                  <h3 className="font-bold text-md mb-1">Skal du holde foredrag på Bytefest?</h3>
                  <p>{getWillPresentText(formData.willPresent) || "Ikke valgt"}</p>
                </div>
                
                {/* Optional: Display User Info again? */}
                {/* 
                <div className="pt-4 mt-4 border-t border-gray-300">
                   <h3 className="font-bold text-md mb-1">Påmeldt som:</h3>
                   <p>{user?.name} ({user?.email})</p>
                 </div> 
                 */}
            </div>
            
             {/* Button Container */}
            <div className="flex justify-between items-center mt-8">
              {/* Back Button (Left) */}
              <button 
                type="button"
                onClick={handleGoBack}
                className="cursor-pointer transition-transform active:scale-95 hover:opacity-80"
                disabled={isSubmitting}
              >
                {/* Assuming you have a back button image, or use text */}
                 <Image 
                  src="/images/Tilbake.svg" 
                  alt="Tilbake og endre" 
                  width={211} // Adjust size as needed
                  height={59}
                  style={{ width: '250px', height: 'auto' }} 
                />
                {/* Alternative: <span className="underline hover:no-underline"> &lt; Endre påmelding</span> */}
              </button>
              
              {/* Submit Button (Right) */}
              <button 
                type="button" 
                onClick={handleSubmit}
                className="cursor-pointer transition-transform active:scale-95 hover:opacity-80"
                disabled={isSubmitting}
              >
                <Image 
                    src="/images/SendInn.svg"
                    alt="Send inn påmelding"
                    width={211} 
                    height={59}
                    style={{ width: '250px', height: 'auto' }} 
                />
              </button>
            </div>
        </div>
      </div>
    </div>
  );
} 