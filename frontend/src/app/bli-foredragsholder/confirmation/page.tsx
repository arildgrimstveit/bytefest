import Link from "next/link";
import Image from "next/image";

export default function ConfirmationPage() {
  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      <div className="w-full max-w-md mx-auto mt-16 sm:mt-8 mb-12 sm:mb-8">
        <div className="relative bg-white p-6 sm:p-8 shadow-lg text-center">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative w-16 sm:w-20 h-16 sm:h-20">
              <Image 
                src="/images/LitenFisk.svg" 
                alt="Bekreftet" 
                width={79}
                height={59}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8 argent">Takk for ditt foredrag!</h1>
          
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/images/Tilbake.svg"
                alt="Tilbake til forsiden"
                width={269}
                height={59}
                style={{ width: '226px', height: 'auto' }}
                className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 