"use client";

import Image from "next/image";
import Link from "next/link";

const HelpCard = () => {
  return (
    <Link href="/feedback/bytefest" className="block h-full pt-2 pl-2">
      {/* Main card with orange backdrop effect */}
      <div className="relative h-full">
        {/* Orange backdrop */}
        <div className="absolute bg-[#ffaf35] top-0 left-0 w-full h-full -z-10"></div>

        {/* Main card container */}
        <div className="relative h-full flex flex-col bg-[#F6EBD5] -translate-y-1 -translate-x-1 transition-transform hover:-translate-y-2 hover:-translate-x-2">

          {/* Content Area - Full height */}
          <div className="p-5 flex flex-col h-full">
            <h3 className="text-2xl iceland text-[#2A1449] leading-tight mb-4 mt-10">
              Tilbakemelding på Bytefest
            </h3>

            <p className="text-[#2A1449] mb-6 flex-grow">
              Ønsker du å gi tilbakemelding på Bytefest som helhet? Klikk her for å gi tilbakemelding på hele arrangementet, eller klikk på et av foredragene for å gi tilbakemelding på et bestemt foredrag.
            </p>

            {/* Feedback icon centered at bottom */}
            <div className="flex justify-center mt-auto">
              <div className="p-2 transition-transform active:scale-95 cursor-pointer hover:opacity-75">
                <Image
                  src="/images/Feedback.svg"
                  alt="Gi tilbakemelding"
                  width={200}
                  height={30}
                  style={{ height: "auto" }}
                  className="mb-2 transition-transform active:scale-95 cursor-pointer hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HelpCard; 