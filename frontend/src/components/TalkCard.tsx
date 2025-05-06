"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { FC } from "react";
import { TalkCardProps } from '@/types/props';
import StarIcon from '@/components/StarIcon'; // Changed import path

const TalkCard: FC<TalkCardProps> = ({ talk }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
    setIsFavorite(favorites.includes(talk._id));
  }, [talk._id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== talk._id);
    } else {
      newFavorites = [...favorites, talk._id];
    }
    
    localStorage.setItem('favoriteTalks', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Use LitenFisk as the primary image
  const imageUrl = '/images/LitenFisk.svg'; 
  const speakerName = talk.speakerName || 'Ukjent foredragsholder';

  return (
    <Link href={`/talks/${talk.slug?.current}`} className="block group h-full">
      <div className="relative overflow-hidden bg-[#F8F5D3] border-2 border-[#C16800] h-full flex flex-col">
        
        {/* Image Container */}
        <div className="relative w-full aspect-video overflow-hidden bg-[#2A1449]"> {/* Added dark bg for contrast */}
          <Image
            src={imageUrl}
            alt="" // Alt text is empty as it's decorative background
            width={100} // Reduced width
            height={100} // Reduced height
            className="object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Removed fill, w/h, max-w/h classes
            style={{ imageRendering: 'pixelated' }} // Ensure pixelated rendering for the fish
          />
        </div>

        {/* Content Area Below Image */}
        <div className="p-4 flex justify-between items-start flex-grow"> {/* Padding and flex layout */}
          <div className="flex-1 pr-2"> {/* Text content takes available space, padding right */}
            {/* Title */}
            <h3 className="text-base font-semibold mb-1 text-[#2A1449] leading-tight">
              {talk.title}
            </h3>
            {/* Speaker Name */}
            <p className="text-sm text-[#2A1449] opacity-80">
              {speakerName}
            </p>
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="p-1 flex-shrink-0" // Basic padding, prevent shrinking
          >
            <StarIcon 
              isFavorite={isFavorite} 
              className="w-6 h-6 text-[#2A1449]" // Use the star icon component
            /> 
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TalkCard;
