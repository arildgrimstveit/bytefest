"use client";

import { useState, useEffect, useRef } from 'react';
import TalkCard from './TalkCard';
import { ClientTalkFiltersProps } from '@/types/props';

export default function ClientTalkFilters({ talks, availableTags }: ClientTalkFiltersProps) {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const tagsRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setIsTagsOpen(false);
      }
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
    // Filter by tags
    if (selectedTags.length > 0 && !talk.tags?.some(tag => selectedTags.includes(tag))) {
      return false;
    }

    // Filter by duration
    if (selectedDuration && talk.duration !== selectedDuration) {
      return false;
    }

    // Filter by favorites
    if (showFavorites) {
      const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      if (!favorites.includes(talk._id)) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <div className="flex justify-center gap-4 mb-12">
        {/* Tema button */}
        <div className="relative" ref={tagsRef}>
          <button
            onClick={() => {
              setIsTagsOpen(!isTagsOpen);
              setIsDurationOpen(false);
            }}
            className={`px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 ${
              selectedTags.length > 0 ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'
            }`}
          >
            <span>TEMA {selectedTags.length > 0 && `(${selectedTags.length})`}</span>
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              className={`transition-transform ${isTagsOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isTagsOpen && (
            <div className="absolute z-50 mt-2 w-[500px] bg-white shadow-lg left-1/2 -translate-x-1/2">
              <div className="p-4 grid grid-cols-4 gap-3">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(
                        selectedTags.includes(tag)
                          ? selectedTags.filter(t => t !== tag)
                          : [...selectedTags, tag]
                      );
                    }}
                    className={`px-3 py-2 text-xs text-left transition-colors truncate font-medium ${
                      selectedTags.includes(tag)
                        ? 'bg-[#F8F5D3] text-[#2A1449]'
                        : 'hover:bg-gray-100 text-[#2A1449]'
                    }`}
                    title={tag}
                  >
                    {tag.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Varighet button */}
        <div className="relative" ref={durationRef}>
          <button
            onClick={() => {
              setIsDurationOpen(!isDurationOpen);
              setIsTagsOpen(false);
            }}
            className={`px-6 py-2 text-[#2A1449] transition-opacity hover:opacity-80 flex items-center gap-2 ${
              selectedDuration ? 'bg-[#F8F5D3]' : 'bg-[#F6EBD5]'
            }`}
          >
            <span>VARIGHET {selectedDuration && '(1)'}</span>
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
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill={showFavorites ? '#FF0000' : 'none'} 
            stroke={showFavorites ? '#FF0000' : 'currentColor'} 
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Results */}
      {filteredTalks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-300">Ingen foredrag funnet. Prøv å endre filtrene.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredTalks.map((talk) => (
            <TalkCard key={talk._id} talk={talk} />
          ))}
        </div>
      )}
    </>
  );
}