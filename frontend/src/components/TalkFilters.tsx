"use client";

import { useState, useEffect, useRef } from 'react';
import TalkCard from './TalkCard';
import HelpCard from './HelpCard';
import { ClientTalkFiltersProps } from '@/types/props';
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";

export default function ClientTalkFilters({ talks }: ClientTalkFiltersProps) {
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const hideIkkeMed = true;
  const durationRef = useRef<HTMLDivElement>(null);
  const {
    favs,
    toggleFavorite,
    isLoadingFavs,
    isStoreInitialized,
    errorFavs
  } = useFavorites();

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
    if (hideIkkeMed && talk.title && talk.title.trim().startsWith('IKKE MED:')) {
      return false;
    }
    if (selectedDuration && talk.duration !== selectedDuration) {
      return false;
    }
    if (showOnlyFavorites && !favs.includes(talk.slug.current)) {
      return false;
    }
    return true;
  });

  if (!isStoreInitialized || isLoadingFavs) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-300">Laster foredrag...</p>
      </div>
    );
  }

  if (errorFavs) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400">Kunne ikke laste favoritter: {errorFavs}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        <div className="relative" ref={durationRef}>
          <button
            onClick={() => setIsDurationOpen(!isDurationOpen)}
            className={`px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 cursor-pointer ${selectedDuration ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'
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
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                    className={`block w-full px-3 py-2 text-xs text-left transition-colors font-medium cursor-pointer ${selectedDuration === duration.value
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
          onClick={() => setShowOnlyFavorites(prev => !prev)}
          className={`px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 cursor-pointer ${showOnlyFavorites ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'
            }`}
        >
          <span>FAVORITTER</span>
          <Image
            src={showOnlyFavorites ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
            alt="Favoritter"
            width={14}
            height={14}
            className="w-4 h-4"
          />
        </button>
      </div>

      {(!isStoreInitialized || isLoadingFavs) && (
        <div className="text-center py-16"><p className="text-gray-300">Laster favoritter og foredrag...</p></div>
      )}
      {isStoreInitialized && !isLoadingFavs && errorFavs && (
        <div className="text-center py-16"><p className="text-red-400">Kunne ikke laste favoritter: {errorFavs}</p></div>
      )}
      {isStoreInitialized && !isLoadingFavs && filteredTalks.length === 0 && (showOnlyFavorites || selectedDuration) && (
        <div className="text-center py-16"><p className="text-gray-300">Ingen foredrag funnet som passer filtrene dine.</p></div>
      )}
      {isStoreInitialized && !isLoadingFavs && filteredTalks.length === 0 && !showOnlyFavorites && !selectedDuration && (
        <div className="text-center py-16"><p className="text-gray-300">Ingen foredrag tilgjengelig for øyeblikket.</p></div>
      )}
      {isStoreInitialized && !isLoadingFavs && filteredTalks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <HelpCard />
          {filteredTalks.map((talk) => (
            <TalkCard
              key={talk._id}
              talk={talk}
              isFavorite={favs.includes(talk.slug.current)}
              onToggleFavorite={toggleFavorite}
              isLoadingGlobalFavs={isLoadingFavs}
              isStoreReady={isStoreInitialized}
              globalFavsError={errorFavs}
            />
          ))}
        </div>
      )}
    </>
  );
}