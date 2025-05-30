"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import type { TalkCardProps } from '@/types/props';

// Updated TalkCardProps to expect isFavorite and onToggleFavorite
interface ExtendedTalkCardProps extends TalkCardProps {
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void; // Expects a function that takes the slug
  // Pass down global loading/error states if card needs to react to them individually
  // For optimistic updates, card-specific loading for the toggle itself is minimal.
  isLoadingGlobalFavs: boolean;
  isStoreReady: boolean; // Renamed from isStoreInitialized for clarity as prop
  globalFavsError?: string | null;
}

const TalkCard: FC<ExtendedTalkCardProps> = ({
  talk,
  isFavorite,
  onToggleFavorite,
  isLoadingGlobalFavs,
  isStoreReady,
  globalFavsError
}) => {

  const handleToggleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(talk.slug.current); // Call the passed-in toggle function with the slug
  };

  // Use passed-in global loading state for the favorite button's initial state
  const showLoader = !isStoreReady || isLoadingGlobalFavs;

  // Image logic from your original, visually correct card structure
  const speakerImages = talk.speakers?.filter(s => s.picture?.asset?.url) || [];
  const fallbackImageUrl = '/images/LitenFisk.svg'; // Your original fallback
  const displayImageUrl = speakerImages.length > 0 ? speakerImages[0].picture!.asset!.url! : fallbackImageUrl;
  const displayImageAlt = speakerImages.length > 0
    ? (speakerImages[0]?.name ? `Photo of ${speakerImages[0].name}` : talk.title || "Talk image")
    : talk.title || "Fallback talk image";

  return (
    <Link href={`/talks/${talk.slug?.current}`} className="block group h-full pt-2 pl-2">
      <div className="relative h-full">
        <div className="absolute bg-[#ffaf35] top-0 left-0 w-full h-full -z-10"></div>
        <div className="relative h-full flex flex-col bg-[#2A1449] -translate-y-1 -translate-x-1 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
          <div className="flex-grow relative min-h-[200px] bg-[#2A1449] overflow-hidden">
            {speakerImages.length > 0 ? (
              <div className="w-full h-full relative">
                <Image
                  src={displayImageUrl}
                  alt={displayImageAlt}
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
              {/* Favorite Button using useFavorites hook data */}
              <div className="absolute bottom-5 right-5">
                {showLoader ? (
                  <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-full"></div>
                ) : globalFavsError ? (
                  <div className="w-7 h-7 flex items-center justify-center text-red-500" title={globalFavsError}>
                    ! {/* Simple error display */}
                  </div>
                ) : (
                  <button
                    onClick={handleToggleFavoriteClick}
                    className="transition-transform active:scale-95 cursor-pointer flex items-center hover:opacity-75"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Image
                      src={isFavorite ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
                      alt={isFavorite ? 'Favoritt' : 'Legg til som favoritt'}
                      width={24} // Original size from old card
                      height={24} // Original size from old card
                      className="w-7 h-7" // Original class from old card
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TalkCard;
