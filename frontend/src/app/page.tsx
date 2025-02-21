import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161E38] flex pt-10 sm:pt-15 md:pt-20">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-18">
        <div className="text-left">
          <Image
            src="/images/BytefestText.svg"
            alt="BytefestText"
            width={940}
            height={160}
          />
        </div>
        <div className="text-left argent text-white pt-10 text-2xl sm:text-4xl">
          <a>Mikrokonferansen som dypdykker ned i systemutvikling</a>
        </div>
        <div className="text-left iceland text-white pt-10">
          <a className="text-2xl md:text-4xl lg:text-5xl">5. Januar 2025</a>
          <a className="text-xl md:text-2xl pl-5 sm:pl-10 md:pl-15">16.00 - 21.00</a>
        </div>

        <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-6 sm:gap-x-15 pt-10 sm:pt-10">
          <Image
            src="/images/BliForedragsholder.svg"
            alt="BliForedragsholder"
            width={263}
            height={55}
          />
          <Image
            src="/images/LesMer.svg"
            alt="LesMer"
            width={178}
            height={55}
          />
        </div>
        <div className="flex items-end lg:mt-[-100] mt-20 gap-x-[clamp(300px,calc(300px+((100vw-768px)*400)/512),800px)]">
          <Image
            src="/images/LitenFisk.svg"
            alt="LitenFisk"
            width={78}
            height={58}
          />
          <Image
            src="/images/StorFisk.svg"
            alt="StorFisk"
            width={291}
            height={281}
            className="hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}
