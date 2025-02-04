import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import type { Speaker } from '@/types/speaker';

interface SpeakerCardProps {
  speaker: Speaker;
}

const SpeakerCard: FC<SpeakerCardProps> = ({ speaker }) => {
  const speakerSlug = speaker.slug?.current || '#';

  return (
    <Link
      href={speakerSlug !== '#' ? `/speakers/${speakerSlug}` : '#'}
      className={`block max-w-xs mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transform ${
        speakerSlug !== '#' ? 'hover:scale-[1.05] transition duration-300' : ''
      }`}
    >
      <div className="h-24 w-24 relative rounded-full overflow-hidden border-2 border-gray-300">
        <Image src={speaker.picture} alt={speaker.name} fill className="object-cover" />
      </div>
      <h2 className="mt-3 text-lg font-semibold text-gray-800">{speaker.name}</h2>
    </Link>
  );
};

export default SpeakerCard;
