"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HelpCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the help card is marked as favorite in localStorage
    const helpCardFavorite = localStorage.getItem('helpCardFavorite') === 'true';
    setIsFavorite(helpCardFavorite);
  }, []);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    const newState = !isFavorite;
    localStorage.setItem('helpCardFavorite', newState.toString());
    setIsFavorite(newState);
  };

  return (
    <div className="block h-full pt-2 pl-2">
      {/* Main card with orange backdrop effect */}
      <div className="relative h-full">
        {/* Orange backdrop */}
        <div className="absolute bg-[#ffaf35] top-0 left-0 w-full h-full -z-10"></div>
        
        {/* Main card container */}
        <div className="relative h-full flex flex-col bg-[#F6EBD5] -translate-y-1 -translate-x-1 transition-transform hover:-translate-y-2 hover:-translate-x-2">
          
          {/* Content Area - Full height */}
          <div className="p-5 flex flex-col h-full">
            <h3 className="text-2xl iceland text-[#2A1449] leading-tight mb-4 mt-10">
              Hjelp oss i planleggingen
            </h3>
            
            <p className="text-[#2A1449] mb-6 flex-grow">
              Klikk på sjøstjerna for de foredragene du har mest lyst til å få med deg. 
              Vi bruker markeringene deres til å planlegge hvilke rom vi skal bruke til hvilke foredrag.
            </p>
            
            {/* Star icon centered at bottom */}
            <div className="flex justify-center mt-auto">
              <button
                onClick={toggleFavorite}
                className="p-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Image 
                  src={isFavorite ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
                  alt={isFavorite ? 'Favoritt' : 'Legg til som favoritt'}
                  width={40}
                  height={40}
                  className="w-15 h-15 mb-15"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCard; 