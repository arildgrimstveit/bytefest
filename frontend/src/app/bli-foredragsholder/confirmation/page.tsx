import Link from "next/link";
import Image from "next/image";

export default function ConfirmationPage() {
  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      <div className="w-full max-w-4xl mx-auto my-8 relative">
        <div className="relative bg-white p-6 sm:p-8 shadow-lg px-4 sm:px-6 sm:px-10 md:px-20 break-words">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Takk for ditt foredrag</h1>
          
          <div className="space-y-6 mx-5 sm:mx-0">
            <p>Vi har mottatt forslaget ditt til foredrag. Takk!</p>
            
            <p>Vi vil gå igjennom alle foredrag etter at fristen for å sende inn forslag går ut 23. april. Deretter sender vi ut svar fortløpende om hvilke foredrag som får plass på programmet.</p>
            
            <div className="flex justify-start mt-8">
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
        
        <div className="absolute bottom-0 right-0 transform translate-y-1/2">
          <Image
            src="/images/StorFisk.svg"
            alt="Stor fisk"
            width={220.87}
            height={213}
            className="h-auto object-contain scale-[0.9] hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
} 