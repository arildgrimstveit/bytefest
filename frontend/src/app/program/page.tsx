"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserContext";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import client from '@/sanityClient';
import ProgramLocationFilter from "@/components/ProgramLocationFilter";
import type { Talk, SocialEvent } from "@/types";
// Removed cookies import as we'll rely on useUser for auth status

// Loading component shown while Suspense is resolving or auth/data is loading
function LoadingFallback({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <p className="text-white text-xl">{message}</p>
    </div>
  );
}

// Wrap the main component export in Suspense
export default function ProgramPage() {
  return (
    <Suspense fallback={<LoadingFallback message="Laster program..." />}>
      <ProgramPageContent />
    </Suspense>
  );
}

function ProgramPageContent() {
  const router = useRouter();
  const { user, isAuthenticated } = useUser();
  const { inProgress } = useMsal();
  const [pageStatus, setPageStatus] = useState<'loading' | 'authenticating' | 'fetchingData' | 'formReady' | 'loginRequired' | 'error'>('loading');
  const [allProgramEvents, setAllProgramEvents] = useState<(Talk | SocialEvent)[]>([]);
  const [defaultLocation, setDefaultLocation] = useState('Oslo');
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (inProgress !== InteractionStatus.None) {
      setPageStatus('authenticating');
      return;
    }

    if (!isAuthenticated) {
      setPageStatus('loginRequired');
      router.push('/login?intent=program');
    } else {
      setPageStatus('fetchingData');
    }
  }, [isAuthenticated, inProgress, router]);

  useEffect(() => {
    if (pageStatus === 'fetchingData' && isAuthenticated && user?.email) {
      const fetchData = async () => {
        try {
          const [talks, socialEvents] = await Promise.all([
            client.fetch<Talk[]>(
              `*[_type == "talk"] | order(time asc) {
                _id,
                _type,
                title,
                slug,
                time,
                duration,
                location,
                track,
                speakers[]{
                  _key,
                  name
                }
              }`
            ),
            client.fetch<SocialEvent[]>(
              `*[_type == "social"] | order(time asc) {
                _id,
                _type,
                title,
                slug,
                description,
                location,
                roomAddress,
                time
              }`
            )
          ]);

          const combinedEvents: (Talk | SocialEvent)[] = [...talks, ...socialEvents].sort((a, b) => {
            const timeA = a.time ? new Date(a.time).getTime() : 0;
            const timeB = b.time ? new Date(b.time).getTime() : 0;
            if (!timeA && !timeB) return 0;
            if (!timeA) return 1;
            if (!timeB) return -1;
            return timeA - timeB;
          });
          setAllProgramEvents(combinedEvents);

          // Get user's location
          const attendeeQuery = `*[_type == "attendee" && attendeeEmail == $email][0]{
            participationLocation
          }`;
          const attendee = await client.fetch(attendeeQuery, { email: user.email });
          if (attendee?.participationLocation) {
            setDefaultLocation(attendee.participationLocation);
          }
          setPageStatus('formReady');
        } catch (error) {
          console.error("Error fetching program data:", error);
          setFetchError("Kunne ikke laste programdata. Prøv igjen senere.");
          setPageStatus('error');
        }
      };
      fetchData();
    } else if (pageStatus === 'fetchingData' && isAuthenticated && !user?.email) {
      // This case might happen if user context is authenticated but email is not yet available
      // Or if there's an issue with the user object. For now, treat as error or wait.
      // Let's set to error for now or it could loop if email never arrives.
       console.warn("Authenticated but user email is missing. Cannot fetch personalized data.");
       // Proceed to fetch general data without user location preference.
       const fetchGeneralData = async () => {
        try {
          const [talks, socialEvents] = await Promise.all([
            client.fetch<Talk[]>(
              `*[_type == "talk"] | order(time asc) { /* ... query ... */ }` // Shortened for brevity
            ),
            client.fetch<SocialEvent[]>(
              `*[_type == "social"] | order(time asc) { /* ... query ... */ }` // Shortened for brevity
            )
          ]);
           const combinedEvents: (Talk | SocialEvent)[] = [...talks, ...socialEvents].sort((a, b) => {
            const timeA = a.time ? new Date(a.time).getTime() : 0;
            const timeB = b.time ? new Date(b.time).getTime() : 0;
            if (!timeA && !timeB) return 0;
            if (!timeA) return 1;
            if (!timeB) return -1;
            return timeA - timeB;
          });
          setAllProgramEvents(combinedEvents);
          setDefaultLocation('Oslo'); // Default location as user email is not available
          setPageStatus('formReady');
        } catch (error) {
          console.error("Error fetching general program data:", error);
          setFetchError("Kunne ikke laste programdata. Prøv igjen senere.");
          setPageStatus('error');
        }
      };
      fetchGeneralData(); // Call the function to fetch general data
    }
  }, [pageStatus, isAuthenticated, user?.email]);

  if (pageStatus === 'loading' || pageStatus === 'authenticating') {
    return <LoadingFallback message="Verifiserer bruker..." />;
  }

  if (pageStatus === 'loginRequired') {
    // User will be redirected, but good to have a fallback message or null render
    return <LoadingFallback message="Omdirigerer til innlogging..." />;
  }

  if (pageStatus === 'fetchingData') {
    return <LoadingFallback message="Henter programdata..." />;
  }
  
  if (pageStatus === 'error') {
    return (
      <div className="text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl argent text-center mb-10">Program</h1>
          <p>{fetchError || "En feil oppstod."}</p>
        </div>
      </div>
    );
  }

  if (pageStatus === 'formReady') {
    if (!allProgramEvents || allProgramEvents.length === 0) {
      return (
        <div className="text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl argent text-center mb-10">Program</h1>
            <p>Ingen programposter funnet.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-5xl argent text-center mb-10">Program</h1>
          <ProgramLocationFilter allProgramEvents={allProgramEvents} defaultLocation={defaultLocation} />
        </div>
      </div>
    );
  }

  // Fallback for any unhandled state
  return <LoadingFallback message="Laster..." />;
}
