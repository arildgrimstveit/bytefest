import React from 'react';
import Image from 'next/image';
import '../styles/animations.css';

const KelpForest: React.FC = () => {
  return (
    <div className="relative w-full h-24 md:h-32 lg:h-40 mb-[-1px] pt-60">
      {/* No background color - the footer will provide the background */}
      
      <div className="absolute bottom-0 w-full">
        {/* Left section */}
        <div className="absolute bottom-0">
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock formation" 
            width={120} 
            height={60} 
            className="relative z-10 left-1"
          />
          <Image 
            src="/images/kelpforest/GreenKelpLeft.svg" 
            alt="Kelp" 
            width={80} 
            height={120} 
            className="absolute bottom-0 left-20 z-20"
          />
          <Image 
            src="/images/kelpforest/KelpLeft.svg" 
            alt="Kelp" 
            width={150} 
            height={100} 
            className="absolute left-0 bottom-5 z-0"
          />
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Kelp" 
            width={75} 
            height={100} 
            className="absolute left-30 bottom-0 z-0"
          />
        </div>

        {/* Middle section */}
        <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2">
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock formation" 
            width={140} 
            height={70} 
            className="relative left-20 z-10"
          />
          <Image 
            src="/images/kelpforest/KelpMiddle.svg" 
            alt="Kelp" 
            width={100} 
            height={110} 
            className="absolute bottom-0 left-10 z-0"
          />
        </div>

        {/* Right section */}
        <div className="absolute bottom-0 right-0">
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock right" 
            width={120} 
            height={60} 
            className="relative z-10"
          />
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock middle" 
            width={60} 
            height={50} 
            className="absolute bottom-0 right-26 z-20"
          />
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock left" 
            width={100} 
            height={40} 
            className="absolute bottom-0 right-38 z-0"
          />
          <Image 
            src="/images/kelpforest/GreenKelpRight.svg" 
            alt="Kelp" 
            width={90} 
            height={110} 
            className="absolute bottom-1 right-10 z-0"
          />
          <Image 
            src="/images/kelpforest/GreenKelpRight.svg" 
            alt="Kelp" 
            width={50} 
            height={100} 
            className="absolute bottom-1 right-36 z-10"
          />
        </div>
      </div>
      
      {/* Bubbles effect - centered over left section */}
      <div className="absolute bottom-18 left-[3%] w-8 h-20 opacity-30">
        <div className="animate-float w-2 h-2 bg-green-200 rounded-full absolute bottom-0"></div>
        <div className="animate-float-delay w-1 h-1 bg-green-200 rounded-full absolute bottom-4 left-2"></div>
        <div className="animate-float-delay-2 w-2 h-2 bg-green-200 rounded-full absolute bottom-8 left-1"></div>
      </div>
      
      {/* Bubbles effect - centered over middle section */}
      <div className="absolute bottom-20 left-[35%] w-8 h-20 opacity-30">
        <div className="animate-float w-2 h-2 bg-green-200 rounded-full absolute bottom-0"></div>
        <div className="animate-float-delay w-1 h-1 bg-green-200 rounded-full absolute bottom-4 left-2"></div>
        <div className="animate-float-delay-2 w-2 h-2 bg-green-200 rounded-full absolute bottom-8 left-1"></div>
      </div>
      
      {/* Bubbles effect - centered over right section */}
      <div className="absolute bottom-19 right-[7%] w-8 h-20 opacity-30">
        <div className="animate-float w-2 h-2 bg-green-200 rounded-full absolute bottom-0"></div>
        <div className="animate-float-delay w-1 h-1 bg-green-200 rounded-full absolute bottom-4 right-2"></div>
        <div className="animate-float-delay-2 w-2 h-2 bg-green-200 rounded-full absolute bottom-8 right-1"></div>
      </div>
    </div>
  );
};

export default KelpForest; 