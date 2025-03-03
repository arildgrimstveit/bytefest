import Link from "next/link";
import Image from "next/image";

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-[calc(100vh-99px)] items-center justify-center -mt-[99px] pt-[99px]">
      <div className="w-full max-w-md mx-auto my-8">
        <div className="relative bg-white p-8 shadow-lg text-center">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <Image 
                src="/images/LitenFisk.svg" 
                alt="Bekreftet" 
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4 argent">Takk for ditt foredrag!</h1>
          
          <p className="mb-6">
          Vi har mottatt ditt foredrag og vil gå igjennom alle foredrag innen ...  
          Du kan forvente å få svar om du skal stille som foredragsholder på epost innen ... 
          </p>
          
          <p className="mb-8 text-sm text-gray-600">
            Hvis du har spørsmål, kan du kontakte oss på 
            <a href="mailto:bytefest@example.com" className="text-blue-500 hover:underline"> bytefest@example.com</a>
          </p>
          
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/images/Tilbake.svg"
                alt="Tilbake til forsiden"
                width={226}
                height={44}
                className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 