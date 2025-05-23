"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/components/UserContext";
import sanityClient from "@/sanityClient";
import type { Attendee } from "@/types/attendee"; // Import from the renamed file

// Helper function to format dietary needs for display
const formatDietaryNeeds = (needs?: string[]): string => {
  if (!needs || needs.length === 0) {
    return "Ingen spesifisert";
  }
  // Handle potential "Annet: ..." entries
  return needs
    .map(need => need.startsWith("Annet: ") ? need.substring("Annet: ".length) : need)
    .join(", ");
};

export default function PaameldingSummary() {
  const router = useRouter();
  const { user, isAuthenticated } = useUser();
  const [registration, setRegistration] = useState<Attendee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false); // State for deletion status
  const [deleteError, setDeleteError] = useState<string | null>(null); // State for deletion error

  useEffect(() => {
    const fetchRegistration = async () => {
      if (isAuthenticated && user?.email) {
        setIsLoading(true);
        setError(null);
        try {
          console.log("[SummaryPage] Fetching registration for email:", user.email);
          const query = `*[_type == "attendee" && attendeeEmail == $email][0]`;
          const params = { email: user.email };
          const data: Attendee | null = await sanityClient.withConfig({ useCdn: false }).fetch(query, params);

          if (data) {
            setRegistration(data);
          } else {
            router.push("/paamelding?status=registration_not_found"); // Redirect to registration page
          }
        } catch (err) {
          console.error("Error fetching registration:", err);
          setError("En feil oppstod under henting av påmeldingsdata.");
        } finally {
          setIsLoading(false);
        }
      } else if (!isAuthenticated) {
        // If user somehow lands here unauthenticated, redirect to login/form
        router.push('/paamelding');
      }
    };

    fetchRegistration();
  }, [isAuthenticated, user?.email, router]);

  // --- Deregister Handler --- 
  const handleDeregister = async () => {
    if (!user?.email) {
      setDeleteError("Brukerinformasjon ikke funnet. Kan ikke melde av.");
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      console.log(`Attempting to deregister user: ${user.email}`);
      const response = await fetch('/api/deregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API Deregister Error Response:", result);
        throw new Error(result.error || result.details || `Nettverksrespons var ikke ok (status: ${response.status})`);
      }

      console.log("Deregistration successful via API");
      router.push("/?deregistered=true");

    } catch (err) {
      console.error("Error during deregistration call:", err);
      if (err instanceof Error) {
        setDeleteError(`En feil oppstod under avmelding: ${err.message}`);
      } else {
        setDeleteError("En feil oppstod under avmelding. Prøv igjen.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Display Loading State --- 
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-white text-xl">Laster din påmelding...</p>
      </div>
    );
  }

  // --- Display Error State --- 
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 text-center text-white">
        <h1 className="text-3xl argent mb-4">Feil</h1>
        <p className="text-red-400 mb-6">{error}</p>
        <Link href="/paamelding" className="inline-block px-6 py-3 bg-white text-[#161E38] font-bold rounded hover:bg-gray-200 transition-colors">
          Gå til påmelding
        </Link>
      </div>
    );
  }

  // --- Display Confirmation and Data --- 
  if (registration) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
        <div className="relative bg-white pt-8 pb-10 px-6 sm:pt-10 sm:pb-12 sm:px-10 md:pt-12 md:pb-16 md:px-16 shadow-lg font-plex">
          <h1 className="text-center text-5xl argent text-black mb-6">
            Du er påmeldt!
          </h1>
          <p className="text-left text-lg mb-4">
            Ble det riktig? Se over det du har fylt inn og gjør eventuelt endringer. Du kan endre
            påmeldingen din senere ved å klikke på påmeldingslenken på nytt.
          </p>
          <p className="text-left text-lg mb-6">
            Vi gleder oss til å se deg 5. juni!
          </p>

          {/* Summary Box */}
          <div className="bg-[#FDF2E5] p-6 sm:p-8 border-2 border-black mb-10">
            <h2 className="text-3xl sm:text-4xl iceland text-black text-left mb-6 sm:mb-8">Oppsummering</h2>
            <div className="space-y-4 text-md">
              <div>
                <p className="font-bold">Hvilken BU tilhører du?</p>
                <p>{registration.bu}</p>
              </div>
              <div>
                <p className="font-bold">Hvor vil du delta?</p>
                <p>{registration.participationLocation}</p>
              </div>
              {/* Only show food/diet if not digital */}
              {registration.participationLocation !== 'Digitalt' && (
                <>
                  <div>
                    <p className="font-bold">Ønsker du mat?</p>
                    <p>{registration.wantsFood === 'yes' ? 'Ja' : 'Nei'}</p>
                  </div>
                  {registration.wantsFood === 'yes' && (
                    <div>
                      <p className="font-bold">Dietthensyn:</p>
                      <p>{formatDietaryNeeds(registration.dietaryNeeds)}</p>
                    </div>
                  )}
                </>
              )}
              <div>
                <p className="font-bold">Delta på fest etter faglig program?</p>
                <p>{registration.attendsParty === 'yes' ? 'Ja, jeg er med på det sosiale' : 'Nei, jeg kan dessverre ikke'}</p>
              </div>
            </div>
            <p className="text-sm mt-4 pt-4">
              Ved påmelding samtykker du til lagring av personopplysninger, les <Link href="/privacy-policy" className="underline hover:no-underline">personvernerklæring</Link>.
            </p>
          </div>

          {/* Button container */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-6">
            {/* Edit Button */}
            <Link href="/paamelding?edit=true" className="cursor-pointer transition-transform active:scale-95 hover:opacity-80 block w-full sm:w-auto">
              <Image
                src="/images/EndrePaamelding.svg"
                alt="Endre påmelding"
                width={280}
                height={70}
              />
            </Link>

            {/* Deregister Button / Loading State */}
            <div className="flex items-center w-full sm:w-auto">
              {isDeleting ? (
                <span className="iceland text-xl h-[59px] flex items-center justify-center w-[269px] text-center">Melder av...</span>
              ) : (
                <button
                  onClick={handleDeregister}
                  className="cursor-pointer transition-transform active:scale-95 hover:opacity-80 block"
                  aria-label="Meld deg av"
                  disabled={isDeleting}
                >
                  <Image
                    src="/images/MeldDegAv.svg"
                    alt="Meld deg av"
                    width={269}
                    height={59}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Display deletion error if any */}
          {deleteError && (
            <p className="text-red-600 text-sm mt-4 text-right font-medium">{deleteError}</p>
          )}
        </div>
      </div>
    );
  }

  // Fallback if no registration, loading, or error (should ideally not be reached)
  return (
    <div className="text-center text-white py-16">Ingen påmeldingsdata funnet.</div>
  );
} 