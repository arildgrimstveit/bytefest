"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { FC } from "react";
import { TalkCardProps } from '@/types/props';

const TalkCard: FC<TalkCardProps> = ({ talk, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  useEffect(() => {
    async function checkFavoriteStatus() {
      setIsLoading(true);
      try {
        // Try API first using slug
        const response = await fetch(`/api/favorites?talkSlug=${talk.slug.current}`);
        const data = await response.json();
        
        if (data.useLocalStorage) {
          // Use localStorage as directed by the API
          setUseLocalStorage(true);
          const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
          setIsFavorite(favorites.includes(talk.slug.current));
        } else if (response.ok) {
          // Use API response
          setIsFavorite(data.isFavorite);
        }
      } catch {
        // Fallback to localStorage if API fails
        setUseLocalStorage(true);
        const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
        setIsFavorite(favorites.includes(talk.slug.current));
      } finally {
        setIsLoading(false);
      }
    }
    
    checkFavoriteStatus();
  }, [talk.slug]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    setIsLoading(true);
    
    if (useLocalStorage) {
      // Handle directly in localStorage
      const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = favorites.filter((slug: string) => slug !== talk.slug.current);
      } else {
        newFavorites = [...favorites, talk.slug.current];
      }
      
      localStorage.setItem('favoriteTalks', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      if (onFavoriteToggle) onFavoriteToggle();
      setIsLoading(false);
      return;
    }
    
    try {
      // Try API 
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          talkSlug: talk.slug.current,
          favorite: !isFavorite,
        }),
      });
      
      const data = await response.json();
      
      if (data.useLocalStorage) {
        // API wants us to use localStorage
        setUseLocalStorage(true);
        const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
        let newFavorites;
        
        if (isFavorite) {
          newFavorites = favorites.filter((slug: string) => slug !== talk.slug.current);
        } else {
          newFavorites = [...favorites, talk.slug.current];
        }
        
        localStorage.setItem('favoriteTalks', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
        if (onFavoriteToggle) onFavoriteToggle();
      } else if (response.ok) {
        // API operation successful
        setIsFavorite(!isFavorite);
        if (onFavoriteToggle) onFavoriteToggle();
      }
    } catch {
      // API failed, fallback to localStorage
      setUseLocalStorage(true);
      const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = favorites.filter((slug: string) => slug !== talk.slug.current);
      } else {
        newFavorites = [...favorites, talk.slug.current];
      }
      
      localStorage.setItem('favoriteTalks', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      if (onFavoriteToggle) onFavoriteToggle();
    } finally {
      setIsLoading(false);
    }
  };

  // Get speaker images if available, otherwise use the fish
  const speakerImages = talk.speakers?.filter(s => s.picture?.asset?.url) || [];
  const fallbackImageUrl = '/images/LitenFisk.svg';

  return (
    <Link href={`/talks/${talk.slug?.current}`} className="block group h-full pt-2 pl-2">
      {/* Main card with orange backdrop effect */}
      <div className="relative h-full">
        {/* Orange backdrop */}
        <div className="absolute bg-[#ffaf35] top-0 left-0 w-full h-full -z-10"></div>
        
        {/* Main card container */}
        <div className="relative h-full flex flex-col bg-[#2A1449] -translate-y-1 -translate-x-1 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
          
          {/* Image Container - Center focus */}
          <div className="flex-grow relative min-h-[200px] bg-[#2A1449] overflow-hidden">
            {speakerImages.length > 0 ? (
              <div className="w-full h-full relative">
                <Image
                  src={speakerImages[0].picture?.asset?.url || fallbackImageUrl}
                  alt=""
                  fill
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={fallbackImageUrl}
                  alt=""
                  width={90}
                  height={90}
                  className="object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            )}
          </div>

          {/* Content Area - Auto height based on content */}
          <div className="bg-[#F6EBD5] w-full">
            <div className="p-5 relative">
              <h3 className="text-xl sm:text-2xl iceland text-[#2A1449] leading-tight">
                {talk.title}
              </h3>
              
              <div className="mt-2">
                {talk.speakers && talk.speakers.length > 0 ? (
                  talk.speakers.map((speaker, index) => (
                    <p key={speaker._key || index} className="text-lg iceland text-[#2A1449]">
                      {speaker.name || 'Ukjent foredragsholder'}
                    </p>
                  ))
                ) : (
                  <p className="text-sm iceland text-[#2A1449]">
                    Ukjent foredragsholder
                  </p>
                )}
              </div>
              
              {/* Star button positioned at bottom right */}
              <button
                onClick={toggleFavorite}
                className="absolute bottom-5 right-5 transition-transform active:scale-95 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-full"></div>
                ) : (
                  <Image 
                    src={isFavorite ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
                    alt={isFavorite ? 'Favoritt' : 'Legg til som favoritt'}
                    width={24}
                    height={24}
                    className="w-7 h-7"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TalkCard;
