"use client";

import { useState } from 'react';
import FeedbackCard from './FeedbackCard';
import HelpCard from './HelpCard';
import { ClientTalkFiltersProps } from '@/types/props';
import { PixelInput } from './InputPixelCorners';

export default function FeedbackTalksList({ talks }: ClientTalkFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTalks = talks.filter((talk) => {
    if (searchTerm && talk.title) {
      return talk.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        <div className="w-full max-w-md">
          <PixelInput>
            <input
              type="text"
              placeholder="Søk etter foredragstittel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-white focus:outline-none"
            />
          </PixelInput>
        </div>
      </div>

      {filteredTalks.length === 0 && searchTerm && (
        <div className="text-center py-16">
          <p className="text-gray-300">Ingen foredrag funnet som matcher &ldquo;{searchTerm}&rdquo;.</p>
        </div>
      )}
      {filteredTalks.length === 0 && !searchTerm && (
        <div className="text-center py-16">
          <p className="text-gray-300">Ingen foredrag tilgjengelig for øyeblikket.</p>
        </div>
      )}
      {filteredTalks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <HelpCard />
          {filteredTalks.map((talk) => (
            <FeedbackCard
              key={talk._id}
              talk={talk}
            />
          ))}
        </div>
      )}
    </>
  );
} 