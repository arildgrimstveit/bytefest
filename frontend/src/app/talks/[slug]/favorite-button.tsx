"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface FavoriteButtonProps {
  talkSlug: string;
  onFavoriteToggle?: () => void;
}

export default function FavoriteButton({ talkSlug, onFavoriteToggle }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Check if the talk is favorited on component mount
  useEffect(() => {
    async function checkFavoriteStatus() {
      setIsLoading(true);
      try {
        // Try the API first using slug
        const response = await fetch(`/api/favorites?talkSlug=${talkSlug}`);
        const data = await response.json();
        
        if (data.useLocalStorage) {
          // Use localStorage as directed by the API
          setUseLocalStorage(true);
          const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
          setIsFavorite(favorites.includes(talkSlug));
        } else if (response.ok) {
          // Use API response
          setIsFavorite(data.isFavorite);
        }
      } catch {
        // Fallback to localStorage if API fails
        setUseLocalStorage(true);
        const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
        setIsFavorite(favorites.includes(talkSlug));
      } finally {
        setIsLoading(false);
      }
    }
    
    checkFavoriteStatus();
  }, [talkSlug]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    if (useLocalStorage) {
      // Handle directly in localStorage
      const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = favorites.filter((slug: string) => slug !== talkSlug);
      } else {
        newFavorites = [...favorites, talkSlug];
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
          talkSlug,
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
          newFavorites = favorites.filter((slug: string) => slug !== talkSlug);
        } else {
          newFavorites = [...favorites, talkSlug];
        }
        
        localStorage.setItem('favoriteTalks', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
      } else if (response.ok) {
        // API operation successful
        setIsFavorite(!isFavorite);
      }
      
      // Call the callback if provided
      if (onFavoriteToggle) onFavoriteToggle();
    } catch {
      // API failed, fallback to localStorage
      setUseLocalStorage(true);
      const favorites = JSON.parse(localStorage.getItem('favoriteTalks') || '[]');
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = favorites.filter((slug: string) => slug !== talkSlug);
      } else {
        newFavorites = [...favorites, talkSlug];
      }
      
      localStorage.setItem('favoriteTalks', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      if (onFavoriteToggle) onFavoriteToggle();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-full"></div>
    );
  }

  return (
    <button 
      onClick={toggleFavorite}
      className="transition-transform active:scale-95 cursor-pointer flex items-center"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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