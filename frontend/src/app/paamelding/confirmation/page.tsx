"use client";

import { useState, useEffect } from "react";
import { RegistrationSubmitData } from "../summary/page"; // Assuming type is exported from summary
// Or define the type locally if not exported:
/*
interface RegistrationSubmitData {
  bu: string;
  participationLocation: string;
  wantsFood: string;
  dietaryNeeds: string[];
  attendsParty: string;
  willPresent: string;
  attendeeName?: string;
  attendeeEmail?: string;
}
*/

export default function Confirmation() {
  // State to hold the summary data
  const [summaryData, setSummaryData] = useState<RegistrationSubmitData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read data from localStorage on mount
    const bu = localStorage.getItem('paameldingBu') || '';
    const participationLocation = localStorage.getItem('paameldingParticipationLocation') || '';
    const wantsFood = localStorage.getItem('paameldingWantsFood') || '';
    const dietaryNeeds = JSON.parse(localStorage.getItem('paameldingDietaryNeeds') || '[]');
    const attendsParty = localStorage.getItem('paameldingAttendsParty') || '';
    const willPresent = localStorage.getItem('paameldingWillPresent') || '';
    
    // Check if essential data exists (optional, but good practice)
    if (bu && participationLocation) { 
        setSummaryData({
            bu,
            participationLocation,
            wantsFood,
            dietaryNeeds,
            attendsParty,
            willPresent,
            // Note: attendeeName/Email are not stored/retrieved here
        });
    } else {
        // Handle case where data is missing (e.g., user navigated directly)
        console.warn("Registration data not found in localStorage for confirmation page.");
    }

    // Clear localStorage items *after* reading them
    localStorage.removeItem('paameldingBu');
    localStorage.removeItem('paameldingParticipationLocation');
    localStorage.removeItem('paameldingWantsFood');
    localStorage.removeItem('paameldingDietaryNeeds');
    localStorage.removeItem('paameldingAttendsParty');
    localStorage.removeItem('paameldingWillPresent');
    localStorage.removeItem('isReturningFromPaameldingSummary'); // Also clear this flag

    setLoading(false);

  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Helper Functions (Copied from Summary page) --- 

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

  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      <div className="w-full max-w-4xl mx-auto my-8">
        <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Du er påmeldt!</h1>
          

          <p className="mb-6">
              Vi gleder oss til å se deg 5. juni!
          </p>

          {/* --- Summary Box --- */}
          {!loading && summaryData ? (
            <>
              <div className="bg-[#FDF4E3] p-6 border-2 border-black space-y-4 mb-8">
                
                {/* BU */}
                <div>
                  <h3 className="font-bold text-md mb-1">Hvilken BU tilhører du?</h3>
                  <p>{summaryData.bu || "Ikke oppgitt"}</p>
                </div>
                
                {/* Participation Location */}
                <div>
                  <h3 className="font-bold text-md mb-1">Hvor vil du delta?</h3>
                  <p>{summaryData.participationLocation || "Ikke oppgitt"}</p>
                </div>

                {/* Wants Food - Conditionally shown? Or always? Let's show if not digital */}
                {summaryData.participationLocation !== 'Digitalt' && (
                  <div>
                    <h3 className="font-bold text-md mb-1">Ønsker du mat under arangementet?</h3>
                    <p>{getWantsFoodText(summaryData.wantsFood) || "Ikke oppgitt"}</p>
                  </div>
                )}

                {/* Dietary Needs - Show only if needs exist */}
                {summaryData.dietaryNeeds.length > 0 && (
                  <div>
                    <h3 className="font-bold text-md mb-1">Dietthensyn</h3>
                    <p>{summaryData.dietaryNeeds.join(", ")}</p>
                  </div>
                )}
                
                {/* Attends Party */}
                <div>
                    <h3 className="font-bold text-md mb-1">Ønsker du å delta på fest etter det faglige programmet?</h3>
                    <p>{getAttendsPartyText(summaryData.attendsParty) || "Ikke oppgitt"}</p>
                  </div>

                  {/* Will Present */}
                  <div>
                    <h3 className="font-bold text-md mb-1">Skal du holde foredrag på Bytefest?</h3>
                    <p>{getWillPresentText(summaryData.willPresent) || "Ikke oppgitt"}</p>
                  </div>
              </div> 
            </>
          ) : !loading ? (
             <p className="text-center text-gray-600 mb-8">(Kunne ikke hente påmeldingsdetaljer)</p>
          ) : null /* Don't show anything while loading */ }

        </div>
      </div>
    </div>
  );
} 