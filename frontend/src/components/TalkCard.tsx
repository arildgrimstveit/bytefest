"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, FC } from "react";
import type { TalkCardProps } from '@/types/props';

const TalkCard: FC<TalkCardProps> = ({ talk, onFavoriteToggle, initialIsFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite || false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldCardUseLocalStorageForPost, setShouldCardUseLocalStorageForPost] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite || false);
    setIsLoading(false);
  }, [initialIsFavorite]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newIsFavorite = !isFavorite;

    if (shouldCardUseLocalStorageForPost) {
      const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      let newFavoritesArray;
      if (newIsFavorite) {
        newFavoritesArray = [...new Set([...favorites, talk.slug.current])];
      } else {
        newFavoritesArray = favorites.filter((slug: string) => slug !== talk.slug.current);
      }
      localStorage.setItem('favoriteTalks', JSON.stringify(newFavoritesArray));
      setIsFavorite(newIsFavorite);
      if (onFavoriteToggle) onFavoriteToggle();
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talkSlug: talk.slug.current, favorite: newIsFavorite }),
      });
      const data = await response.json();
      
      if (data.useLocalStorage) {
        setShouldCardUseLocalStorageForPost(true);
        const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
        let newFavoritesArray;
        if (newIsFavorite) {
          newFavoritesArray = [...new Set([...favorites, talk.slug.current])];
        } else {
          newFavoritesArray = favorites.filter((slug: string) => slug !== talk.slug.current);
        }
        localStorage.setItem('favoriteTalks', JSON.stringify(newFavoritesArray));
        setIsFavorite(newIsFavorite);
      } else if (response.ok) {
        setIsFavorite(newIsFavorite);
        setShouldCardUseLocalStorageForPost(false);
      } else {
        console.warn('TalkCard: POST /api/favorites failed, falling back to localStorage for this action.');
        setShouldCardUseLocalStorageForPost(true);
        const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
        let newFavoritesArray;
        if (newIsFavorite) {
          newFavoritesArray = [...new Set([...favorites, talk.slug.current])];
        } else {
          newFavoritesArray = favorites.filter((slug: string) => slug !== talk.slug.current);
        }
        localStorage.setItem('favoriteTalks', JSON.stringify(newFavoritesArray));
        setIsFavorite(newIsFavorite);
      }
      if (onFavoriteToggle) onFavoriteToggle();
    } catch (error) {
      console.error('TalkCard: Error toggling favorite:', error, 'Falling back to localStorage.');
      setShouldCardUseLocalStorageForPost(true);
      const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      let newFavoritesArray;
      if (newIsFavorite) {
        newFavoritesArray = [...new Set([...favorites, talk.slug.current])];
      } else {
        newFavoritesArray = favorites.filter((slug: string) => slug !== talk.slug.current);
      }
      localStorage.setItem('favoriteTalks', JSON.stringify(newFavoritesArray));
      setIsFavorite(newIsFavorite);
      if (onFavoriteToggle) onFavoriteToggle();
    } finally {
      setIsLoading(false);
    }
  };

  const speakerImages = talk.speakers?.filter(s => s.picture?.asset?.url) || [];
  const fallbackImageUrl = '/images/LitenFisk.svg';

  return (
    <Link href={`/talks/${talk.slug?.current}`} className="block group h-full pt-2 pl-2">
      <div className="relative h-full">
        <div className="absolute bg-[#ffaf35] top-0 left-0 w-full h-full -z-10"></div>
        <div className="relative h-full flex flex-col bg-[#2A1449] -translate-y-1 -translate-x-1 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
          <div className="flex-grow relative min-h-[200px] bg-[#2A1449] overflow-hidden">
            {speakerImages.length > 0 ? (
              <div className="w-full h-full relative">
                <Image
                  src={speakerImages[0].picture?.asset?.url || fallbackImageUrl}
                  alt={speakerImages[0]?.name ? `Photo of ${speakerImages[0].name}` : talk.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={fallbackImageUrl}
                  alt="Fallback talk image"
                  width={90}
                  height={90}
                  className="object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            )}
          </div>
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
