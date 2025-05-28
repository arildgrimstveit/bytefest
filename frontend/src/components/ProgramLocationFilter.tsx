"use client";

import { useState, useRef, useEffect } from 'react';
import type { Talk, SocialEvent } from '@/types';
import ProgramTalkCard from './ProgramTalkCard';
import ProgramSocialEventCard from './ProgramSocialEventCard';
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

interface ProgramLocationFilterProps {
  allProgramEvents: (Talk | SocialEvent)[];
  defaultLocation: string;
}

const locationOptions = [
  { value: 'Bergen', title: 'Bergen' },
  { value: 'Kristiansand', title: 'Kristiansand' },
  { value: 'Oslo', title: 'Oslo' },
  { value: 'Stavanger', title: 'Stavanger' },
  { value: 'Tromsø', title: 'Tromsø' },
  { value: 'Trondheim', title: 'Trondheim' },
  { value: 'Digitalt', title: 'Digitalt' },
];

const roomLegends: Record<string, { name: string; color: string }[]> = {
  Oslo: [
    { name: "22.etg Atriet", color: "#98C649" },
    { name: "26.etg Hovedområde", color: "#FFAF35" },
    { name: "25.etg Munch", color: "#EB6565" },
    { name: "23.etg Møteplassen", color: "#84CDE3" },
    { name: "Forskjellige lokasjoner", color: "#DAD2E5" },
  ],
  Bergen: [
    { name: "Kry", color: "#98C649" },
    { name: "Hallaien", color: "#FFAF35" },
    { name: "Tidi", color: "#EB6565" },
    { name: "Kjik", color: "#84CDE3" },
    { name: "Forskjellige lokasjoner", color: "#DAD2E5" },
  ],
  Trondheim: [
    { name: "Munkholmen", color: "#98C649" },
    { name: "Lerkendal", color: "#FFAF35" },
    { name: "Nidarosdomen", color: "#EB6565" },
    { name: "Storheia", color: "#84CDE3" },
    { name: "Forskjellige lokasjoner", color: "#DAD2E5" },
  ],
  Tromsø: [
    { name: "Jiehkkevarri", color: "#98C649" },
    { name: "Nallangaisi", color: "#FFAF35" },
    { name: "Imagaisi", color: "#EB6565" },
    { name: "Gaskachokka", color: "#84CDE3" },
    { name: "Forskjellige lokasjoner", color: "#DAD2E5" },
  ],
  Kristiansand: [
    { name: "Paradisbukta", color: "#98C649" },
    { name: "Markens", color: "#FFAF35" },
    { name: "Lund", color: "#EB6565" },
    { name: "Jegersberg", color: "#84CDE3" },
    { name: "Forskjellige lokasjoner", color: "#DAD2E5" }
  ],
  Stavanger: [
    { name: "Sosial Sone", color: "#98C649" },
    { name: "Lysefjorden", color: "#FFAF35" },
    { name: "Riskafjorden", color: "#EB6565" },
    { name: "Gandsfjorden", color: "#84CDE3" },
    { name: "Forskjellige lokasjoner", color: "#DAD2E5" },
  ]
};

export default function ProgramLocationFilter({ allProgramEvents, defaultLocation }: ProgramLocationFilterProps) {
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [isTrackDropdownOpen, setIsTrackDropdownOpen] = useState(false);
  const trackDropdownRef = useRef<HTMLDivElement>(null);

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
      if (trackDropdownRef.current && !trackDropdownRef.current.contains(event.target as Node)) {
        setIsTrackDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Apply favorites filter if active, but use all talks regardless of selectedLocation for schedule population
  let eventsToDisplay = allProgramEvents;
  if (showOnlyFavorites) {
    // Favorites only apply to Talks, Social Events don't have favorites
    eventsToDisplay = allProgramEvents.filter(event => 
      (event._type === 'talk' && favs.includes((event as Talk).slug.current)) || event._type === 'social'
    );
  }

  // Define the program schedule structure
  interface ProgramSegment {
    label: string;       
    title: string;        
    type: 'talks' | 'event'; 
    endTime?: string;
    talksByTrack?: {
      '1': Talk[];
      '2': Talk[];
      '3': Talk[];
      '4': Talk[];
      'other': Talk[];
    };
    socialEventsInSlot?: SocialEvent[];
  }

  const programScheduleTemplate: Omit<ProgramSegment, 'talksByTrack' | 'socialEventsInSlot'>[] = [
    { label: "16:45", title: "Åpning", type: 'event' },
    { label: "17:00", title: "Faglig 1", type: 'talks' },
    { label: "17:45", title: "Pause", type: 'event' },
    { label: "18:00", title: "Faglig 2", type: 'talks' },
    { label: "18:45", title: "Pause", type: 'event' },
    { label: "19:00", title: "Faglig 3", type: 'talks' },
    { label: "19:30", title: "Wrap up", type: 'event' },
    { label: "19:30", title: "Sosialt", type: 'event' }, 
    { label: "20:45", title: "Sosialt", type: 'event' },
  ];

  // Enrich the base schedule template with endTime for talk segments
  const enrichedScheduleTemplate = programScheduleTemplate.map((segment, index, allSegments) => {
    if (segment.type === 'talks') {
      let calculatedEndTime: string | undefined = undefined;
      for (let j = index + 1; j < allSegments.length; j++) {
        calculatedEndTime = allSegments[j].label; // Next segment's start time is this talk block's end time
        break;
      }
      return { ...segment, endTime: calculatedEndTime || "23:59" }; // Default to end of day if no next segment
    }
    return segment;
  });

  // Prepare the dynamic schedule with talks assigned to time slots and tracks
  const scheduleWithTalks: ProgramSegment[] = enrichedScheduleTemplate.map(segment => {
    if (segment.type === 'talks' && typeof segment.endTime === 'string') {
      const talksInSlotByTrack: Required<ProgramSegment['talksByTrack']> = {
        '1': [], '2': [], '3': [], '4': [], 'other': [],
      };
      const socialEventsForSlot: SocialEvent[] = [];

      const currentSegmentEndTime = segment.endTime; 

      eventsToDisplay.forEach(event => {
        if (event.time) {
          const eventTimeDate = new Date(event.time);
          const eventHHMM = `${String(eventTimeDate.getHours()).padStart(2, '0')}:${String(eventTimeDate.getMinutes()).padStart(2, '0')}`;
          const conditionMet = eventHHMM >= segment.label && eventHHMM < currentSegmentEndTime;
          
          if (conditionMet) {
            if (event._type === 'talk') {
              const talk = event as Talk;
              const trackKey = talk.track && ['1', '2', '3', '4'].includes(talk.track) ? talk.track : 'other';
              talksInSlotByTrack[trackKey].push(talk);
            } else if (event._type === 'social') {
              socialEventsForSlot.push(event as SocialEvent);
            }
          }
        }
      });
      return { ...segment, talksByTrack: talksInSlotByTrack, socialEventsInSlot: socialEventsForSlot };
    }
    // For non-'talks' segments (like 'event'), also gather matching social events
    if (segment.type === 'event' && typeof segment.endTime === 'string') {
        const socialEventsForSlot: SocialEvent[] = [];
        const currentSegmentEndTime = segment.endTime;

        eventsToDisplay.forEach(event => {
            if (event._type === 'social' && event.time) {
                const eventTimeDate = new Date(event.time);
                const eventHHMM = `${String(eventTimeDate.getHours()).padStart(2, '0')}:${String(eventTimeDate.getMinutes()).padStart(2, '0')}`;
                if (eventHHMM >= segment.label && eventHHMM < currentSegmentEndTime) {
                    socialEventsForSlot.push(event as SocialEvent);
                }
            }
        });
        return { ...segment, socialEventsInSlot: socialEventsForSlot };
    }
    return segment; 
  });

  const trackFilterOptions = [
    { value: 'all', title: 'Alle Spor' },
    { value: '1', title: 'Spor 1' },
    { value: '2', title: 'Spor 2' },
    { value: '3', title: 'Spor 3' },
    { value: '4', title: 'Spor 4' },
  ];

  const getTrackButtonLabel = () => {
    if (selectedTracks.length === 0) {
      return 'SPOR: ALLE';
    }
    if (selectedTracks.length === 1) {
      return `SPOR: ${selectedTracks[0]}`;
    }
    return `SPOR: ${selectedTracks.length} VALGT`;
  };

  return (
    <>
      {/* Top filter buttons */}
      <div className="flex gap-4 justify-center mb-8">
        {/* Location Filter */}
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

        {/* Track Filter */}
        <div className="relative" ref={trackDropdownRef}>
          <button
            onClick={() => setIsTrackDropdownOpen(!isTrackDropdownOpen)}
            className="px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 cursor-pointer bg-[#F6EBD5]"
          >
            <span>{getTrackButtonLabel()}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition-transform ${isTrackDropdownOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {isTrackDropdownOpen && (
            <div className="absolute z-50 mt-2 w-48 bg-white shadow-lg left-1/2 -translate-x-1/2">
              <div className="p-4 space-y-2">
                {trackFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      if (option.value === 'all') {
                        setSelectedTracks([]);
                      } else {
                        setSelectedTracks(prevSelectedTracks => 
                          prevSelectedTracks.includes(option.value)
                            ? prevSelectedTracks.filter(track => track !== option.value)
                            : [...prevSelectedTracks, option.value]
                        );
                      }
                    }}
                    className={`block w-full px-3 py-2 text-xs text-left transition-colors font-medium cursor-pointer ${
                      (option.value === 'all' && selectedTracks.length === 0) || selectedTracks.includes(option.value)
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

        {/* Favorites Filter */}
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
      </div>

      {/* Legend for track colors - conditionally rendered */}
      {selectedLocation !== 'Digitalt' && (
        <div className="flex gap-8 justify-center mb-8 flex-wrap">
          {(roomLegends[selectedLocation] || []).map((room) => (
            <div key={room.name} className="flex items-center gap-2">
              <div className="w-6 h-6" style={{ backgroundColor: room.color }} />
              <span className="text-white text-lg">{room.name}</span>
            </div>
          ))}
          {/* Fallback for locations not in roomLegends or if no rooms are defined (and not Digitalt) */}
          {(!roomLegends[selectedLocation] || roomLegends[selectedLocation].length === 0) && (
              <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#DAD2E5]" />
                  <span className="text-white font-bold">Forskjellige lokasjoner</span>
              </div>
          )}
        </div>
      )}

      {/* Dynamically generated schedule based on programScheduleTemplate */}
      <div className="mb-8 text-white text-xl space-y-5">
        {scheduleWithTalks.map((segment, segmentIndex) => (
          <div key={`${segment.label}-${segment.title}-${segmentIndex}`}>
            <div>
              <span className="font-bold">{segment.label}</span> {segment.title}
            </div>

            {segment.type === 'talks' && segment.talksByTrack && (
              <>
                <br />
                <div className="flex flex-col space-y-4 mb-8"> {/* Container for rows of cards */}
                  {(() => {
                    const tracksToConsiderForMaxRows = segment.talksByTrack || { '1': [], '2': [], '3': [], '4': []};
                    const numRowsToRender = [1, 2, 3, 4].reduce((max, trackNum) => {
                        const trackKey = String(trackNum) as '1'|'2'|'3'|'4';
                        return Math.max(max, (tracksToConsiderForMaxRows[trackKey] || []).length);
                    }, 0);

                    if (numRowsToRender === 0) return null; // No talks in tracks 1-4 for this segment

                    return Array.from({ length: numRowsToRender }).map((_, rowIndex) => (
                      <div key={`card-row-${segment.label}-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(trackNumber => {
                          const currentTrackStr = String(trackNumber) as '1'|'2'|'3'|'4';
                          const talk = ((segment.talksByTrack ? segment.talksByTrack[currentTrackStr] : []) || [])[rowIndex];

                          if (talk && (selectedTracks.length === 0 || selectedTracks.includes(currentTrackStr))) {
                            return (
                              <ProgramTalkCard
                                key={talk.slug.current}
                                talk={talk}
                                track={trackNumber as 1 | 2 | 3 | 4}
                                isFavorite={favs.includes(talk.slug.current)}
                                onToggleFavorite={toggleFavorite}
                                isLoadingGlobalFavs={isLoadingFavs}
                                isStoreReady={isStoreInitialized}
                                globalFavsError={errorFavs}
                                viewingLocation={selectedLocation}
                              />
                            );
                          } else {
                            // Render placeholder if no talk OR if a specific track is selected and this isn't it
                            return <div key={`placeholder-${currentTrackStr}-${segment.label}-${rowIndex}`} className="w-full h-full min-h-[1rem]"></div>;
                          }
                        })}
                      </div>
                    ));
                  })()}
                </div>
                {/* Render Social Events for this 'talks' segment */}
                {segment.socialEventsInSlot && segment.socialEventsInSlot.length > 0 && (
                  <div className="mt-6 mb-8 space-y-4">
                    <h3 className="text-lg text-white iceland regular">Andre arrangementer i dette tidsrommet:</h3>
                    {segment.socialEventsInSlot.map(socialEvent => (
                      <ProgramSocialEventCard key={socialEvent._id} event={socialEvent} />
                    ))}
                  </div>
                )}
                {/* 'Other' track talks for this time slot */}
                {segment.talksByTrack.other.length > 0 && (
                  <>
                    <div className="mt-4"><span className="font-bold">Andre foredrag</span> (ikke tildelt spor for {segment.label})</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-3 mb-5">
                      {segment.talksByTrack.other.map((talk) => (
                        <ProgramTalkCard
                          key={talk._id}
                          talk={talk}
                          track={1} 
                          isFavorite={favs.includes(talk.slug.current)}
                          onToggleFavorite={toggleFavorite}
                          isLoadingGlobalFavs={isLoadingFavs}
                          isStoreReady={isStoreInitialized}
                          globalFavsError={errorFavs}
                          viewingLocation={selectedLocation}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            {/* Render Social Events for 'event' type segments */}
            {segment.type === 'event' && segment.socialEventsInSlot && segment.socialEventsInSlot.length > 0 && (
              <div className="mt-3 mb-5 space-y-4">
                 {segment.socialEventsInSlot.map(socialEvent => (
                    <ProgramSocialEventCard key={socialEvent._id} event={socialEvent} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
} 