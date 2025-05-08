"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types/navItem";
import { useUser } from "./UserContext";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useUser();

  // Close mobile menu on window resize to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define main navigation items
  const mainNavItems: NavItem[] = useMemo(() => [
    { name: "PÅMELDING", path: "/", disabled: false },
    { name: "OM BYTEFEST", path: "/bytefest", disabled: false },
    { name: "ALLE FOREDRAG", path: "/talks", disabled: false },
    { name: "PROGRAM", path: "/program", disabled: true },
  ], []);

  // Renders a single desktop navigation link with active state styling
  const renderNavLink = useCallback((item: NavItem) => {
    // Check if current path is part of the registration flow
    const isRegistrationFlow = pathname.startsWith('/paamelding');
    
    // PÅMELDING should be highlighted for both root path and the registration flow
    const isActive = 
      pathname === item.path || 
      (item.path === "/" && isRegistrationFlow) ||
      (item.path === "/talks" && pathname.startsWith('/talks/'));
    
    // If the item is disabled, render a div instead of a link
    if (item.disabled) {
      return (
        <div key={item.path} className="relative flex items-center py-3 pt-6 group cursor-default">
          <span className="relative z-10 text-gray-400">{item.name}</span>
        </div>
      );
    }

    const linkClasses = `relative flex items-center py-3 pt-6 group`;
    const overlayClasses = `absolute left-0 right-0 transition-all duration-200 ${isActive
      ? "bg-[#F8F5D3] lg:border-b-4 lg:border-[#C16800]"
      : "group-hover:bg-gray-100"
      } lg:inset-y-[-24px] lg:left-[-16px] lg:right-[-16px] ${isOpen ? "inset-y-[-6] border-none" : ""}`;
    return (
      <Link key={item.path} href={item.path} className={linkClasses} onClick={() => setIsOpen(false)}>
        <div className={overlayClasses} />
        <span className="relative z-10 text-[#2A1449] group-hover:text-[#2A1449]">{item.name}</span>
      </Link>
    );
  }, [pathname, isOpen]);

  // Renders either the UserAvatar or the Login link for desktop
  const renderLoginOrAvatar = useCallback(() => {
    if (isAuthenticated) {
      return (
        <div className="h-full flex items-center">
          <UserAvatar size={36} />
        </div>
      );
    }

    const linkClasses = "relative flex items-center py-3 pt-6 group";
    const overlayClasses = `absolute left-0 right-0 transition-all duration-200 ${pathname === "/login"
      ? "bg-[#F8F5D3] lg:border-b-4 lg:border-[#C16800]"
      : "group-hover:bg-gray-100"
      } lg:inset-y-[-24px] lg:left-[-16px] lg:right-[-16px] ${isOpen ? "inset-y-[-6] border-none" : ""}`;

    return (
      <Link href="/login" className={linkClasses} onClick={() => setIsOpen(false)}>
        <div className={overlayClasses} />
        <span className="relative z-10 text-[#2A1449] group-hover:text-[#2A1449]">LOGG INN</span>
      </Link>
    );
  }, [isAuthenticated, pathname, isOpen]);

  // Renders a single mobile navigation link
  const renderMobileNavLink = useCallback((item: NavItem) => {
    // Check if current path is part of the registration flow
    const isRegistrationFlow = pathname.startsWith('/paamelding');
    
    // PÅMELDING should be highlighted for both root path and the registration flow
    const isActive = 
      pathname === item.path || 
      (item.path === "/" && isRegistrationFlow) ||
      (item.path === "/talks" && pathname.startsWith('/talks/'));
    
    // If the item is disabled, render a div instead of a link
    if (item.disabled) {
      return (
        <div
          key={item.path}
          className="block w-full px-4 py-3 text-gray-400 cursor-default"
        >
          <span>{item.name}</span>
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        href={item.path}
        onClick={() => setIsOpen(false)}
        className={`block w-full px-4 py-3 ${isActive ? "bg-[#F8F5D3] text-[#2A1449]" : "hover:bg-gray-100 text-[#2A1449]"}`}
      >
        <span>{item.name}</span>
      </Link>
    );
  }, [pathname]);

  // Renders either the Logout button or the Login link for the mobile menu
  const renderMobileLoginOrAvatar = useCallback(() => {
    if (isAuthenticated) {
      return (
        <button
          onClick={() => {
            setIsOpen(false);
            logout();
          }}
          className="block w-full px-4 py-3 hover:bg-gray-100 text-[#2A1449] text-left cursor-pointer"
        >
          <span>LOGG UT</span>
        </button>
      );
    }

    const isActive = pathname === "/login";
    return (
      <Link
        href="/login"
        onClick={() => setIsOpen(false)}
        className={`block w-full px-4 py-3 ${isActive ? "bg-[#F8F5D3] text-[#2A1449]" : "hover:bg-gray-100 text-[#2A1449]"}`}
      >
        <span>LOGG INN</span>
      </Link>
    );
  }, [isAuthenticated, pathname, logout]);

  return (
    <header className="bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)] relative">

      {/* Main header container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-15 flex items-center justify-between py-4 pb-6 min-h-[99px] relative">

        {/* Mobile hamburger button */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-16 z-20 absolute top-4 left-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo (centered on mobile, left on desktop) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 z-20 lg:static lg:translate-x-0">
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <Image
              src="/images/BytefestLogo.svg"
              alt="Bytefest Logo"
              width={136}
              height={38}
              priority
              className="mt-[5px] lg:mt-[-5px]"
              style={{ width: '150px', height: 'auto' }}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-8">
            {mainNavItems.map(renderNavLink)}
            {renderLoginOrAvatar()}
          </div>
        </nav>

        {/* Mobile Login/Avatar Icon (top right) */}
        <div className="lg:hidden absolute top-[20px] right-4 z-[50] flex items-center">
          {isAuthenticated ? (
            <UserAvatar size={34} />
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <LogIn className="w-6 h-6 mt-[17px] text-[#2A1449]" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu (appears when isOpen is true) */}
      {isOpen && (
        <nav className="lg:hidden relative z-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-15 pb-4">
            <div className="flex flex-col space-y-0">
              {mainNavItems.map(renderMobileNavLink)}
              {renderMobileLoginOrAvatar()}
            </div>
          </div>
        </nav>
      )}
      {/* Clickaway overlay for mobile menu */}
      {isOpen && <div className="fixed inset-0 z-10 lg:hidden" onClick={() => setIsOpen(false)} />}
    </header>
  );
};

export default Header;
