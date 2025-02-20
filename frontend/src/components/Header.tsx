"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types/navItem";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainNavItems: NavItem[] = [
    { name: "PÅMELDING", path: "/" },
    { name: "BYTEFEST", path: "/about" },
    { name: "ALLE FOREDRAG", path: "/talks" },
    { name: "PROGRAM", path: "/program" },
    { name: "LOGG INN", path: "/login" },
    { name: "SEARCH", path: "/search", icon: true },
  ];

  const renderNavLink = (item: NavItem) => {
    const isActive = pathname === item.path;
    const linkClasses = `relative flex items-center ${item.icon ? "justify-center" : ""} py-3 pt-6 group`;
    const overlayClasses = `absolute left-0 right-0 transition-all duration-200 ${
      isActive
        ? "bg-[#F8F5D3] lg:border-b-4 lg:border-[#C16800]"
        : "group-hover:bg-gray-100"
    } lg:inset-y-[-24px] lg:left-[-16px] lg:right-[-16px] ${isOpen ? "inset-y-[-6] border-none" : ""}`;
    return (
      <Link key={item.path} href={item.path} className={linkClasses} onClick={() => setIsOpen(false)}>
        <div className={overlayClasses} />
        {item.icon ? (
          <Image
            src="/images/MagnifyingGlass.svg"
            alt="Search"
            width={24}
            height={24}
            className="relative z-10 group-hover:opacity-80"
          />
        ) : (
          <span className="relative z-10 text-[#2A1449] group-hover:text-[#2A1449]">{item.name}</span>
        )}
      </Link>
    );
  };

  const renderMobileNavLink = (item: NavItem) => {
    const isActive = pathname === item.path;
    return (
      <Link
        key={item.path}
        href={item.path}
        onClick={() => setIsOpen(false)}
        className={`block w-full px-4 py-3 ${
          isActive ? "bg-[#F8F5D3] text-[#2A1449]" : "hover:bg-gray-100 text-[#2A1449]"
        }`}
      >
        {item.icon ? (
          <Image
            src="/images/MagnifyingGlass.svg"
            alt="Search"
            width={24}
            height={24}
            className="inline-block"
          />
        ) : (
          <span>{item.name}</span>
        )}
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-15 flex items-center justify-between py-4 pb-6 min-h-[99px] relative">
        <button
          className="lg:hidden flex items-center justify-center w-10 h-16 z-20 absolute top-4 left-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 z-10 lg:static lg:translate-x-0">
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <Image
              src="/images/BytefestLogo.svg"
              alt="Bytefest Logo"
              width={150}
              height={50}
              priority
              className="mt-[5px] lg:mt-[-5px]"
            />
          </Link>
        </div>
        {/* Desktop Navbar */}
        <nav className="hidden lg:block">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-8">
            {mainNavItems.map(renderNavLink)}
          </div>
        </nav>
        {/* Mobile Search Button */}
        <div className="lg:hidden absolute top-[34px] right-4 z-20">
          <Link href="/search" onClick={() => setIsOpen(false)}>
            <Image src="/images/MagnifyingGlass.svg" alt="Search" width={30} height={30} />
          </Link>
        </div>
      </div>
      {isOpen && (
        <nav className="lg:hidden relative z-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-15 pb-4">
            <div className="flex flex-col space-y-0">
              {mainNavItems.filter(item => item.name !== "SEARCH").map(renderMobileNavLink)}
            </div>
          </div>
        </nav>
      )}
      {isOpen && <div className="fixed inset-0 z-10 lg:hidden" onClick={() => setIsOpen(false)} />}
    </header>
  );
};

export default Header;
