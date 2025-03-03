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
                <Link href="/" className="mb-4 inline-block">
                  <Image 
                    src="/images/SopraSteria.svg" 
                    alt="Bytefest Logo" 
                    width={185} 
                    height={38}
                    className="pt-1"
                  />
                </Link>
                <p className="text-sm text-gray-300 mb-4">
                    We are Sopra Steria
                </p>
                <p className="text-sm text-gray-300">
                    Sopra Steria is a renowned international consulting firm specializing in IT, management, and design. 
                    Our comprehensive service portfolio is one of the most extensive in the market.
                </p>
              </div>
            </div>
            
            {/* Our services column */}
            <div className="flex flex-col md:col-span-3 md:items-center">
              <div className="md:max-w-[85%]">
                <h3 className="text-xl font-medium mb-6">Våre tjenester</h3>
                <div className="flex flex-col space-y-3">
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    PÅMELDING
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    BLI FOREDRAGSHOLDER
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    PROGRAM
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    FOREDRAG
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    OM BYTEFEST
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Links column */}
            <div className="flex flex-col md:col-span-3 md:items-center">
              <div className="md:max-w-[85%]">
                <h3 className="text-xl font-medium mb-6">Lenker</h3>
                <div className="flex flex-col space-y-3">
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    NYHETSROM
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    TIDLIGERE KONFERANSER
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    PARTNERE
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    SPONSORER
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact Us column */}
            <div className="flex flex-col md:col-span-3 md:items-center">
              <div className="md:max-w-[85%]">
                <h3 className="text-xl font-medium mb-6">Kontakt oss</h3>
                <div className="flex flex-col space-y-3">
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    KONTAKTSKJEMA
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    SUPPORT
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    PRESSE
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    JOBB HOS OSS
                  </Link>
                  <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                    PERSONVERN
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social media icons */}
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.674 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a href="#" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
              </svg>
            </a>
            <a href="#" className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#141B33] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
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