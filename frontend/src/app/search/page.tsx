"use client";

import { useState } from 'react';
import { PixelInput } from '@/components/InputPixelCorners';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      // Here you would typically fetch search results
      // For now, we'll just simulate a search
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  return (
    <div className="text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 argent">Søk</h1>
        
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <PixelInput>
              <div className="flex items-center bg-white">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Søk etter foredrag, foredragsholdere, emner..."
                  className="w-full p-4 bg-white focus:outline-none text-gray-800"
                />
                <button 
                  type="submit" 
                  className="p-4 transition-transform active:scale-95 hover:opacity-80"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="w-6 h-6 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin"></div>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
                        stroke="#161E38" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </PixelInput>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <div className="prose mx-auto text-center text-gray-800">
            {searchTerm ? (
              <div>
                <h2 className="text-2xl mb-4">Søkeresultater for &quot;{searchTerm}&quot;</h2>
                <p>Ingen resultater funnet. Prøv et annet søkeord.</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl mb-4">Populære søk</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['JavaScript', 'React', 'TypeScript', 'Design', 'UX', 'AI'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="bg-[#161E38] text-white px-4 py-2 hover:opacity-80 transition-opacity active:scale-95 cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  