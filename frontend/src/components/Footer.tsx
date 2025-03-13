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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-15">
            {/* Logo and description */}
            <div className="flex flex-col md:col-span-3 md:pr-4">
              <div className="md:max-w-[85%]">
                <Link href="https://www.soprasteria.no/home" className="mb-4 inline-block">
                  <Image 
                    src="/images/SopraSteria.svg" 
                    alt="Bytefest Logo" 
                    width={180} 
                    height={23}
                    style={{ width: '185px', height: 'auto' }}
                    className="pt-1"
                  />
                </Link>
                <p className="text-sm text-gray-300 mb-4">
                  The world is how we shape it
                </p>
                <p className="text-sm text-gray-300">
                  Norges ledende konsulentselskap innen digitalisering, innovasjon og bærekraft. 
                  En del av Sopra Steria-gruppen med 51 000 ansatte i nesten 30 land.
                </p>
              </div>
            </div>
            
            {/* Our services column */}
            <div className="flex flex-col md:col-span-3 md:items-center">
              <div className="md:max-w-[85%]">
                <h3 className="text-xl font-medium mb-6">Våre tjenester</h3>
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
                  <Link href="/bli-foredragsholder" className="text-sm text-gray-300 hover:text-white transition-colors">
                    BLI FOREDRAGSHOLDER
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Links column */}
            <div className="flex flex-col md:col-span-3 md:items-center">
              <div className="md:max-w-[85%]">
                <h3 className="text-xl font-medium mb-6">Lenker</h3>
                <div className="flex flex-col space-y-3">
                  <Link href="https://www.soprasteria.no/footer/nyheter?year=2025" className="text-sm text-gray-300 hover:text-white transition-colors">
                    NYHETER
                  </Link>
                  <Link href="https://www.soprasteria.no/vi-mener?year=2025&expertise=all&expert=all" className="text-sm text-gray-300 hover:text-white transition-colors">
                    VI MENER
                  </Link>
                  <Link href="https://www.soprasteria.no/footer/nettstedkart" className="text-sm text-gray-300 hover:text-white transition-colors">
                    NETTSTEDKART
                  </Link>
                  <Link href="https://www.soprasteria.no/footer/personvernerklaering" className="text-sm text-gray-300 hover:text-white transition-colors">
                    PERSONVERNERKLÆRING
                  </Link>
                  <Link href="https://www.soprasteria.no/footer/tilgjengelighetserklaering" className="text-sm text-gray-300 hover:text-white transition-colors">
                    TILGJENGELIGHETSERKLÆRING
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact Us column */}
            <div className="flex flex-col md:col-span-3 md:items-center">
              <div className="md:max-w-[85%]">
                <h3 className="text-xl font-medium mb-6">Kontakt oss</h3>
                <div className="flex flex-col space-y-3">
                  <Link href="mailto:bytefest@soprasteria.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                    EPOST
                  </Link>
                  <Link href="https://www.soprasteria.no/kontakt-oss" className="text-sm text-gray-300 hover:text-white transition-colors">
                    SUPPORT
                  </Link>
                  <Link href="https://www.soprasteria.no/hvem-er-vi" className="text-sm text-gray-300 hover:text-white transition-colors">
                    HVEM ER VI
                  </Link>
                  <Link href="https://www.soprasteria.no/dette-kan-vi" className="text-sm text-gray-300 hover:text-white transition-colors">
                    DETTE GJØR VI
                  </Link>
                  <Link href="https://www.soprasteria.no/bli-en-av-oss" className="text-sm text-gray-300 hover:text-white transition-colors">
                    BLI EN AV OSS
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social media icons */}
          <div className="flex justify-center space-x-4 mb-6">
            <a href="https://www.facebook.com/soprasteria.no" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://x.com/SopraSteria" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.674 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/soprasteria/" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://www.instagram.com/soprasteria_no/" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/user/SteriaNorway" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
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