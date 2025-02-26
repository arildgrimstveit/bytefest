import Link from "next/link";
import { Button } from "@/components/ui/button";
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
        
        <h1 className="text-2xl font-bold mb-4">Takk for din søknad!</h1>
        
        <p className="mb-6">
          Din søknad om å bli foredragsholder på Bytefest 2025 er mottatt. 
          Vi vil gjennomgå søknaden din og kontakte deg via e-post innen kort tid.
        </p>
        
        <p className="mb-8 text-sm text-gray-600">
          Hvis du har spørsmål, kan du kontakte oss på 
          <a href="mailto:bytefest@example.com" className="text-blue-500 hover:underline"> bytefest@example.com</a>
        </p>
        
        <Link href="/">
          <Button className="bg-[#00afea] hover:bg-[#0099d1]">
            Tilbake til forsiden
          </Button>
        </Link>
      </div>
    </div>
  );
} 