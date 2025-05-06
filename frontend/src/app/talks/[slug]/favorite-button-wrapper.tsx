"use client";

import FavoriteButton from './favorite-button';

interface FavoriteButtonWrapperProps {
  talkSlug: string;
}

export default function FavoriteButtonWrapper({ talkSlug }: FavoriteButtonWrapperProps) {
  const handleFavoriteToggle = () => {
    // The callback logic is handled internally by the button
    // We just need this to avoid passing functions from server to client components
  };

  return (
    <div className="flex items-center">
      <FavoriteButton 
        talkSlug={talkSlug} 
        onFavoriteToggle={handleFavoriteToggle} 
      />
    </div>
  );
} 