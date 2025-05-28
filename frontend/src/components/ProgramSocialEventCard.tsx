"use client";

import type { FC } from 'react';
import type { SocialEvent } from '@/types';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

interface ProgramSocialEventCardProps {
    event: SocialEvent;
}

const ProgramSocialEventCard: FC<ProgramSocialEventCardProps> = ({ event }) => {
    return (
        <div className="block group pt-2 pl-2 w-full"> {/* Ensure it takes full width of its grid cell if placed in one */}
            <div className="relative h-full">
                {/* Optional: A distinct background color for social events */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gray-700"></div> 
                <div className="relative flex flex-col bg-slate-200 text-slate-800 -translate-y-1 -translate-x-1 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 min-h-48 p-6 h-full">
                    
                    {/* Room/Address - Displayed prominently */}
                    {event.roomAddress && (
                        <div className="mb-2 pb-2 border-b border-slate-400">
                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">Sted:</p>
                            <p className="text-lg text-slate-900 iceland">{event.roomAddress}</p>
                        </div>
                    )}

                    {/* Header: Title */}
                    <div className="mb-2">
                        <h2 className="text-2xl text-slate-900 iceland leading-tight">
                            {event.title || "Navn på arrangement mangler"}
                        </h2>
                    </div>

                    {/* Time Info - if available */}
                    {event.time && (
                         <p className="text-sm text-slate-700 mb-3 iceland">
                            Kl: {new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', '.')}
                        </p>
                    )}
                    
                    {/* Spacer Element - Pushes the description down if content is short */}
                    <div className="flex-grow min-h-0"></div>

                    {/* Description (if any) */}
                    {event.description && (
                        <div className="text-sm text-slate-700 prose prose-sm max-w-none">
                            <PortableText value={event.description} />
                        </div>
                    )}
                    
                    {/* Link to details page (if slug exists) */}
                     {event.slug?.current && (
                        <div className="mt-auto pt-4">
                             <Link href={`/social/${event.slug.current}`} className="text-sm text-blue-600 hover:text-blue-800 hover:underline iceland">
                                Les mer
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgramSocialEventCard; 