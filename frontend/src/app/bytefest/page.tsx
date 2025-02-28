"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Bytefest() {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const updateScale = () => {
      // Only start scaling when window width is below 1024px
      // Make scaling less aggressive by using a smaller divisor (800 instead of 1400)
      const newScale = window.innerWidth >= 1024 
        ? 1 
        : Math.min(1, Math.max(0.2, window.innerWidth / 1000));
      setScale(newScale);
    };

    // Initial calculation
    updateScale();
    
    // Throttled resize listener
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateScale, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate responsive negative margins for different sections
  const negativeMargin = scale < 0.8 ? `${-70 * (1 - scale)}px` : '0px';
  const outerNegativeMargin = scale < 0.8 ? `${-100 * (1 - scale)}px` : '0px';
  const extraNegativeMargin = scale < 0.8 ? `${-120 * (1 - scale)}px` : '0px';
  const midContainerMargin = scale < 0.8 ? `${-50 * (1 - scale)}px` : '0px';

  // Calculate responsive paddings with smooth quintic easing
  const crabPadding = () => {
    const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const t = Math.min(1, Math.max(0, (currentWidth - 600) / 1000));
    const easedProgress = t * t * t * (t * (t * 6 - 15) + 10);
    return `${Math.round(5 + 95 * easedProgress)}px`;
  };

  // State for crab padding
  const [paddingValue, setPaddingValue] = useState('5px');
  
  useEffect(() => {
    const updatePadding = () => setPaddingValue(crabPadding());
    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  return (
    <div className="py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center pt-10 lg:pt-20 space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Year and Fish */}
          <div className="flex items-center justify-center space-x-4 w-full sm:w-auto">
            <Image
              src="/images/Year25.svg"
              alt="Year25"
              width={120}
              height={120}
              className="pb-33 w-[120px] max-[400px]:w-[80px] h-auto transition-all duration-500 ease-out"
              priority
            />
            <Image
              src="/images/StorFisk.svg"
              alt="StorFisk"
              width={250}
              height={281}
              className="pb-5 lg:pb-0 w-[250px] max-[400px]:w-[200px] h-auto transition-all duration-500 ease-out"
              priority
            />
          </div>

          {/* Bytefest text and caption */}
          <div className="flex flex-col items-center lg:items-start">
            <Image
              src="/images/BytefestTextYellow.svg"
              alt="BytefestTextYellow"
              width={460}
              height={160}
              className="pb-7"
              priority
            />
            <p className="argent text-white text-4xl mt-4 text-center lg:text-left">
              Et nytt år og nye muligheter <br />
              for å dele og lære om <br />
              systemutvikling
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 xs:px-10 sm:px-16 text-white pt-15 lg:pt-20">
          <h2 className="text-2xl lg:text-3xl iceland">Hva er Bytefest?</h2>
          <p className="text-xl mt-4">
            Bytefest er en mikrokonferanse med fokus på fag og mye gøy! Den foregår på Sopra Sterias kontorer rundt omkring i landet - noen live, og noen digitalt.
          </p>
          <p className="text-xl mt-4">
            I fjor var det åtte fysiske lokasjoner spredt rundt i landet, og nesten 300 deltakere deltok på minikonferansen, som ble holdt av og for utviklermiljøet i Sopra Steria.
            Noen av temaene deltakerne kunne bryne seg på i fjor var Kubernetes og pipelines, kodekvalitet, hvordan lage egen GPT, kryssplattform mobilutvikling med React Native og .NET MAUI, med mer.
          </p>
        </div>
      </div>

      {/* Visual elements container */}
      <div className="relative flex flex-col items-center mt-5 md:mt-16 mb-10 md:mb-20">
        {/* Container 1 */}
        <div 
          className="w-full flex items-center justify-center"
          style={{ marginTop: extraNegativeMargin, marginBottom: extraNegativeMargin }}
        >
          <div 
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: "center center",
              willChange: "transform",
              transition: "transform 0.5s ease-out"
            }}
            className="flex items-center justify-center"
          >
            <div className="w-[480px] h-[484px] bg-[#F6EBD5] flex flex-col items-left justify-center pl-5">
              <p className="text-3xl sm:text-2xl text-[#2A1449] pr-40 sm:pr-30 pl-20 sm:pl-15">Sosial arena</p>
              <p className="text-2xl sm:text-xl text-[#2A1449] pr-30 sm:pr-30 pl-20 sm:pl-15 mt-4">
                Bytefest har fokus på læring, deling og det sosiale.
                Her får du mulighet til å utveksle erfaringer, lære nye 
                teknologier og bygge nettverk.
              </p>
              <div className="mt-10 pl-20 sm:pl-15">
                <Image 
                  src="/images/PaameldingKommer.svg" 
                  alt="Påmelding Kommer" 
                  width={226} 
                  height={44} 
                />
              </div>
            </div>

            <div className="relative -ml-16 w-[484px] h-[424px]">
              <Image 
                src="/images/Forsamling.svg" 
                alt="forsamling" 
                width={484} 
                height={424} 
                className="absolute top-0 left-0 z-10" 
              />
            </div>
          </div>
        </div>
        
        {/* First Crab */}
        <div 
          className="flex justify-center items-center z-10"
          style={{ 
            marginTop: negativeMargin, 
            marginBottom: midContainerMargin,
            padding: paddingValue,
            transition: "margin 0.5s ease-out, padding 0.5s ease-out"
          }}
        >
          <Image 
            src="/images/Krabbe.svg" 
            alt="Krabbe" 
            width={50 * scale} 
            height={50 * scale}
            style={{ transition: "width 0.5s ease-out, height 0.5s ease-out" }}
          />
        </div>
        
        {/* Container 2 */}
        <div 
          className="w-full flex items-center justify-center"
          style={{ 
            marginTop: midContainerMargin, 
            marginBottom: midContainerMargin,
            transition: "margin 0.5s ease-out"
          }}
        >
          <div
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              willChange: "transform",
              transition: "transform 0.5s ease-out"
            }}
          >
            <div className="w-[904px] h-[328px] bg-[#F6EBD5] flex flex-col items-center justify-center">
              <p className="text-4xl text-[#2A1449] argent mb-15">Deltakelse i 2024</p>

              <div className="flex w-full text-3xl text-[#2A1449]">
                <div className="w-1/3 flex items-center justify-center">Fysisk</div>
                <div className="w-1/3 flex items-center justify-center">Digitalt</div>
                <div className="w-1/3 flex items-center justify-center">Totalt</div>
              </div>

              <div className="flex w-full mt-2 text-6xl text-[#2A1449] iceland">
                <div className="w-1/3 flex items-center justify-center">248</div>
                <div className="w-1/3 flex items-center justify-center">41</div>
                <div className="w-1/3 flex items-center justify-center">289</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Crab */}
        <div 
          className="flex justify-center items-center z-10"
          style={{ 
            marginTop: midContainerMargin, 
            marginBottom: extraNegativeMargin,
            padding: paddingValue,
            transition: "margin 0.5s ease-out, padding 0.5s ease-out"
          }}
        >
          <Image 
            src="/images/Krabbe.svg" 
            alt="Krabbe" 
            width={50 * scale} 
            height={50 * scale}
            style={{ transition: "width 0.5s ease-out, height 0.5s ease-out" }}
          />
        </div>
        
        {/* Container 3 */}
        <div 
          className="w-full flex items-center justify-center"
          style={{ 
            marginTop: negativeMargin, 
            marginBottom: outerNegativeMargin,
            transition: "margin 0.5s ease-out"
          }}
        >
          <div
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: "center center", 
              willChange: "transform",
              transition: "transform 0.5s ease-out"
            }}
            className="flex items-center justify-center"
          >
            <div className="relative -mr-16 w-[484px] h-[424px]">
              <Image 
                src="/images/TommelOpp.svg" 
                alt="forsamling" 
                width={484} 
                height={424} 
                className="absolute top-0 left-0 z-10" 
              />
            </div>
            <div className="w-[480px] h-[484px] bg-[#F6EBD5] flex flex-col items-right justify-center pr-5">
              <p className="text-3xl sm:text-2xl text-[#2A1449] pl-40 sm:pl-30 pr-20 sm:pr-15 text-right">Kode 24</p>
              <p className="text-2xl sm:text-xl text-[#2A1449] pl-30 sm:pl-30 pr-20 sm:pr-15 mt-4 text-right">
                Gjennom historien har deling av kunnskap, erfaringer og kode vært selve motoren for utviklermiljøene.
              </p>
              <div className="mt-10 pl-30 sm:pl-30 pr-20 sm:pr-15 flex justify-end">
                <a 
                  href="https://www.kode24.no/annonse/bytefest-systemutviklernes-woodstock/81547688"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform active:scale-95 hover:opacity-90 cursor-pointer"
                >
                  <Image 
                    src="/images/LesMerOransje.svg" 
                    alt="Les Mer" 
                    width={200} 
                    height={55} 
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-100 xxs:pt-80" />
    </div>
  );
}
