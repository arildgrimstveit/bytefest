import Image from 'next/image';
import type { FC } from 'react';

interface Speaker {
  _id: string;
  name: string;
  summary: string;
  picture: string;
}

interface SpeakerCardProps {
  speaker: Speaker;
}

const SpeakerCard: FC<SpeakerCardProps> = ({ speaker }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={speaker.picture}
          alt={speaker.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{speaker.name}</h2>
        <p className="mt-2 text-gray-600">{speaker.summary}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;
