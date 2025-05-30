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
    viewingLocation: string;
    roomName?: string;
}

const ProgramTalkCard: FC<ProgramTalkCardProps> = ({ talk, track, isFavorite, onToggleFavorite, isLoadingGlobalFavs, isStoreReady, globalFavsError, viewingLocation, roomName }) => {
    const getTrackColor = (trackNumber: number) => {
        switch (trackNumber) {
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

    const trackColor = getTrackColor(track);

    return (
        <Link
            href={`/talks/${talk.slug?.current || '#'}`}
            className="block group pt-2 flex flex-col h-full"
        >
            {roomName && (
                <div className="mb-2 ml-[-5] z-10 relative">
                    <p className="text-sm text-white">
                        {roomName}
                    </p>
                </div>
            )}

            <div className={`relative flex-grow flex flex-col`}>
                <div className="absolute top-0 left-0 w-full h-full -z-10" style={{ backgroundColor: trackColor }}></div>
                <div className={`relative flex flex-col bg-[#F6EBD5] text-black -translate-y-1.5 -translate-x-1.5 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 min-h-68 p-6 h-full`}>
                    
                    <div className="mb-2">
                        <div className="flex justify-between items-start min-w-0">
                            <h2 className="text-2xl mr-4 break-words iceland leading-none">
                                {talk.title || "Ingen tittel"}
                            </h2>
                            <div className="flex-shrink-0 ml-2">
                                {isLoadingGlobalFavs || !isStoreReady ? (
                                    <div className="w-6 h-6 animate-pulse bg-gray-200 rounded-full"></div>
                                ) : globalFavsError ? (
                                    <div className="w-6 h-6 flex items-center justify-center text-red-500" title={globalFavsError}>
                                        !
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleToggleFavoriteClick}
                                        className="transition-transform active:scale-95 cursor-pointer flex items-center hover:opacity-75 w-6 h-6"
                                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <Image
                                            src={isFavorite ? '/images/SeaStarFilled.svg' : '/images/SeaStar.svg'}
                                            alt={isFavorite ? 'Favoritt' : 'Legg til som favoritt'}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                        {viewingLocation && talk.location && talk.location.toLowerCase() !== viewingLocation.toLowerCase() && talk.location.toLowerCase() !== 'digitalt' && (
                            <div className="pt-1 border-t border-gray-400 mt-2">
                                <p className="text-base text-black iceland">
                                    Streames fra {talk.location}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-h-0"></div>

                    <div className="pt-2">
                        <div className="flex justify-between items-end">
                            <div className="space-y-0.5">
                                {(talk.speakers && talk.speakers.length > 0) ? (
                                    talk.speakers.map((speaker, index) => (
                                        <p key={speaker?._key || speaker?.name || `speaker-${index}`} className="text-black iceland leading-none">
                                            {speaker?.name || 'TBA'}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-black iceland leading-none">TBA</p>
                                )}
                            </div>
                            <div className="text-right ml-2 flex-shrink-0">
                                {talk.time && (
                                    <p className="text-base text-black iceland">
                                        {new Date(talk.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', '.')}
                                    </p>
                                )}
                                {talk.duration && (
                                    <p className="text-base text-black iceland">
                                        {talk.duration.replace('min', ' min')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProgramTalkCard; 