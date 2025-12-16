import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex pt-10 sm:pt-15 md:pt-20 min-h-[calc(100vh-450px)]">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-18 pb-10">
        <div className="text-left">
          <Image
            src="/images/BytefestText.svg"
            alt="BytefestText"
            width={936}
            height={159}
            priority
            style={{ width: '940px', height: 'auto' }}
          />
        </div>

        <div className="text-left argent text-white pt-20 text-xl sm:text-7xl">
          <a>Bytefest med venner</a>
        </div>
        <div className="text-left iceland text-yellow-500 pt-10 text-2xl sm:text-4xl">
          <a className="text-2xl md:text-4xl lg:text-7xl">19. Mars 2026</a>
        </div>
        <div className="text-left argent text-white pt-10 text-2xl sm:text-7xl">
          <a>Vi søker foredragsholdere!</a>
        </div>
        <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-6 sm:gap-x-15 pt-10 sm:pt-10">
          <Link href="https://sessionize.com/bytefest" className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/sendInn.svg"
              alt="Delta digitalt"
              width={263}
              height={55}
              style={{ height: 'auto' }}
            />
          </Link>

        </div>
        <div className="text-left argent text-white pt-20 text-xl sm:text-2xl">
          <a>Ny side med nytt desing er på vei, enn så lenge kan du jo ta en titt på fjorårets foredrag, tabben ALLE FOREDRAG </a>
        </div>
        <div className="flex items-end lg:mt-[-100] mt-20 gap-x-[clamp(300px,calc(300px+((100vw-768px)*400)/512),800px)]">
          <Image
            src="/images/LitenFisk.svg"
            alt="LitenFisk"
            width={79}
            height={59}
            style={{ height: 'auto' }}
          />
          <Image
            src="/images/StorFisk.svg"
            alt="StorFisk"
            width={288}
            height={281}
            style={{ width: '291px', height: 'auto' }}
            className="hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}