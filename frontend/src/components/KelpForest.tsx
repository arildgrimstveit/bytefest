import React from 'react';
import Image from 'next/image';
import '../styles/animations.css';

const KelpForest: React.FC = () => {
  return (
    <div className="relative w-full h-[clamp(calc(3rem+1vw),calc(3rem+1vw+((100vw-320px)*0.03)),10rem)] mb-[-1px] pt-[clamp(calc(8rem+2vw),calc(8rem+2vw+((100vw-320px)*0.05)),15rem)]">
      {/* No background color - the footer will provide the background */}
      
      <div className="absolute bottom-0 w-full">
        {/* Left section */}
        <div className="absolute bottom-0">
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock formation" 
            width={120} 
            height={60} 
            className="relative z-10 left-1 w-[clamp(calc(2.5rem+1vw),calc(2.5rem+1vw+((100vw-320px)*0.02)),7.5rem)] h-auto transition-all duration-300"
          />
          <Image 
            src="/images/kelpforest/GreenKelpLeft.svg" 
            alt="Kelp" 
            width={80} 
            height={120} 
            className="absolute bottom-0 left-[clamp(calc(1.5rem+0.6vw),calc(1.5rem+0.6vw+((100vw-320px)*0.018)),5rem)] z-20 w-[clamp(calc(2rem+0.6vw),calc(2rem+0.6vw+((100vw-320px)*0.018)),5rem)] h-auto transition-all duration-300"
          />
          <Image 
            src="/images/kelpforest/KelpLeft.svg" 
            alt="Kelp" 
            width={150} 
            height={100} 
            className="absolute left-0 bottom-[clamp(calc(0.5rem+0.2vw),calc(0.5rem+0.2vw+((100vw-320px)*0.015)),1.25rem)] z-0 w-[clamp(calc(3.5rem+0.8vw),calc(3.5rem+0.8vw+((100vw-320px)*0.025)),9rem)] h-auto transition-all duration-300"
          />
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Kelp" 
            width={75} 
            height={100} 
            className="absolute left-[clamp(calc(3.5rem+0.8vw),calc(3.5rem+0.8vw+((100vw-320px)*0.025)),7.5rem)] bottom-0 z-0 w-[clamp(calc(2rem+0.5vw),calc(2rem+0.5vw+((100vw-320px)*0.018)),5rem)] h-auto transition-all duration-300"
          />
        </div>

        {/* Middle section */}
        <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2">
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock formation" 
            width={140} 
            height={70} 
            className="relative left-[clamp(calc(2rem+0.8vw),calc(2rem+0.8vw+((100vw-320px)*0.018)),5rem)] z-10 w-[clamp(calc(3.5rem+0.8vw),calc(3.5rem+0.8vw+((100vw-320px)*0.025)),9rem)] h-auto transition-all duration-300"
          />
          <Image 
            src="/images/kelpforest/KelpMiddle.svg" 
            alt="Kelp" 
            width={100} 
            height={110} 
            className="absolute bottom-0 left-[clamp(calc(1rem+0.4vw),calc(1rem+0.4vw+((100vw-320px)*0.009)),2.5rem)] z-0 w-[clamp(calc(2.5rem+0.6vw),calc(2.5rem+0.6vw+((100vw-320px)*0.025)),7rem)] h-auto transition-all duration-300"
          />
        </div>

        {/* Right section */}
        <div className="absolute bottom-0 right-0">
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock right" 
            width={120} 
            height={60} 
            className="relative z-10 w-[clamp(calc(2.5rem+0.8vw),calc(2.5rem+0.8vw+((100vw-320px)*0.025)),7.5rem)] h-auto transition-all duration-300"
          />
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock middle" 
            width={60} 
            height={50} 
            className="absolute bottom-0 right-[clamp(calc(2.5rem+0.8vw),calc(2.5rem+0.8vw+((100vw-320px)*0.025)),6.5rem)] z-20 w-[clamp(calc(1.5rem+0.4vw),calc(1.5rem+0.4vw+((100vw-320px)*0.015)),4rem)] h-auto transition-all duration-300"
          />
          <Image 
            src="/images/kelpforest/Rock.svg" 
            alt="Rock left" 
            width={100} 
            height={40} 
            className="absolute bottom-0 right-[clamp(calc(4rem+1vw),calc(4rem+1vw+((100vw-320px)*0.034)),9.5rem)] z-0 w-[clamp(calc(2.5rem+0.6vw),calc(2.5rem+0.6vw+((100vw-320px)*0.025)),7rem)] h-auto transition-all duration-300"
          />
          <Image 
            src="/images/kelpforest/GreenKelpRight.svg" 
            alt="Kelp" 
            width={90} 
            height={110} 
            className="absolute bottom-1 right-[clamp(calc(1rem+0.5vw),calc(1rem+0.5vw+((100vw-320px)*0.009)),2.5rem)] z-0 w-[clamp(calc(2.5rem+0.6vw),calc(2.5rem+0.6vw+((100vw-320px)*0.021)),6rem)] h-auto transition-all duration-300"
          />
          <Image 
            src="/images/kelpforest/GreenKelpRight.svg" 
            alt="Kelp" 
            width={50} 
            height={100} 
            className="absolute bottom-1 right-[clamp(calc(4rem+1vw),calc(4rem+1vw+((100vw-320px)*0.032)),9rem)] z-10 w-[clamp(calc(1.25rem+0.4vw),calc(1.25rem+0.4vw+((100vw-320px)*0.0125)),3.5rem)] h-auto transition-all duration-300"
          />
        </div>
      </div>
      
      {/* Bubbles effect - centered over left section */}
      <div className="absolute bottom-[clamp(calc(1.5rem+0.4vw),calc(1.5rem+0.4vw+((100vw-320px)*0.016)),4.5rem)] left-[3%] w-[clamp(calc(1rem+0.4vw),calc(1rem+0.4vw+((100vw-320px)*0.007)),2rem)] h-[clamp(calc(3rem+0.8vw),calc(3rem+0.8vw+((100vw-320px)*0.017)),5rem)] opacity-30 transition-all duration-300">
        <div className="animate-float w-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] h-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] bg-green-200 rounded-full absolute bottom-0 transition-all duration-300"></div>
        <div className="animate-float-delay w-[clamp(calc(0.1rem+0.05vw),calc(0.1rem+0.05vw+((100vw-320px)*0.0009)),0.25rem)] h-[clamp(calc(0.1rem+0.05vw),calc(0.1rem+0.05vw+((100vw-320px)*0.0009)),0.25rem)] bg-green-200 rounded-full absolute bottom-[clamp(calc(0.5rem+0.15vw),calc(0.5rem+0.15vw+((100vw-320px)*0.0035)),1rem)] left-[clamp(calc(0.3rem+0.1vw),calc(0.3rem+0.1vw+((100vw-320px)*0.0017)),0.5rem)] transition-all duration-300"></div>
        <div className="animate-float-delay-2 w-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] h-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] bg-green-200 rounded-full absolute bottom-[clamp(calc(1rem+0.2vw),calc(1rem+0.2vw+((100vw-320px)*0.007)),2rem)] left-[clamp(calc(0.15rem+0.05vw),calc(0.15rem+0.05vw+((100vw-320px)*0.0008)),0.25rem)] transition-all duration-300"></div>
      </div>
      
      {/* Bubbles effect - centered over middle section */}
      <div className="absolute bottom-[clamp(calc(2rem+0.5vw),calc(2rem+0.5vw+((100vw-320px)*0.018)),5rem)] left-[35%] w-[clamp(calc(1rem+0.4vw),calc(1rem+0.4vw+((100vw-320px)*0.007)),2rem)] h-[clamp(calc(3rem+0.8vw),calc(3rem+0.8vw+((100vw-320px)*0.017)),5rem)] opacity-30 transition-all duration-300">
        <div className="animate-float w-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] h-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] bg-green-200 rounded-full absolute bottom-0 transition-all duration-300"></div>
        <div className="animate-float-delay w-[clamp(calc(0.1rem+0.05vw),calc(0.1rem+0.05vw+((100vw-320px)*0.0009)),0.25rem)] h-[clamp(calc(0.1rem+0.05vw),calc(0.1rem+0.05vw+((100vw-320px)*0.0009)),0.25rem)] bg-green-200 rounded-full absolute bottom-[clamp(calc(0.5rem+0.15vw),calc(0.5rem+0.15vw+((100vw-320px)*0.0035)),1rem)] left-[clamp(calc(0.3rem+0.1vw),calc(0.3rem+0.1vw+((100vw-320px)*0.0017)),0.5rem)] transition-all duration-300"></div>
        <div className="animate-float-delay-2 w-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] h-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] bg-green-200 rounded-full absolute bottom-[clamp(calc(1rem+0.2vw),calc(1rem+0.2vw+((100vw-320px)*0.007)),2rem)] left-[clamp(calc(0.15rem+0.05vw),calc(0.15rem+0.05vw+((100vw-320px)*0.0008)),0.25rem)] transition-all duration-300"></div>
      </div>
      
      {/* Bubbles effect - centered over right section */}
      <div className="absolute bottom-[clamp(calc(1.75rem+0.45vw),calc(1.75rem+0.45vw+((100vw-320px)*0.0172)),4.75rem)] right-[clamp(calc(4rem+1vw),calc(4rem+1vw+((100vw-320px)*0.034)),9.5rem)] w-[clamp(calc(1rem+0.4vw),calc(1rem+0.4vw+((100vw-320px)*0.007)),2rem)] h-[clamp(calc(3rem+0.8vw),calc(3rem+0.8vw+((100vw-320px)*0.017)),5rem)] opacity-30 transition-all duration-300">
        <div className="animate-float w-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] h-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] bg-green-200 rounded-full absolute bottom-0 transition-all duration-300"></div>
        <div className="animate-float-delay w-[clamp(calc(0.1rem+0.05vw),calc(0.1rem+0.05vw+((100vw-320px)*0.0009)),0.25rem)] h-[clamp(calc(0.1rem+0.05vw),calc(0.1rem+0.05vw+((100vw-320px)*0.0009)),0.25rem)] bg-green-200 rounded-full absolute bottom-[clamp(calc(0.5rem+0.15vw),calc(0.5rem+0.15vw+((100vw-320px)*0.0035)),1rem)] right-[clamp(calc(0.3rem+0.1vw),calc(0.3rem+0.1vw+((100vw-320px)*0.0017)),0.5rem)] transition-all duration-300"></div>
        <div className="animate-float-delay-2 w-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] h-[clamp(calc(0.15rem+0.1vw),calc(0.15rem+0.1vw+((100vw-320px)*0.0018)),0.5rem)] bg-green-200 rounded-full absolute bottom-[clamp(calc(1rem+0.2vw),calc(1rem+0.2vw+((100vw-320px)*0.007)),2rem)] right-[clamp(calc(0.15rem+0.05vw),calc(0.15rem+0.05vw+((100vw-320px)*0.0008)),0.25rem)] transition-all duration-300"></div>
      </div>
    </div>
  );
};

export default KelpForest; 