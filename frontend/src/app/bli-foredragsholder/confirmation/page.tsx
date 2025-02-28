import Link from "next/link";
import Image from "next/image";

export default function ConfirmationPage() {
  return (
    <div className="bg-[#161E38] flex flex-col items-center justify-start py-16 sm:py-24 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 text-center">
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
        Vi har mottatt dit foredrag og vil  gå igjennom alle foredrag innen..  
        Du kan forvente å få svar om du skal stille som foredragsholder innen ... 
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
              className="hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </div>
  );
} 