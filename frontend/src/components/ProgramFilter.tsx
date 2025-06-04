"use client";

import { useState, useRef, useEffect } from 'react';
import type { Talk, SocialEvent } from '@/types';
import ProgramTalkCard from './ProgramTalkCard';
import ProgramSocialEventCard from './ProgramSocialEventCard';
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

interface ProgramFilterProps {
  allProgramEvents: (Talk | SocialEvent)[];
  defaultLocation: string;
}

const locationOptions = [
  { value: 'Bergen', title: 'Bergen' },
  { value: 'Kristiansand', title: 'Kristiansand' },
  { value: 'Oslo', title: 'Oslo' },
  { value: 'Stavanger', title: 'Stavanger' },
  { value: 'Tromso', title: 'Tromsø' },
  { value: 'Trondheim', title: 'Trondheim' },
  { value: 'Digitalt', title: 'Digitalt' },
];

const roomLegends: Record<string, { name: string; color: string }[]> = {
  Oslo: [
    { name: "22.etg Atriet", color: "#98C649" },
    { name: "23.etg Møteplassen", color: "#FFAF35" },
    { name: "25.etg Munch", color: "#EB6565" },
    { name: "26.etg Hovedområde", color: "#84CDE3" },
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
  Tromso: [
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
    { name: "Lysefjorden", color: "#98C649" },
    { name: "Sosial Sone", color: "#FFAF35" },
    { name: "Riskafjorden", color: "#EB6565" },
    { name: "Gandsfjorden", color: "#84CDE3" },
    { name: "Forskjellige lokasjoner", color: "#DAD2E5" },
  ]
};

export default function ProgramFilter({ allProgramEvents, defaultLocation }: ProgramFilterProps) {
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
  
  let eventsToProcess = allProgramEvents;
  if (showOnlyFavorites) {
    eventsToProcess = allProgramEvents.filter(event => {
      if (event._type === 'talk') {
        return favs.includes((event as Talk).slug.current);
      }
      return true; // Keep social events if favorites filter is on, as they don't have favorites
    });
  }

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
      other: Talk[];
    };
    socialEventsInSlot?: SocialEvent[];
  }

  const programScheduleTemplate: Omit<ProgramSegment, 'talksByTrack' | 'socialEventsInSlot'>[] = [
    { label: "16:00", title: "Mat", type: 'event' },
    { label: "16:45", title: "Åpning", type: 'event' },
    { label: "17:00", title: "Faglig 1", type: 'talks' },
    { label: "17:45", title: "Pause", type: 'event' },
    { label: "17:55", title: "Faglig 2", type: 'talks' },
    { label: "18:40", title: "Pause", type: 'event' },
    { label: "18:50", title: "Faglig 3", type: 'talks' },
    { label: "19:30", title: "Felles avslutning", type: 'event' },
    { label: "20:00", title: "Sosialt", type: 'event' },
  ];

  const enrichedScheduleTemplate = programScheduleTemplate.map((segment, index, allSegments) => {
    let calculatedEndTime: string | undefined = undefined;
    for (let j = index + 1; j < allSegments.length; j++) {
        if (allSegments[j].label > segment.label) {
            calculatedEndTime = allSegments[j].label;
            break;
        }
    }
    if (!calculatedEndTime) {
        if (index === allSegments.length -1 ){
            calculatedEndTime = "23:59";
        } else {
            calculatedEndTime = new Date(new Date(`2000/01/01 ${segment.label}`).getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
    return { ...segment, endTime: calculatedEndTime };
  });

  const scheduleWithEvents: ProgramSegment[] = enrichedScheduleTemplate.map(segment => {
    const talksInSlotByTrack: Required<ProgramSegment['talksByTrack']> = {
      '1': [], '2': [], '3': [], '4': [], other: [],
    };
    const socialEventsForSlot: SocialEvent[] = [];

    if (typeof segment.endTime === 'string') {
        eventsToProcess.forEach(event => {
            if (event.time && event.slug?.current) {
                const eventTimeDate = new Date(event.time);
                const eventHHMM = `${String(eventTimeDate.getHours()).padStart(2, '0')}:${String(eventTimeDate.getMinutes()).padStart(2, '0')}`;
                
                if (eventHHMM >= segment.label && eventHHMM < segment.endTime) {
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
    }
    if (segment.type === 'talks') {
        return { ...segment, talksByTrack: talksInSlotByTrack, socialEventsInSlot: socialEventsForSlot };
    }
    return { ...segment, socialEventsInSlot: socialEventsForSlot, talksByTrack: talksInSlotByTrack }; 
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
      {/* Top filter buttons - these will render immediately */}
      <div className="flex gap-4 justify-center mb-8 flex-wrap">
        {/* Location Filter */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`px-4 sm:px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 cursor-pointer ${selectedLocation !== defaultLocation || defaultLocation !== 'Oslo' ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'}`}
          >
            <span className="hidden sm:inline">LOKASJON: {(locationOptions.find(opt => opt.value === selectedLocation)?.title || selectedLocation).toUpperCase()}</span>
            <span className="sm:hidden">LOKASJON</span>
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
            className={`px-4 sm:px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 cursor-pointer ${selectedTracks.length > 0 ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'}`}
          >
            <span className="hidden sm:inline">{getTrackButtonLabel()}</span>
            <span className="sm:hidden">SPOR</span>
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
          className={`px-4 sm:px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 cursor-pointer ${showOnlyFavorites ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'}`}
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
          {(!roomLegends[selectedLocation] || roomLegends[selectedLocation].length === 0) && (
              <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#DAD2E5]" />
                  <span className="text-white font-bold">Forskjellige lokasjoner</span>
              </div>
          )}
        </div>
      )}

      {/* Dynamically generated schedule */}
      <div className="mb-8 text-white text-xl space-y-5">
        {scheduleWithEvents.map((segment, segmentIndex) => {
          const isFagligSegment = segment.type === 'talks' && (segment.title === "Faglig 1" || segment.title === "Faglig 2" || segment.title === "Faglig 3");

          const hasTalksInNumberedTracks = segment.type === 'talks' && segment.talksByTrack && 
                                       Object.entries(segment.talksByTrack)
                                       .filter(([key]) => key !== 'other')
                                       .some(([, trackTalks]) => trackTalks.length > 0);
          
          const hasTalksInOtherTrack = segment.type === 'talks' && segment.talksByTrack && segment.talksByTrack.other.length > 0;
          
          let socialEventsInSegment: SocialEvent[] = [];
          if (selectedLocation.toLowerCase() !== 'digitalt') {
            socialEventsInSegment = segment.socialEventsInSlot?.filter(socialEvent => {
              if (!socialEvent.location) return false;
              const eventLocationLower = socialEvent.location.toLowerCase();
              const currentSelectedLocationLower = selectedLocation.toLowerCase(); 
              if (eventLocationLower === 'oslostream') {
                return true; // Show 'oslostream' events for all *physical* locations
              }
              // For other events, match the physical location
              return eventLocationLower === currentSelectedLocationLower;
            }) || [];
          }
          const hasVisibleSocialEvents = socialEventsInSegment.length > 0;

          if (segment.type === 'event' || hasTalksInNumberedTracks || hasTalksInOtherTrack || hasVisibleSocialEvents) {
            return (
              <div key={`${segment.label}-${segment.title}-${segmentIndex}`}>
                <div>
                  <span className="font-bold">{segment.label}</span> {segment.title}
                </div>

                {(hasTalksInNumberedTracks || hasTalksInOtherTrack) && segment.type === 'talks' && segment.talksByTrack && (
                  <>
                    {hasTalksInNumberedTracks && (
                      <>
                      <br />
                      <div className="flex flex-col space-y-4 mb-8">
                        {(() => {
                          const tracksToConsiderForMaxRows = segment.talksByTrack!;
                          const numRowsToRender = [1, 2, 3, 4].reduce((max, trackNum) => {
                              const trackKey = String(trackNum) as '1'|'2'|'3'|'4';
                              return Math.max(max, (tracksToConsiderForMaxRows[trackKey] || []).length);
                          }, 0);

                          if (numRowsToRender === 0) return null;

                          return Array.from({ length: numRowsToRender }).map((_, rowIndex) => (
                            <div key={`card-row-${segment.label}-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {[1, 2, 3, 4].map(trackNumber => {
                                const currentTrackStr = String(trackNumber) as '1'|'2'|'3'|'4';
                                const talk = (tracksToConsiderForMaxRows[currentTrackStr] || [])[rowIndex];
                                
                                let roomNameToPass: string | undefined = undefined;
                                if (isFagligSegment && rowIndex === 0 && selectedLocation !== 'Digitalt' && roomLegends[selectedLocation]) {
                                  const legend = roomLegends[selectedLocation];
                                  if (legend && legend[trackNumber - 1]) {
                                    roomNameToPass = legend[trackNumber - 1].name;
                                  }
                                }

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
                                      roomName={roomNameToPass}
                                    />
                                  );
                                }
                                return <div key={`placeholder-${currentTrackStr}-${segment.label}-${rowIndex}`} className="w-full h-full min-h-[1rem]"></div>;
                              })}
                            </div>
                          ));
                        })()}
                      </div>
                      </>
                    )}
                    {hasTalksInOtherTrack && (
                        <>
                            <div className="mt-4 mb-2"><span className="font-bold">Andre foredrag (ikke tildelt spor)</span></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                                {segment.talksByTrack?.other.filter(talk => {
                                    if (selectedLocation === 'Digitalt') return talk.location?.toLowerCase() === 'digitalt';
                                    return talk.location?.toLowerCase() === selectedLocation.toLowerCase();
                                }).map((talk) => (
                                    (selectedTracks.length === 0 || selectedTracks.includes('other') || selectedTracks.includes(talk.track || 'other')) && (
                                        <ProgramTalkCard
                                            key={talk.slug.current}
                                            talk={talk}
                                            track={(parseInt(talk.track || '1') as 1|2|3|4) || 1}
                                            isFavorite={favs.includes(talk.slug.current)}
                                            onToggleFavorite={toggleFavorite}
                                            isLoadingGlobalFavs={isLoadingFavs}
                                            isStoreReady={isStoreInitialized}
                                            globalFavsError={errorFavs}
                                            viewingLocation={selectedLocation} 
                                        />
                                    )
                                ))}
                            </div>
                        </>
                    )}
                  </>
                )}

                {hasVisibleSocialEvents && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-8">
                        {socialEventsInSegment.map(socialEvent => (
                            <ProgramSocialEventCard key={socialEvent._id} event={socialEvent} />
                        ))}
                    </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
} 