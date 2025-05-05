"use client";

import Link from 'next/link';
import type { FC } from 'react';
import type { Talk } from '@/types/talk';
import React from 'react';

interface ProgramTalkCardProps {
    talk: Talk;
}

const ProgramTalkCard: FC<ProgramTalkCardProps> = ({ talk }) => {
    const durationDisplay = talk.duration
        ? talk.duration.replace('min', ' MIN').toUpperCase()
        : '';

    return (
        <Link
            href={`/talks/${talk.slug?.current || '#'}`}
            className="block hover:opacity-90 transition-opacity h-full"
        >
            <div className="bg-[#F6EBD5] p-6 text-[#2A1449] relative flex flex-col justify-between h-full shadow-md">
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl text-[#2A1449] mr-4 font-medium break-words">
                            {talk.title || "Ingen tittel"}
                        </h2>
                        <button
                            onClick={(e) => { e.preventDefault(); /* TODO: Implement favorite logic */ }}
                            className="text-[#2A1449] text-2xl hover:text-yellow-500 transition-colors relative z-10"
                        >
                            ☆
                        </button>
                    </div>

                    <div className="space-y-1">
                        {(talk.speakers && talk.speakers.length > 0) ? (
                            talk.speakers.map((speaker) => (
                                <p key={speaker?._key || speaker?.name} className="text-sm font-medium">
                                    {speaker?.name || 'TBA'}
                                </p>
                            ))
                        ) : (
                            <p className="text-sm font-medium">TBA</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        {talk.tags?.slice(0, 3).map((tag, index) => {
                            if (index === 2) {
                                return (
                                    <div key={index} className="flex">
                                        <span
                                            className="bg-[#161E38] text-[#F6EBD5] px-2 py-0.5 text-xs uppercase whitespace-nowrap w-fit"
                                        >
                                            {tag}
                                        </span>
                                        {talk.tags && talk.tags.length > 3 && (
                                            <span className="ml-2 text-xs text-[#2A1449]/60 py-0.5">...</span>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <span
                                    key={index}
                                    className="bg-[#161E38] text-[#F6EBD5] px-2 py-0.5 text-xs uppercase whitespace-nowrap w-fit block"
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {durationDisplay && (
                    <div className="mt-auto pt-4">
                        <span className="text-sm uppercase font-medium">
                            {durationDisplay}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ProgramTalkCard; 