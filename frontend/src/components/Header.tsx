"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when resizing to >=lg screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white lg:px-15 py-4 pb-6 relative shadow-[0_4px_6px_rgba(0,0,0,0.1)] min-h-[99px]">
      {/* Hamburger Menu Button (☰ / ✖) */}
      <button
        className="lg:hidden flex items-center justify-center w-10 h-16 z-20 absolute top-4 left-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Logo */}
      <div className="flex flex-grow items-center">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 z-10 lg:static lg:translate-x-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/BytefestLogo.svg"
              alt="Bytefest Logo"
              width={150}
              height={50}
              priority
              className="mt-[-5px] lg:mt-[-20px]"
            />
          </Link>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`absolute top-full left-0 w-full bg-white transition-all duration-200 
          lg:static lg:w-auto lg:flex lg:justify-center lg:space-x-8 text-[#2A1449] 
          ${isOpen ? "relative block pt-10 mb-[-20]" : "hidden"}`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:pt-3 space-y-3 lg:space-y-0 lg:space-x-8 p-6 lg:p-0">
          {[
            { name: "PÅMELDING", path: "/" },
            { name: "BYTEFEST", path: "/about" },
            { name: "ALLE FOREDRAG", path: "/talks" },
            { name: "PROGRAM", path: "/program" },
          ].map(({ name, path }) => (
            <Link key={path} href={path} className="relative flex items-center group px-2 py-3">
              <div
                className={`absolute left-0 right-0 transition-all duration-50 
                  ${pathname === path ? "bg-[#F8F5D3] lg:border-b-4 lg:border-[#C16800]" : "group-hover:bg-gray-100"}
                  lg:inset-y-[-24px] lg:left-[-16px] lg:right-[-16px]
                  ${isOpen ? "inset-y-[-6] border-none" : ""}`}
              ></div>
              <span className="relative z-10 text-[#2A1449] group-hover:text-[#2A1449]">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Login */}
      <div className="hidden lg:flex flex-grow justify-end flex-shrink-0 space-x-4 lg:pt-3">
        <Link href="/login" className="relative flex items-center group px-2 py-3">
          <div
            className={`absolute inset-y-[-24px] left-[-16px] right-[-16px] transition-all duration-50 
              ${pathname === "/login" ? "bg-[#F8F5D3] border-b-4 border-[#C16800]" : "group-hover:bg-gray-100"}`}
          ></div>
          <span className="relative z-10 text-[#2A1449] group-hover:text-[#2A1449]">
            LOGG INN
          </span>
        </Link>

        {/* Search */}
        <Link href="/search" className="relative flex items-center justify-center group px-4 py-3">
          <div
            className={`absolute inset-y-[-24px] left-0 right-0 transition-all duration-50 
              ${pathname === "/search" ? "bg-[#F8F5D3] border-b-4 border-[#C16800]" : "group-hover:bg-gray-100"}`}
          ></div>
          <Image
            src="/images/MagnifyingGlass.svg"
            alt="Search"
            width={24}
            height={24}
            className="relative z-10 group-hover:opacity-80"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
