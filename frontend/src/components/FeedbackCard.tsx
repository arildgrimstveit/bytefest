"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import type { Talk } from '@/types/talk';

interface FeedbackCardProps {
  talk: Talk;
}

const FeedbackCard: FC<FeedbackCardProps> = ({ talk }) => {
  // Image logic from TalkCard
  const speakerImages = talk.speakers?.filter(s => s.picture?.asset?.url) || [];
  const fallbackImageUrl = '/images/LitenFisk.svg';
  const displayImageUrl = speakerImages.length > 0 ? speakerImages[0].picture!.asset!.url! : fallbackImageUrl;
  const displayImageAlt = speakerImages.length > 0
    ? (speakerImages[0]?.name ? `Photo of ${speakerImages[0].name}` : talk.title || "Talk image")
    : talk.title || "Fallback talk image";

  return (
    <Link href={`/talks/${talk.slug?.current}`} className="block group h-full pt-2 pl-2">
      <div className="relative h-full">
        <div className="absolute bg-[#ffaf35] top-0 left-0 w-full h-full -z-10"></div>
        <div className="relative h-full flex flex-col bg-[#2A1449] -translate-y-1 -translate-x-1 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
          <div className="flex-grow relative min-h-[200px] bg-[#2A1449] overflow-hidden">
            {speakerImages.length > 0 ? (
              <div className="w-full h-full relative">
                <Image
                  src={displayImageUrl}
                  alt={displayImageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={fallbackImageUrl}
                  alt="Fallback talk image"
                  width={90}
                  height={90}
                  className="object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            )}
          </div>
          <div className="bg-[#F6EBD5] w-full">
            <div className="p-5 relative">
              <h3 className="text-xl sm:text-2xl iceland text-[#2A1449] leading-tight">
                {talk.title}
              </h3>
              <div className="mt-2">
                {talk.speakers && talk.speakers.length > 0 ? (
                  talk.speakers.map((speaker, index) => (
                    <p key={speaker._key || index} className="text-lg iceland text-[#2A1449]">
                      {speaker.name || 'Ukjent foredragsholder'}
                    </p>
                  ))
                ) : (
                  <p className="text-sm iceland text-[#2A1449]">
                    Ukjent foredragsholder
                  </p>
                )}
              </div>
              {/* Feedback icon */}
              <div className="absolute bottom-5 right-5">
                <div className="w-7 h-7 flex items-center justify-center text-[#2A1449]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10h8M8 14h6M6 2h12a2 2 0 012 2v12l-4-4H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedbackCard; 