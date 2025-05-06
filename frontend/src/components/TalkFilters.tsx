"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import TalkCard from './TalkCard';
import HelpCard from './HelpCard';
import { ClientTalkFiltersProps } from '@/types/props';
import Image from "next/image";

export default function ClientTalkFilters({ talks }: ClientTalkFiltersProps) {
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteTalkIds, setFavoriteTalkIds] = useState<string[]>([]);
  const [shouldRelyOnLocalStorage, setShouldRelyOnLocalStorage] = useState(false);
  
  const hideIkkeMed = true;
  const durationRef = useRef<HTMLDivElement>(null);

  const fetchFavorites = useCallback(async () => {
    let localFavorites: string[] = [];
    try {
      const rawLocalFavorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      localFavorites = Array.isArray(rawLocalFavorites) ? [...new Set(rawLocalFavorites.filter(slug => typeof slug === 'string'))] : [];
    } catch (e) {
      console.error("[TalkFilters] Error reading/parsing local favorites:", e);
      localFavorites = [];
    }

    try {
      const response = await fetch('/api/favorites');
      const data = await response.json();
      
      if (data.useLocalStorage) {
        setFavoriteTalkIds(localFavorites);
        setShouldRelyOnLocalStorage(true);
      } else if (response.ok && data.favorites) {
        if (data.favorites.length > 0) {
          let slugs = data.favorites.map((fav: {talkSlug: string}) => fav.talkSlug).filter((slug: string | null) => slug);
          slugs = [...new Set(slugs)];
          setFavoriteTalkIds(slugs);
          setShouldRelyOnLocalStorage(false);
        } else {
          if (localFavorites.length > 0) {
            console.log("[TalkFilters] Auth user with no Sanity favorites; using local favorites.");
            setFavoriteTalkIds(localFavorites);
            setShouldRelyOnLocalStorage(true);
          } else {
            setFavoriteTalkIds([]);
            setShouldRelyOnLocalStorage(false);
          }
        }
      } else {
        console.warn("[TalkFilters] API error/unexpected response for GET /api/favorites. Falling back to local.", { status: response.status, data });
        setFavoriteTalkIds(localFavorites);
        setShouldRelyOnLocalStorage(true);
      }
    } catch (apiError) {
      console.error("[TalkFilters] API fetch failed for GET /api/favorites. Falling back to local:", apiError);
      setFavoriteTalkIds(localFavorites);
      setShouldRelyOnLocalStorage(true);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'favoriteTalks') {
        console.log("[TalkFilters] localStorage 'favoriteTalks' changed by other source. Re-evaluating favorites.");
        fetchFavorites(); 
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchFavorites]);

  useEffect(() => {
    if (!shouldRelyOnLocalStorage) {
      return;
    }
    let lastKnownStringifiedFavorites = JSON.stringify(favoriteTalkIds);

    const intervalId = setInterval(() => {
        try {
            const currentLocalFavorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
            const uniqueCurrentLocalFavorites = Array.isArray(currentLocalFavorites) ? [...new Set(currentLocalFavorites.filter(slug => typeof slug === 'string'))] : [];
            const stringifiedNewFavorites = JSON.stringify(uniqueCurrentLocalFavorites);

            if (stringifiedNewFavorites !== lastKnownStringifiedFavorites) {
                setFavoriteTalkIds(uniqueCurrentLocalFavorites);
                lastKnownStringifiedFavorites = stringifiedNewFavorites;
            }
        } catch {
            // Error already logged
        }
    }, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [shouldRelyOnLocalStorage]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (durationRef.current && !durationRef.current.contains(event.target as Node)) {
        setIsDurationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const durations = [
    { label: '10 minutter', value: '10min' },
    { label: '20 minutter', value: '20min' },
    { label: '30 minutter', value: '30min' },
    { label: '45 minutter', value: '45min' },
  ];

  const filteredTalks = talks.filter((talk) => {
    const isTalkFavorited = favoriteTalkIds.includes(talk.slug.current);
    if (hideIkkeMed && talk.title && talk.title.trim().startsWith('IKKE MED:')) {
      return false;
    }
    if (selectedDuration && talk.duration !== selectedDuration) {
      return false;
    }
    if (showFavorites && !isTalkFavorited) {
      return false;
    }
    return true;
  });

  if (showFavorites && talks.length !== filteredTalks.length) {
    console.log(`[TalkFilters] Filtering by favorites. Showing ${filteredTalks.length} of ${talks.length} talks.`);
  }

  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        <div className="relative" ref={durationRef}>
          <button
            onClick={() => setIsDurationOpen(!isDurationOpen)}
            className={`px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 ${
              selectedDuration ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'
            }`}
          >
            <span>VARIGHET</span>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none"
              className={`transition-transform ${isDurationOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isDurationOpen && (
            <div className="absolute z-50 mt-2 w-48 bg-white shadow-lg left-1/2 -translate-x-1/2">
              <div className="p-4 space-y-2">
                {durations.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => {
                      setSelectedDuration(
                        selectedDuration === duration.value ? null : duration.value
                      );
                      setIsDurationOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-xs text-left transition-colors font-medium ${
                      selectedDuration === duration.value
                        ? 'bg-[#F8F5D3] text-[#2A1449]'
                        : 'hover:bg-gray-100 text-[#2A1449]'
                    }`}
                  >
                    {duration.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowFavorites(prevShowFavorites => !prevShowFavorites)}
          className={`px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 ${
            showFavorites ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'
          }`}
        >
          <span>FAVORITTER</span>
          <Image 
            src={showFavorites ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
            alt="Favoritter"
            width={14}
            height={14}
            className="w-4 h-4"
          />
        </button>
      </div>

      {filteredTalks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-300">Ingen foredrag funnet. Prøv å endre filtrene.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <HelpCard />
          {filteredTalks.map((talk) => (
            <TalkCard 
              key={talk._id} 
              talk={talk} 
              initialIsFavorite={favoriteTalkIds.includes(talk.slug.current)}
              onFavoriteToggle={() => fetchFavorites()}
            />
          ))}
        </div>
      )}
    </>
  );
}