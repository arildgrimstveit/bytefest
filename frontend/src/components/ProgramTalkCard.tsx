"use client";

import Link from 'next/link';
import type { FC } from 'react';
import type { Talk } from '@/types/talk';
import React from 'react';
import Image from "next/image";

interface ProgramTalkCardProps {
    talk: Talk;
    track: 1 | 2 | 3 | 4;
    isFavorite: boolean;
    onToggleFavorite: (slug: string) => void;
    isLoadingGlobalFavs: boolean;
    isStoreReady: boolean;
    globalFavsError?: string | null;
}

const ProgramTalkCard: FC<ProgramTalkCardProps> = ({ talk, track, isFavorite, onToggleFavorite, isLoadingGlobalFavs, isStoreReady, globalFavsError }) => {
    const getTrackColor = (track: number) => {
        switch (track) {
            case 1:
                return '#98C649';
            case 2:
                return '#FFAF35';
            case 3:
                return '#EB6565';
            case 4:
                return '#84CDE3';
            default:
                return '#FFAF35';
        }
    };

    const handleToggleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(talk.slug.current);
    };

    return (
        <Link
            href={`/talks/${talk.slug?.current || '#'}`}
            className="block group h-full pt-2 pl-2"
        >
            <div className="relative h-full">
                <div className="absolute top-0 left-0 w-full h-full -z-10" style={{ backgroundColor: getTrackColor(track) }}></div>
                <div className="relative h-full flex flex-col bg-[#F6EBD5] -translate-y-1 -translate-x-1 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
                    <div className="p-4 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start min-w-0">
                            <h2 className="text-lg text-[#2A1449] mr-4 font-medium break-words">
                                {talk.title || "Ingen tittel"}
                            </h2>
                            {isLoadingGlobalFavs || !isStoreReady ? (
                                <div className="w-5 h-5 animate-pulse bg-gray-200 rounded-full flex-shrink-0"></div>
                            ) : globalFavsError ? (
                                <div className="w-5 h-5 flex items-center justify-center text-red-500 flex-shrink-0" title={globalFavsError}>
                                    !
                                </div>
                            ) : (
                                <button
                                    onClick={handleToggleFavoriteClick}
                                    className="transition-transform active:scale-95 cursor-pointer flex items-center hover:opacity-75 flex-shrink-0 w-5 h-5"
                                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <Image
                                        src={isFavorite ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
                                        alt={isFavorite ? 'Favoritt' : 'Legg til som favoritt'}
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                </button>
                            )}
                        </div>

                        <div className="min-h-[1rem]"></div>

                        <div className="space-y-1">
                            {(talk.speakers && talk.speakers.length > 0) ? (
                                talk.speakers.map((speaker) => (
                                    <p key={speaker?._key || speaker?.name} className="text-sm font-medium text-black">
                                        {speaker?.name || 'TBA'}
                                    </p>
                                ))
                            ) : (
                                <p className="text-sm font-medium text-black">TBA</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProgramTalkCard; 