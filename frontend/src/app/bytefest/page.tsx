import Image from "next/image";

export default function Bytefest() {
  return (
    <div className="min-h-screen bg-[#161E38]">
      {/* Use items-center for mobile and switch on medium screens if needed */}
      <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center pt-10 lg:pt-20 space-y-8 lg:space-y-0 lg:space-x-12">
        
        {/* Left section: Year and Fish together */}
        <div className="flex items-center justify-center space-x-4">
          <Image
            className="pb-30"
            src="/images/Year25.svg"
            alt="Year25"
            width={120}
            height={120}
          />
          <Image
            className="pb-5 lg:pb-0"
            src="/images/StorFisk.svg"
            alt="StorFisk"
            width={250}
            height={281}
          />
        </div>

        {/* Right section: Bytefest text SVG and caption below it */}
        <div className="flex flex-col items-center lg:items-start">
          <Image
            className="pb-7"
            src="/images/BytefestTextYellow.svg"
            alt="BytefestTextYellow"
            width={460}
            height={160}
          />
          <a className="argent text-white text-4xl mt-4 text-center lg:text-left">
            Et nytt år og nye myligheter <br /> for å dele og lære om <br /> systemutvikling
          </a>
        </div>
      </div>


      <div className="px-15 md:px-40 xl:px-80 text-white pt-10 lg:pt-20">
          <a className="text-2xl lg:text-3xl iceland">Hva er bytefest?</a>
          <br /> <br />
          <a className="text-xl">Bytefest er en miktokonferanse med fokus på fag og mye gøy!
            Den foregår på Sopra Sterias kontorer rundt omkring i landet - noen live, og noen digitalt.
            <br /> <br />
            I fjor var det åtte fysiske lokasjoner spredt rundt i landet,
            og nesten 300 deltakere deltok på minikonferansen,
            som ble holdt av og for utviklermiljøet i Sopra Steria.
            Noen av temaene deltakerne kunne bryne seg på i fjor var Kubernetes og pipelines,
            kodekvalitet, hvordan lage egen GPT,
            kryssplatform mobilutvikling med React Native og .NET MAUI med mer. </a>

        </div>

    </div>
  );
}
