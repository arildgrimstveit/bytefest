"use client";

import Image from "next/image";
import Link from "next/link";

export default function Bytefest() {
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
          <h2 className="text-2xl lg:text-3xl iceland font-bold">Hva er Bytefest?</h2>
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
      <div className="relative flex flex-col items-center mt-15">
        {/* Container 1 - First white box and image */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center mx-5 sm:mx-12">
            <div className="bg-[#F6EBD5] w-full lg:w-[480px] py-10 px-8 lg:h-[484px] lg:flex lg:flex-col lg:justify-center lg:pl-5 lg:pr-0">
              <p className="text-2xl md:text-3xl iceland font-bold text-[#2A1449] lg:pl-15">Sosial arena</p>
              <p className="text-lg md:text-xl text-[#2A1449] mt-4 lg:pr-30 lg:pl-15">
                Bytefest har fokus på læring, deling og det sosiale.
                Her får du mulighet til å utveksle erfaringer, lære nye 
                teknologier og bygge nettverk.
              </p>
              <div className="mt-10 lg:pl-15">
                <Image 
                  src="/images/PaameldingKommer.svg" 
                  alt="Påmelding Kommer" 
                  width={226} 
                  height={44} 
                  style={{ height: 'auto' }}
                />
              </div>
            </div>

            <div className="relative w-full lg:w-[484px] lg:-ml-16 mt-6 lg:mt-0">
              <Image 
                src="/images/Forsamling.webp" 
                alt="forsamling" 
                width={484} 
                height={424}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* First Crab */}
        <div className="flex justify-center items-center z-10 my-12 md:my-16">
          <Image 
            src="/images/Krabbe.svg" 
            alt="Krabbe" 
            width={50} 
            height={39}
          />
        </div>

        {/* Speaker Information Container */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center mx-5 sm:mx-12">
            <div className="bg-[#F6EBD5] w-full lg:max-w-[900px] py-10 px-6 md:px-12">
              <p className="text-3xl md:text-4xl text-[#2A1449] argent mb-6 md:mb-8 text-center">Bli foredragsholder!</p>
              <p className="text-lg md:text-xl text-[#2A1449] mb-6 md:mb-8 text-left">
                Bytefest er en arena for å dele kunnskap med kolleger. Har du noe du gjerne vil dele?
              </p>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl text-[#2A1449] iceland font-bold mb-2 md:mb-3">Hvem kan holde foredrag?</h3>
                  <p className="text-base md:text-lg text-[#2A1449]">
                    Alle som jobber i Sopra Steria, uavhengig av nivå, business unit og rolle.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-[#2A1449] iceland font-bold mb-2 md:mb-3">Hva slags foredrag vi ønsker oss?</h3>
                  <p className="text-base md:text-lg text-[#2A1449]">
                    Vi ønsker oss alle typer foredrag som har med utvikling å gjøre, om dette er low-code, no-code, fullstack, java, react, tips og triks, AI, azure, apps, dps, designdreven utvikling eller lignende.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-[#2A1449] iceland font-bold mb-2 md:mb-3">Lengde</h3>
                  <p className="text-base md:text-lg text-[#2A1449]">
                    Foredragene kan være av forskjellige lengder. I programmet har vi rom for foredrag på 10, 20, 30 eller 45 minutter. Tenk over hvor lang tid du trenger til å si det du vil. Planlegg heller for å bruke mindre tid enn å treffe helt på tiden. Da har du tid til et spørsmål eller to også.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-[#2A1449] iceland font-bold mb-2 md:mb-3">Forkunnskaper</h3>
                  <p className="text-base md:text-lg text-[#2A1449] mb-2 md:mb-3">
                    Tenk over hvilke forkunnskaper du forventer av de som hører på. Hvilken av disse kategoriene snakker du til?
                  </p>
                  <ul className="list-disc pl-6 text-base md:text-lg text-[#2A1449] space-y-1 md:space-y-2">
                    <li>Har knapt hørt om systemutvikling</li>
                    <li>Kjenner til hva systemutvikling er og vil gjerne forstå hvordan det er relevant for sitt fagfelt</li>
                    <li>Jobber med systemutvikling og vil ha påfyll av kunnskap</li>
                    <li>Har jobbet med systemutvikling i lang tid og nerder gjerne intenst på detaljer</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-[#2A1449] iceland font-bold mb-2 md:mb-3">Hybride foredrag</h3>
                  <p className="text-base md:text-lg text-[#2A1449]">
                    Foredragene vil foregå på de ulike lokasjonene og streames over Teams.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-[#2A1449] iceland font-bold mb-2 md:mb-3">Hva er fristen for å sende inn forslag til foredrag?</h3>
                  <p className="text-base md:text-lg text-[#2A1449]">
                    10. april klokken 23.59.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-[#2A1449] iceland font-bold mb-2 md:mb-3">Spørsmål?</h3>
                  <p className="text-base md:text-lg text-[#2A1449]">
                    Kontakt oss på <a href="mailto:bytefest@soprasteria.com" className="hover:underline">bytefest@soprasteria.com</a>.
                  </p>
                </div>

                <div className="mt-6 md:mt-9 flex justify-start">
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
        <div className="flex justify-center items-center z-10 my-12 md:my-16">
          <Image 
            src="/images/Krabbe.svg" 
            alt="Krabbe" 
            width={50} 
            height={39}
          />
        </div>
        
        {/* Container 2 - Stats box */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center mx-5 sm:mx-12">
            <div className="bg-[#F6EBD5] w-full lg:max-w-[900px] py-10 px-6 md:px-12">
              <p className="text-3xl md:text-4xl text-[#2A1449] argent mb-6 md:mb-8 text-center">Deltakelse i 2024</p>
              <p className="text-lg md:text-xl text-[#2A1449] text-center mb-6 md:mb-8 px-4 md:px-12">
                I fjor foregikk Bytefest på 8 fysiske Sopra Steria-lokasjoner rundt i landet. Nesten 300 deltakere var med på minikonferansen. Noen av temaene deltakerne kunne bryne seg på i fjor var Kubernetes og pipelines, kodekvalitet, hvordan lage egen GPT, kryssplatform mobilutvikling med React Native og .NET MAUI med mer.
              </p>

              <div className="flex w-full text-xl md:text-3xl argent text-[#2A1449]">
                <div className="w-1/3 flex items-center justify-center">Fysisk</div>
                <div className="w-1/3 flex items-center justify-center">Digitalt</div>
                <div className="w-1/3 flex items-center justify-center">Totalt</div>
              </div>

              <div className="flex w-full mt-2 text-4xl md:text-6xl text-[#2A1449] iceland">
                <div className="w-1/3 flex items-center justify-center">248</div>
                <div className="w-1/3 flex items-center justify-center">41</div>
                <div className="w-1/3 flex items-center justify-center">289</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Third Crab */}
        <div className="flex justify-center items-center z-10 my-12 md:my-16">
          <Image 
            src="/images/Krabbe.svg" 
            alt="Krabbe" 
            width={50} 
            height={39}
          />
        </div>
        
        {/* Container 3 - Last box and image */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center mx-5 sm:mx-12">
            <div className="relative w-full lg:w-[484px] lg:-mr-16 mt-6 lg:mt-0">
              <Image 
                src="/images/TommelOpp.webp" 
                alt="Tommel opp" 
                width={484} 
                height={425}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-[#F6EBD5] w-full lg:w-[480px] py-10 px-8 lg:h-[484px] lg:flex lg:flex-col lg:justify-center lg:pr-5 lg:pl-0">
              <p className="text-2xl md:text-3xl iceland font-bold text-[#2A1449] text-left lg:text-right lg:pr-15">Bytefest i Kode 24</p>
              <p className="text-lg md:text-xl text-[#2A1449] mt-4 text-left lg:text-right lg:pl-30 lg:pr-15">
                Gjennom historien har deling av kunnskap, erfaringer og kode vært selve motoren for utviklermiljøene.
              </p>
              <p className="text-base md:text-lg text-[#2A1449] mt-4 text-left lg:text-right lg:pl-30 lg:pr-15 italic">
                - Kjell Rusti
              </p>
              <div className="mt-10 flex justify-start lg:justify-end lg:pl-30 lg:pr-15">
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
    </div>
  );
}
