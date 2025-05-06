"use client";

import { useState, useEffect, useRef } from 'react';
import TalkCard from './TalkCard';
import HelpCard from './HelpCard';
import { ClientTalkFiltersProps } from '@/types/props';
import Image from "next/image";

export default function ClientTalkFilters({ talks }: ClientTalkFiltersProps) {
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteTalkIds, setFavoriteTalkIds] = useState<string[]>([]);
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  
  // Hide "IKKE MED:" talks by default - set to false to show them
  const hideIkkeMed = true;

  const durationRef = useRef<HTMLDivElement>(null);

  // Function to fetch favorites - declared outside useEffect so it can be reused
  const fetchFavorites = async () => {
    try {
      // Try to get favorites from API first
      const response = await fetch('/api/favorites');
      const data = await response.json();
      
      if (data.useLocalStorage) {
        // API wants us to use localStorage
        setUseLocalStorage(true);
        const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
        setFavoriteTalkIds(favorites);
      } else if (response.ok && data.favorites) {
        // Use API response - extract talk slugs
        const slugs = data.favorites.map((fav: {talkSlug: string}) => fav.talkSlug);
        setFavoriteTalkIds(slugs);
        setUseLocalStorage(false);
      }
    } catch {
      // Fallback to localStorage if API fails
      setUseLocalStorage(true);
      const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      setFavoriteTalkIds(favorites);
    }
  };

  // Set up an event listener to refresh favorites when localStorage changes
  useEffect(() => {
    // Fetch on initial load
    fetchFavorites();
    
    // Set up a storage event listener to refresh favorites when localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'favoriteTalks') {
        const favorites = e.newValue ? JSON.parse(e.newValue) : [];
        setFavoriteTalkIds(favorites);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case local component state changes localStorage
    const intervalId = setInterval(() => {
      if (useLocalStorage) {
        const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
        setFavoriteTalkIds(favorites);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, [useLocalStorage]);

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

  // Filter talks based on current filter state
  const filteredTalks = talks.filter(talk => {
    // Filter out "IKKE MED:" titles if the filter is active
    if (hideIkkeMed && talk.title && talk.title.trim().startsWith('IKKE MED:')) {
      return false;
    }

    // Filter by duration
    if (selectedDuration && talk.duration !== selectedDuration) {
      return false;
    }

    // Filter by favorites
    if (showFavorites && !favoriteTalkIds.includes(talk.slug.current)) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {/* Varighet button */}
        <div className="relative" ref={durationRef}>
          <button
            onClick={() => {
              setIsDurationOpen(!isDurationOpen);
            }}
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

        {/* Favoritter button */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
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

      {/* Results */}
      {filteredTalks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-300">Ingen foredrag funnet. Prøv å endre filtrene.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Help Card - Always first */}
          <HelpCard />
          
          {/* Talk Cards */}
          {filteredTalks.map((talk) => (
            <TalkCard 
              key={talk._id} 
              talk={talk} 
              onFavoriteToggle={() => {
                // Refresh favorites list after toggling, regardless of storage method
                fetchFavorites();
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}