"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Bytefest() {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const updateScale = () => {
      const scale = window.innerWidth >= 1024 
        ? 1 
        : Math.min(1, Math.max(0.2, window.innerWidth / 1000));
      setScale(scale);
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
  const containerSpacing = scale < 0.8 ? `${-40 * (1 - scale)}px` : '0px';
  const crabSpacing = scale < 0.8 ? `${-40 * (1 - scale)}px` : '0px';
  const speakerContainerSpacing = scale < 0.8 ? `${-400 * (1 - scale)}px` : '0px';  // Much more aggressive for the taller container

  // Calculate responsive paddings with smooth quintic easing
  const crabPadding = () => {
    const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const t = Math.min(1, Math.max(0, (currentWidth - 600) / 1000));
    const easedProgress = t * t * t * (t * (t * 6 - 15) + 10);
    return `${Math.round(20 + 30 * easedProgress)}px`;
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
              width={108}
              height={108}
              className="pb-33 w-[120px] max-[400px]:w-[80px] h-auto transition-all duration-500 ease-out"
              priority
            />
            <Image
              src="/images/StorFisk.svg"
              alt="StorFisk"
              width={288}
              height={281}
              className="pb-5 lg:pb-0 w-[250px] max-[400px]:w-[200px] h-auto transition-all duration-500 ease-out"
              priority
            />
          </div>

          {/* Bytefest text and caption */}
          <div className="flex flex-col items-center lg:items-start px-4 lg:px-0">
            <Image
              src="/images/BytefestTextYellow.svg"
              alt="BytefestTextYellow"
              width={448}
              height={76}
              className="pb-7 w-full max-w-[448px]"
              priority
            />
            <p className="argent text-white text-4xl mt-4 text-center lg:text-left">
              En minikonferanse <br />
              for å dele og lære om <br />
              systemutvikling
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 xs:px-10 sm:px-16 text-white pt-15 lg:pt-20">
          <h2 className="text-2xl lg:text-3xl iceland">Hva er Bytefest?</h2>
          <p className="text-xl mt-4">
            Bytefest er en ettermiddag fylt med interessante foredrag om systemutvikling, 
            og en kveld med sosialisering med kollegene dine. 
          </p>
          <p className="text-xl mt-4">
            Den arrangeres av og for utviklermiljøet i Sopra Steria, 
            og foregår på kontone våre over hele landet, 
            med foredrag som streames mellom byene. 
          </p>
        </div>
      </div>

      {/* Visual elements container */}
      <div className="relative flex flex-col items-center mt-5 md:mt-16 mb-10 md:mb-20">
        {/* Container 1 */}
        <div 
          className="w-full flex items-center justify-center"
          style={{ marginBottom: containerSpacing }}
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
              <p className="text-3xl iceland text-[#2A1449] pr-40 sm:pr-30 pl-20 sm:pl-15">Sosial arena</p>
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
                  style={{ height: 'auto' }}
                />
              </div>
            </div>

            <div className="relative -ml-16 w-[484px] h-[424px]">
              <Image 
                src="/images/Forsamling.webp" 
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
            marginTop: crabSpacing,
            marginBottom: crabSpacing,
            padding: paddingValue,
            transition: "margin 0.5s ease-out, padding 0.5s ease-out"
          }}
        >
          <Image 
            src="/images/Krabbe.svg" 
            alt="Krabbe" 
            width={50 * scale} 
            height={39 * scale}
            style={{ transition: "width 0.5s ease-out, height 0.5s ease-out" }}
          />
        </div>

        {/* Speaker Information Container */}
        <div 
          className="w-full flex items-center justify-center"
          style={{ 
            marginTop: speakerContainerSpacing,
            marginBottom: speakerContainerSpacing,
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
            <div className="w-[904px] h-[1200px] bg-[#F6EBD5] flex flex-col items-start justify-start px-12 py-12 lg:py-12 py-6">
              <p className="text-4xl text-[#2A1449] argent mb-8 lg:mb-8 mb-4 self-center">Bli foredragsholder!</p>
              <p className="text-xl text-[#2A1449] mb-8 lg:mb-8 mb-4 text-left">
                Bytefest er en arena for å dele kunnskap med kolleger. Har du noe du gjerne vil dele?
              </p>

              <div className="space-y-6 lg:space-y-6 space-y-4">
                <div>
                  <h3 className="text-xl text-[#2A1449] iceland font-bold mb-3">Hvem kan holde foredrag?</h3>
                  <p className="text-lg text-[#2A1449]">
                    Alle som jobber i Sopra Steria, uavhengig av nivå, business unit og rolle.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-[#2A1449] iceland font-bold mb-3">Hva slags foredrag vi ønsker oss?</h3>
                  <p className="text-lg text-[#2A1449]">
                    Vi ønsker oss alle typer foredrag som har med utvikling å gjøre, om dette er low-code, no-code, fullstack, java, react, tips og triks, AI, azure, apps, dps, designdreven utvikling eller lignende.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-[#2A1449] iceland font-bold mb-3">Lengde</h3>
                  <p className="text-lg text-[#2A1449]">
                    Foredragene kan være av forskjellige lengder. I programmet har vi rom for foredrag på 10, 20, 30 eller 45 minutter. Tenk over hvor lang tid du trenger til å si det du vil. Planlegg heller for å bruke mindre tid enn å treffe helt på tiden. Da har du tid til et spørsmål eller to også.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-[#2A1449] iceland font-bold mb-3">Forkunnskaper</h3>
                  <p className="text-lg text-[#2A1449] mb-3">
                    Tenk over hvilke forkunnskaper du forventer av de som hører på. Hvilken av disse kategoriene snakker du til?
                  </p>
                  <ul className="list-disc pl-6 text-lg text-[#2A1449] space-y-2">
                    <li>Har knapt hørt om systemutvikling</li>
                    <li>Kjenner til hva systemutvikling er og vil gjerne forstå hvordan det er relevant for sitt fagfelt</li>
                    <li>Jobber med systemutvikling og vil ha påfyll av kunnskap</li>
                    <li>Har jobbet med systemutvikling i lang tid og nerder gjerne intenst på detaljer</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl text-[#2A1449] iceland font-bold mb-3">Hybride foredrag</h3>
                  <p className="text-lg text-[#2A1449]">
                    Foredragene vil foregå på de ulike lokasjonene og streames over Teams.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-[#2A1449] iceland font-bold mb-3">Hva er fristen for å sende inn forslag til foredrag?</h3>
                  <p className="text-lg text-[#2A1449]">
                    10. april klokken 23.59.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-[#2A1449] iceland font-bold mb-3">Spørsmål?</h3>
                  <p className="text-lg text-[#2A1449]">
                    Kontakt oss på <a href="mailto:bytefest@soprasteria.com" className="hover:underline">bytefest@soprasteria.com</a>.
                  </p>
                </div>

                <div className="mt-9">
                <Link href="/bli-foredragsholder" className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer">
                  <Image
                    src="/images/BliForedragsholder.svg"
                    alt="BliForedragsholder"
                    width={263}
                    height={55}
                    style={{ height: 'auto' }}
                  />
                </Link>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Second Crab */}
        <div 
          className="flex justify-center items-center z-10"
          style={{ 
            marginTop: crabSpacing,
            marginBottom: crabSpacing,
            padding: paddingValue,
            transition: "margin 0.5s ease-out, padding 0.5s ease-out"
          }}
        >
          <Image 
            src="/images/Krabbe.svg" 
            alt="Krabbe" 
            width={50 * scale} 
            height={39 * scale}
            style={{ transition: "width 0.5s ease-out, height 0.5s ease-out" }}
          />
        </div>
        
        {/* Container 2 */}
        <div 
          className="w-full flex items-center justify-center"
          style={{ 
            marginTop: containerSpacing,
            marginBottom: containerSpacing,
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
            <div className="w-[904px] h-[428px] bg-[#F6EBD5] flex flex-col items-center justify-center">
              <p className="text-4xl text-[#2A1449] argent mb-8">Deltakelse i 2024</p>
              <p className="text-xl text-[#2A1449] text-center mb-8 px-12">
                I fjor foregikk Bytefest på 8 fysiske Sopra Steria-lokasjoner rundt i landet. Nesten 300 deltakere var med på minikonferansen. Noen av temaene deltakerne kunne bryne seg på i fjor var Kubernetes og pipelines, kodekvalitet, hvordan lage egen GPT, kryssplatform mobilutvikling med React Native og .NET MAUI med mer.
              </p>

              <div className="flex w-full text-3xl argent text-[#2A1449]">
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
        
        {/* Third Crab */}
        <div 
          className="flex justify-center items-center z-10"
          style={{ 
            marginTop: crabSpacing,
            marginBottom: crabSpacing,
            padding: paddingValue,
            transition: "margin 0.5s ease-out, padding 0.5s ease-out"
          }}
        >
          <Image 
            src="/images/Krabbe.svg" 
            alt="Krabbe" 
            width={50 * scale} 
            height={39 * scale}
            style={{ transition: "width 0.5s ease-out, height 0.5s ease-out" }}
          />
        </div>
        
        {/* Container 3 */}
        <div 
          className="w-full flex items-center justify-center"
          style={{ 
            marginTop: containerSpacing,
            marginBottom: containerSpacing,
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
                src="/images/TommelOpp.webp" 
                alt="Tommel opp" 
                width={484} 
                height={425} 
                style={{ height: 'auto' }}
              />
            </div>
            <div className="w-[480px] h-[484px] bg-[#F6EBD5] flex flex-col items-right justify-center pr-5">
              <p className="text-3xl text-[#2A1449] iceland pl-40 sm:pl-30 pr-20 sm:pr-15 text-right">Bytefest i Kode 24</p>
              <p className="text-2xl sm:text-xl text-[#2A1449] pl-30 sm:pl-30 pr-20 sm:pr-15 mt-4 text-right">
                Gjennom historien har deling av kunnskap, erfaringer og kode vært selve motoren for utviklermiljøene.
              </p>
              <p className="text-lg text-[#2A1449] pl-30 sm:pl-30 pr-20 sm:pr-15 mt-4 text-right italic">
                - Kjell Rusti
              </p>
              <div className="mt-10 pl-30 sm:pl-30 pr-20 sm:pr-15 flex justify-end">
                <a 
                  href="https://www.kode24.no/annonse/bytefest-systemutviklernes-woodstock/81547688"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
                >
                  <Image 
                    src="/images/LesMerOransje.svg" 
                    alt="Les Mer" 
                    width={209} 
                    height={56} 
                    style={{ height: 'auto' }}
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
