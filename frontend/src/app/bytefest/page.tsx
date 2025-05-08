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
        <div className="px-5 sm:px-16 text-white pt-15 lg:pt-20">
          <h2 className="text-2xl lg:text-3xl iceland font-bold">Hva er Bytefest?</h2>
          <p className="text-xl mt-4">
            Bytefest er en ettermiddag fylt med interessante foredrag om systemutvikling,
            og en kveld med sosialisering med kollegene dine.
          </p>
          <p className="text-xl mt-4">
            Minikonferansen holdes 5.juni 2025 fra 16.00-23.00.
            Den foregår på Sopra Steria-kontorer over hele landet,
            med foredrag som streames mellom byene.
          </p>
        </div>
      </div>

      {/* Visual elements container */}
      <div className="relative flex flex-col items-center mt-15">
        {/* Container 1 - First white box and image */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center mx-1 sm:mx-12">
            <div className="bg-[#F6EBD5] w-full lg:w-[480px] py-10 px-8 lg:h-[484px] lg:flex lg:flex-col lg:justify-center lg:pl-5 lg:pr-0">
              <p className="text-2xl md:text-3xl iceland font-bold text-[#2A1449] lg:pl-15">Sosial arena</p>
              <p className="text-lg md:text-xl text-[#2A1449] mt-4 lg:pr-30 lg:pl-15">
                Bytefest har fokus på læring, deling og det sosiale.
                Her får du mulighet til å utveksle erfaringer, lære nye
                teknologier og bygge nettverk.
              </p>
              <div className="mt-10 lg:pl-15">
                <Link
                  href="/paamelding"
                  className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
                >
                  <Image
                    src="/images/MeldDegPaa.svg"
                    alt="Meld deg på"
                    width={263}
                    height={55}
                    style={{ height: 'auto' }}
                  />
                </Link>
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

        {/* Crab */}
        <div className="flex justify-center items-center z-10 my-12 md:my-16">
          <Image
            src="/images/Krabbe.svg"
            alt="Krabbe"
            width={50}
            height={39}
          />
        </div>

        {/* Description 2*/}
        <div className="max-w-5xl mx-auto mt-[-20]">
          <div className="px-5 sm:px-16 text-white">
            <h2 className="text-2xl lg:text-3xl iceland font-bold">Spennende foredrag</h2>
            <p className="text-xl mt-4">
              På Bytefest får du dypdykke i systemutvikling.
              Kompetente kolleger fra ulike fagbakgrunner vil holde spennende foredrag om temaer som vibe coding, AI, arkitektur, .NET, OpenAPI og mer.
              Se oversikten over <Link href="/talks" className="underline hover:cursor-pointer">alle foredrag.</Link>
            </p>
            <p className="text-xl mt-4">
              I oversikten kan du stjernemerke foredrag du har lyst til å gå på.
              Det gjør det enkelt for deg å finne dem igjen.
              I tillegg hjelper du oss å planlegge hvilke foredrag som trenger mer plass enn andre.
            </p>
          </div>
        </div>

        {/* Description 3*/}
        <div className="max-w-5xl mx-auto mt-15">
          <div className="px-5 sm:px-16 text-white">
            <h2 className="text-2xl lg:text-3xl iceland font-bold">Hvordan gjennomføres Bytefest forskjellige steder?</h2>
            <p className="text-xl mt-4">
              Bytefest arrangeres på Sopra Sterias kontorer i Norge og Danmark.
              De fleste foredragene blir holdt i Oslo og streames til de andre kontorene,
              men vi streamer fra flere andre byer også.
            </p>
            <p className="text-xl mt-4">
              Programmet er lagt opp i fire spor, og vil vises i fire ulike rom på hvert sted.
              Detaljert program kommer nærmere arrangementet.
            </p>
            <p className="text-xl mt-4">
              Bytefest er et både faglig og sosialt arrangement.
              Etter foredragene blir det gode muligheter til å bli bedre kjent med kollegene dine og å bli kjent med nye.
              Det er opp til folk på hvert kontor å planlegge noe sosialt.
            </p>
          </div>
        </div>

        {/* Description 4*/}
        <div className="max-w-5xl mx-auto mt-15">
          <div className="px-5 sm:px-16 text-white">
            <h2 className="text-2xl lg:text-3xl iceland font-bold">Mat og drikke?</h2>
            <p className="text-xl mt-4">
              Vi byr på mat som en start på Bytefest,
              i tillegg til drikke og snacks utover kvelden.
              I påmeldingsskjemaet får du mulighet til å gi beskjed om hvilke behov du har med tanke på mat.
              Send oss en e-post hvis du har behov som ikke dekkes i skjemaet.
            </p>
          </div>
        </div>

        {/* Crab */}
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
          <div className="flex flex-col items-center justify-center mx-1 sm:mx-12">
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

        {/* Crab */}
        <div className="flex justify-center items-center z-10 my-12 md:my-16">
          <Image
            src="/images/Krabbe.svg"
            alt="Krabbe"
            width={50}
            height={39}
          />
        </div>

        {/* Description 5*/}
        <div className="max-w-5xl mx-auto my-[-20]">
          <div className="px-5 sm:px-16 text-white">
            <h2 className="text-2xl lg:text-3xl iceland font-bold">Vil du hjelpe til?</h2>
            <p className="text-xl mt-4">
              Vi trenger hjelp til å arrangere Bytefest på de ulike lokasjonene.
              Spesifikt trenger vi hjelp til:
            </p>
            <p className="text-xl mt-4">
              <strong className="iceland">Streaming</strong>
              <br />
              Foredragene skal streames mellom kontorene. Vi trenger folk til å sørge for at det skjer i Oslo, Kristiansand, Stavanger, Bergen, Trondheim.
            </p>
            <p className="text-xl mt-4">
              <strong className="iceland">Praktisk hjelp</strong>
              <br />
              Vi trenger folk til å hjelpe til med praktiske ting som å bestille og hente mat og drikke.
            </p>
            <p className="text-xl mt-4">
              <strong className="iceland">Planlegge og gjennomføre sosialt program</strong>
              <br />
              Vi trenger folk som vil planlegge årets fest. Hver lokasjon står fritt til å planlegge sitt sosiale program.
            </p>
            <p className="text-xl mt-4">
              <strong className="iceland">Ja, jeg vil hjelpe til!</strong>
              <br />
              Supert! Send en e-post til bytefest@soprasteria.com, så setter vi deg i gang. Få gjerne med deg noen andre fra ditt kontor!
            </p>
          </div>
        </div>

        {/* Crab */}
        <div className="flex justify-center items-center z-10 my-12 md:my-16">
          <Image
            src="/images/Krabbe.svg"
            alt="Krabbe"
            width={50}
            height={39}
          />
        </div>

        {/* Container 3 */}
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center mx-1 sm:mx-12">
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
