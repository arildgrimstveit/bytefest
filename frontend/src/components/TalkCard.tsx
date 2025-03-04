import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { Talk } from '@/types/talk';

interface TalkCardProps {
  talk: Talk;
}

const TalkCard: FC<TalkCardProps> = ({ talk }) => {
  // Fallback image if speaker image is not available
  const imageUrl = talk.speakerImage || '/images/LitenFisk.svg';
  const isFallbackImage = !talk.speakerImage;
  
  // Format duration display
  const durationDisplay = talk.duration ? 
    talk.duration.replace('min', ' MIN') : 
    '20 MIN'; // Default fallback
  
  // Get first tag or default
  const firstTag = talk.tags && talk.tags.length > 0 ? talk.tags[0] : 'TEKNOLOGI';
  
  return (
    <Link href={`/talks/${talk.slug.current}`} className="block hover:opacity-95 transition-opacity">
      <div className="h-full bg-gray-800 border border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* Image - Square aspect ratio container */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-700">
          <Image
            src={imageUrl}
            alt={talk.title}
            width={300}
            height={300}
            className={isFallbackImage 
              ? 'object-contain w-auto h-auto max-h-[70%] max-w-[70%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' 
              : 'object-cover w-full h-full'
            }
          />
        </div>
        
        {/* Content */}
        <div className="p-3">
          <h3 className="text-base font-semibold mb-1 text-white leading-tight line-clamp-2">{talk.title}</h3>
          
          {/* Footer with duration and tag */}
          <div className="flex items-center justify-between mt-2 text-gray-300 text-xs">
            <div className="flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-medium">{durationDisplay}</span>
            </div>
            
            <div className="flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="7" cy="7" r="1" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="font-medium uppercase">{firstTag}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TalkCard;
