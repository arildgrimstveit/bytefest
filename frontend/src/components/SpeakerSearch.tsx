'use client';

import { useState, useMemo } from 'react';
import SpeakerCard from './SpeakerCard';
import type { FC } from 'react';
import type { Speaker } from '@/types/speaker';

interface SpeakerSearchProps {
  speakers: Speaker[];
}

const SpeakerSearch: FC<SpeakerSearchProps> = ({ speakers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpeakers = useMemo(() => {
    if (!searchTerm) return speakers;
    return speakers.filter((speaker) =>
      speaker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [speakers, searchTerm]);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Søk etter foredragsholder..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpeakers.map((speaker) => (
          <SpeakerCard key={speaker._id} speaker={speaker} />
        ))}
      </div>
    </div>
  );
};

export default SpeakerSearch;
