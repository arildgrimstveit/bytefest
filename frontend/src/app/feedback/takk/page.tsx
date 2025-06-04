'use client';

import Image from 'next/image';

export default function FeedbackTakkPage() {

  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      <div className="w-full max-w-2xl mx-auto my-8">
        <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <div className="text-center mb-6">
            <h1 className="text-4xl sm:text-5xl argent">Takk for din tilbakemelding!</h1>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="text-left flex-1 pr-6">
              <p className="text-lg text-gray-700 mb-4">
                Din tilbakemelding er mottatt og vil hjelpe oss å forbedre fremtidige arrangementer.
              </p>
            </div>
            
            <div className="flex-shrink-0 mt-1">
              <Image
                src="/images/fargerikfisk.svg"
                alt=""
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 