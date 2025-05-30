"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserContext";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import client from '@/sanityClient';
import ProgramFilter from "@/components/ProgramFilter";
import type { Talk, SocialEvent } from "@/types";

// Loading component shown while Suspense is resolving or auth/data is loading
function LoadingFallback({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <p className="text-white text-xl">{message}</p>
    </div>
  );
}

// This is the main page component statically rendered with a title.
export default function ProgramPage() {
  return (
    <div className="text-white py-20"> {/* Changed py-12 to py-20 */}
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Static title, matching talks page style */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl argent text-[#F8F5D3]">Program</h1>
        </div>
        {/* Suspense boundary for the client-rendered content */}
        <Suspense fallback={<LoadingFallback message="Laster programdata..." />}>
          <ProgramPageContent />
        </Suspense>
      </div>
    </div>
  );
}

// This component contains all client-side logic and dynamic content.
function ProgramPageContent() {
  "use client";

  const router = useRouter();
  const { user, isAuthenticated, isAuthStatusKnown, activeAccount } = useUser();
  const { inProgress } = useMsal();
  const [pageStatus, setPageStatus] = useState<
    'loading' | 'authenticating' | 'fetchingData' | 'formReady' | 'loginRequired' | 'error'
  >('loading');
  const [allProgramEvents, setAllProgramEvents] = useState<(Talk | SocialEvent)[]>([]);
  const [defaultLocation, setDefaultLocation] = useState('Oslo');
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (inProgress !== InteractionStatus.None || !isAuthStatusKnown) {
      setPageStatus('authenticating');
      return;
    }
    if (!isAuthenticated) {
      setPageStatus('loginRequired');
      router.push('/login?intent=program');
    } else {
      if (user?.email || activeAccount?.username) {
        setPageStatus('fetchingData');
      } else {
        console.warn("[ProgramPage] Authenticated, but user email/username missing.");
        setPageStatus('error'); 
        setFetchError("Brukerdetaljer mangler, kan ikke laste program.");
      }
    }
  }, [isAuthenticated, inProgress, router, isAuthStatusKnown, user, activeAccount]);

  useEffect(() => {
    if (pageStatus === 'fetchingData' && (user?.email || activeAccount?.username) ) {
      const userEmailForQuery = user?.email || activeAccount?.username;
      if (!userEmailForQuery) {
          console.error("[ProgramPage] Cannot fetch data, user email/username is definitively missing.");
          setFetchError("Feil: Brukeridentifikator mangler.");
          setPageStatus('error');
          return;
      }
      const fetchData = async () => {
        try {
          const [talks, socialEvents] = await Promise.all([
            client.fetch<Talk[]>(
              `*[_type == "talk"] | order(time asc) {
                _id, _type, title, slug, time, duration, location, track,
                speakers[]{ _key, name }
              }`
            ),
            client.fetch<SocialEvent[]>(
              `*[_type == "social"] | order(time asc) {
                _id, _type, title, slug, description, location, roomAddress, time
              }`
            )
          ]);
          const combinedEvents: (Talk | SocialEvent)[] = [...talks, ...socialEvents].sort((a, b) => {
            const timeA = a.time ? new Date(a.time).getTime() : 0;
            const timeB = b.time ? new Date(b.time).getTime() : 0;
            if (!timeA && !timeB) return 0; if (!timeA) return 1; if (!timeB) return -1;
            return timeA - timeB;
          });
          setAllProgramEvents(combinedEvents);
          const attendeeQuery = `*[_type == "attendee" && attendeeEmail == $email][0]{ participationLocation }`;
          const attendee = await client.fetch(attendeeQuery, { email: userEmailForQuery }); 
          if (attendee?.participationLocation) {
            setDefaultLocation(attendee.participationLocation);
          } else {
            setDefaultLocation('Oslo');
          }
          setPageStatus('formReady');
        } catch (error) {
          console.error("Error fetching program data:", error);
          setFetchError("Kunne ikke laste programdata. Prøv igjen senere.");
          setPageStatus('error');
        }
      };
      fetchData();
    } 
  }, [pageStatus, user?.email, activeAccount?.username]);

  if (!isAuthStatusKnown || pageStatus === 'loading' || pageStatus === 'authenticating') {
    return <LoadingFallback message="Verifiserer bruker..." />;
  }
  if (pageStatus === 'loginRequired') {
    return <LoadingFallback message="Omdirigerer til innlogging..." />;
  }
  if (pageStatus === 'fetchingData') {
    return <LoadingFallback message="Henter programdata..." />;
  }
  if (pageStatus === 'error') {
    return (
      <div className="text-white py-10">
        <div className="container mx-auto px-4 text-center">
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
            <p>Ingen programposter funnet.</p>
          </div>
        </div>
      );
    }
    // Content
    return (
      <ProgramFilter allProgramEvents={allProgramEvents} defaultLocation={defaultLocation} />
    );
  }

  return <LoadingFallback message="Laster..." />;
}
