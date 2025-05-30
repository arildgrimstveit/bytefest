"use client";

import type { FC } from 'react';
import type { SocialEvent } from '@/types';
import { PortableText } from '@portabletext/react';

interface ProgramSocialEventCardProps {
    event: SocialEvent;
}

const ProgramSocialEventCard: FC<ProgramSocialEventCardProps> = ({ event }) => {
    const socialEventColor = '#A0AEC0';

    return (
        <div
            className="block group pt-2 flex flex-col h-full"
        >
            {/* Room/Address - positioned in the top-left accent area */}
            {event.roomAddress && (
                <div className="mb-2 ml-[-5] z-10 relative">
                    <p className="text-sm text-white">
                        {event.roomAddress}
                    </p>
                </div>
            )}

            {/* Main card visual structure - takes remaining space */}
            <div className="relative flex-grow flex flex-col">
                <div className="absolute top-0 left-0 w-full h-full -z-10" style={{ backgroundColor: socialEventColor }}></div>
                <div className="relative flex flex-col bg-[#F6EBD5] text-black -translate-y-1.5 -translate-x-1.5 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 min-h-68 p-6 h-full">
                    
                    {/* Header Block: Title */}
                    <div className="mb-2">
                        <div className="flex justify-between items-start min-w-0">
                            <h2 className="text-2xl mr-4 break-words iceland leading-none">
                                {event.title || "Social Event"}
                            </h2>
                        </div>
                    </div>

                    {/* Explicit Spacer Element - Pushes the footer down */}
                    <div className="flex-1 min-h-0">
                        {event.description && (
                            <div className="text-sm prose prose-sm max-w-none mt-2 mb-2 text-gray-700">
                                <PortableText value={event.description} />
                            </div>
                        )}
                    </div>

                    {/* Footer Block: Time */}
                    <div className="pt-2">
                        <div className="flex justify-end items-end">
                            {/* Time */}
                            <div className="text-right ml-2 flex-shrink-0">
                                {event.time && (
                                    <p className="text-base iceland">
                                        {new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', '.')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramSocialEventCard; 