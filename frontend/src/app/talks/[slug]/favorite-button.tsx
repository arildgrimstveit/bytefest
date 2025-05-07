"use client";

import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites"; // Adjust path if necessary
import type { FavoriteButtonProps } from "@/types/props"; // Import from types folder

export default function FavoriteButton({ talkSlug, onFavoriteToggle }: FavoriteButtonProps) {
  const { favs, toggleFavorite, isLoadingFavs, errorFavs, isStoreInitialized } = useFavorites();

  // Determine if the current talk is favorited based on the favs array from the hook
  const isFavorite = favs.includes(talkSlug);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistically toggle, then let the hook handle the background update and potential revert.
    await toggleFavorite(talkSlug);

    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };

  // Show loading spinner only if the store is not yet initialized OR if explicitly loading favs
  // This prevents flashing the loader during optimistic updates if favs are already available.
  if (!isStoreInitialized || isLoadingFavs) {
    return (
      <div className="w-7 h-7 animate-pulse bg-gray-300 rounded-full"></div>
    );
  }

  // Optionally, display an error state from the hook
  if (errorFavs) {
    return (
      <div className="w-7 h-7 flex items-center justify-center" title={errorFavs}>
        <span className="text-red-500">!</span> {/* Simple error indicator */}
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="transition-transform active:scale-95 cursor-pointer flex items-center hover:opacity-75"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      // Disable button if store isn't ready or if a background load is explicitly in progress.
      // The toggleFavorite itself is optimistic and doesn't set isLoadingFavs.
      disabled={!isStoreInitialized || isLoadingFavs}
    >
      <Image
        src={isFavorite ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
        alt={isFavorite ? 'Favoritt' : 'Legg til som favoritt'}
        width={20}
        height={20}
        className="w-6 h-6"
      />
    </button>
  );
} 