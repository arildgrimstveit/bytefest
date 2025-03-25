import Link from 'next/link';
import Image from 'next/image';
import KelpForest from './KelpForest';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <div className="relative">
        <KelpForest />
      </div>
      <footer className="bg-[#141B33] text-white pt-15 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Top section with logo and columns */}
          <div className="flex flex-col md:flex-row justify-center gap-16 lg:gap-28 mb-15">
            {/* Logo and description */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
              <Image 
                src="/images/SopraSteria.svg" 
                alt="Sopra Steria Logo" 
                width={180} 
                height={23}
                style={{ width: '185px', height: 'auto' }}
                className="pt-1"
              />
              <p className="text-sm text-gray-300 mb-4 mt-4">
                The world is how we shape it
              </p>
              <p className="text-sm text-gray-300 max-w-[240px]">
                Norges ledende konsulentselskap innen digitalisering, innovasjon og bærekraft. 
                En del av Sopra Steria-gruppen med 51 000 ansatte i nesten 30 land.
              </p>
            </div>
            
            {/* Navigation column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-xl font-medium mb-6">Navigasjon</h3>
              <div className="flex flex-col space-y-3">
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  PÅMELDING
                </Link>
                <Link href="/bytefest" className="text-sm text-gray-300 hover:text-white transition-colors">
                  OM BYTEFEST
                </Link>
                <Link href="/program" className="text-sm text-gray-300 hover:text-white transition-colors">
                  PROGRAM
                </Link>
                <Link href="/talks" className="text-sm text-gray-300 hover:text-white transition-colors">
                  FOREDRAG
                </Link>
              </div>
            </div>
            
            {/* Information column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-xl font-medium mb-6">Informasjon</h3>
              <div className="flex flex-col space-y-3">
                <Link href="/bli-foredragsholder" className="text-sm text-gray-300 hover:text-white transition-colors">
                  BLI FOREDRAGSHOLDER
                </Link>
                <Link href="/personvernerklaering" className="text-sm text-gray-300 hover:text-white transition-colors">
                  PERSONVERNERKLÆRING
                </Link>
                <a href="mailto:bytefest@soprasteria.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                  EPOST
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © Sopra Steria {currentYear}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer; 