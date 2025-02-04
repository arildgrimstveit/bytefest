'use client';

import { useState, useMemo } from 'react';
import TalkCard from './TalkCard';
import type { FC } from 'react';

interface Talk {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  publishedAt: string;
}

interface TalkSearchProps {
  talks: Talk[];
}

const TalkSearch: FC<TalkSearchProps> = ({ talks }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTalks = useMemo(() => {
    if (!searchTerm) return talks;
    return talks.filter((talk) =>
      talk.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [talks, searchTerm]);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Søk etter foredrag..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalks.map((talk) => (
          <TalkCard key={talk._id} talk={talk} />
        ))}
      </div>
    </div>
  );
};

export default TalkSearch;
