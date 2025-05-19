"use client";

import { useState, useRef, useEffect } from 'react';
import type { Talk } from '@/types/talk';
import ProgramTalkCard from './ProgramTalkCard';
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

interface ProgramLocationFilterProps {
  talks: Talk[];
  defaultLocation: string;
}

const locationOptions = [
  { value: 'Bergen', title: 'Bergen' },
  { value: 'Drammen', title: 'Drammen' },
  { value: 'Fredrikstad', title: 'Fredrikstad' },
  { value: 'Hamar', title: 'Hamar' },
  { value: 'Kristiansand', title: 'Kristiansand' },
  { value: 'København', title: 'København' },
  { value: 'Oslo', title: 'Oslo' },
  { value: 'Stavanger', title: 'Stavanger' },
  { value: 'Tromsø', title: 'Tromsø' },
  { value: 'Trondheim', title: 'Trondheim' },
  { value: 'Digitalt', title: 'Digitalt' },
];

export default function ProgramLocationFilter({ talks, defaultLocation }: ProgramLocationFilterProps) {
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    favs,
    toggleFavorite,
    isLoadingFavs,
    isStoreInitialized,
    errorFavs
  } = useFavorites();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  let filteredTalks = talks.filter(talk => talk.location === selectedLocation);
  if (showOnlyFavorites) {
    filteredTalks = filteredTalks.filter(talk => favs.includes(talk.slug.current));
  }

  // Placeholder: split talks into 4 groups for schedule rows
  const talksPerRow = 4;
  const talkRows = [];
  for (let i = 0; i < 4; i++) {
    talkRows.push(filteredTalks.slice(i * talksPerRow, (i + 1) * talksPerRow));
  }

  return (
    <>
      {/* Top filter buttons */}
      <div className="flex gap-4 justify-center mb-8">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 cursor-pointer bg-[#F6EBD5]"
          >
            <span>LOKASJON: {selectedLocation.toUpperCase()}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 mt-2 w-48 bg-white shadow-lg left-1/2 -translate-x-1/2">
              <div className="p-4 space-y-2">
                {locationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedLocation(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-xs text-left transition-colors font-medium cursor-pointer ${
                      selectedLocation === option.value
                        ? 'bg-[#F8F5D3] text-[#2A1449]'
                        : 'hover:bg-gray-100 text-[#2A1449]'
                    }`}
                  >
                    {option.title.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowOnlyFavorites(prev => !prev)}
          className={`px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 cursor-pointer ${showOnlyFavorites ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'}`}
        >
          <span>FAVORITTER</span>
          <Image
            src={showOnlyFavorites ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
            alt="Favoritter"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </button>
        {/* Placeholder for track filter button */}
        <button
          className="px-6 py-2 text-[#2A1449] transition-opacity flex items-center gap-2 cursor-not-allowed bg-[#F6EBD5] opacity-60"
          disabled
        >
          <span>SPOR</span>
        </button>
      </div>

      {/* Legend for track colors */}
      <div className="flex gap-8 justify-start mb-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#98C649]" />
          <span className="text-white font-bold text-sm">SOSIAL SONE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#FFAF35]" />
          <span className="text-white font-bold text-sm">LYSEFJORDEN</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#EB6565]" />
          <span className="text-white font-bold text-sm">RISKAFJORDEN</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#84CDE3]" />
          <span className="text-white font-bold text-sm">HAFRSFJORD</span>
        </div>
      </div>

      {/* Schedule text block with placeholder rows of talks */}
      <div className="mb-8 text-white text-xl space-y-5">
        <div><span className="font-bold">16:00</span> Velkommen/V kjell Rusti</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
          {talkRows[0]?.map((talk, index) => (
            <ProgramTalkCard
              key={talk._id}
              talk={talk}
              track={((index % 4) + 1) as 1 | 2 | 3 | 4}
              isFavorite={favs.includes(talk.slug.current)}
              onToggleFavorite={toggleFavorite}
              isLoadingGlobalFavs={isLoadingFavs}
              isStoreReady={isStoreInitialized}
              globalFavsError={errorFavs}
            />
          ))}
        </div>
        <div><span className="font-bold">16:45</span> Pause</div>
        <div><span className="font-bold">17:00</span> Mat</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
          {talkRows[1]?.map((talk, index) => (
            <ProgramTalkCard
              key={talk._id}
              talk={talk}
              track={((index % 4) + 1) as 1 | 2 | 3 | 4}
              isFavorite={favs.includes(talk.slug.current)}
              onToggleFavorite={toggleFavorite}
              isLoadingGlobalFavs={isLoadingFavs}
              isStoreReady={isStoreInitialized}
              globalFavsError={errorFavs}
            />
          ))}
        </div>
        <div><span className="font-bold">17:45</span> Pause</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
          {talkRows[2]?.map((talk, index) => (
            <ProgramTalkCard
              key={talk._id}
              talk={talk}
              track={((index % 4) + 1) as 1 | 2 | 3 | 4}
              isFavorite={favs.includes(talk.slug.current)}
              onToggleFavorite={toggleFavorite}
              isLoadingGlobalFavs={isLoadingFavs}
              isStoreReady={isStoreInitialized}
              globalFavsError={errorFavs}
            />
          ))}
        </div>
        <div><span className="font-bold">18:45</span> Pause</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-5">
          {talkRows[3]?.map((talk, index) => (
            <ProgramTalkCard
              key={talk._id}
              talk={talk}
              track={((index % 4) + 1) as 1 | 2 | 3 | 4}
              isFavorite={favs.includes(talk.slug.current)}
              onToggleFavorite={toggleFavorite}
              isLoadingGlobalFavs={isLoadingFavs}
              isStoreReady={isStoreInitialized}
              globalFavsError={errorFavs}
            />
          ))}
        </div>
      </div>
    </>
  );
} 