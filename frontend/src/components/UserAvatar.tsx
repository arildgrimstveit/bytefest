'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useUser } from './UserContext';
import { LogOut } from 'lucide-react';
import { UserAvatarProps } from '@/types/props';

const UserAvatar = ({ size = 32 }: UserAvatarProps) => {
  const { user, isAuthenticated, profilePic, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  // Clear any timeouts when component unmounts
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Avatar button */}
      <button 
        className="relative flex items-center pt-3 group cursor-pointer"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="absolute left-0 right-0 transition-all duration-200 mb-[-5px] group-hover:bg-gray-100 lg:inset-y-[-24px] lg:left-[-16px] lg:right-[-16px]" />
        
        <div className="relative z-10 flex items-center">
          <div className="relative rounded-full overflow-hidden flex items-center justify-center">
            {profilePic ? (
              <Image 
                src={profilePic} 
                alt={user?.name || 'User'} 
                width={size} 
                height={size}
                className="object-cover"
              />
            ) : (
              <div style={{ width: size, height: size }} className="flex items-center justify-center bg-[#2A1449] text-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
        </div>
      </button>
    
      {/* Custom dropdown menu */}
      {isOpen && (
        <div 
          className="absolute right-0 2xl:transform 2xl:-translate-x-1/2 2xl:left-1/2 mt-2 w-[calc(100vw-2rem)] max-w-[18rem] sm:w-72 z-[100] origin-top-right transition-opacity duration-100 opacity-100"
          style={{
            maxWidth: "min(18rem, calc(100vw - 2rem))"
          }}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          {/* Wrap dropdown in pixel-corners div */}
          <div className="pixel-corners relative">
            <div className="bg-white divide-y divide-gray-200 z-10 w-full">
              <div className="px-4 py-3">
                <p className="text-sm text-[#2A1449]">Logget inn som</p>
                <p className="truncate text-sm font-medium text-[#2A1449]">{user?.email}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={logout}
                  className="flex w-full items-center px-4 py-2 mt-[-4] mb-[-4] text-sm text-[#2A1449] hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                >
                  <LogOut className="mr-2 h-4 w-4 cursor-pointer"/>
                  Logg ut
                </button>
              </div>
            </div>
            
            {/* Pixel corner elements */}
            <div className="pixel-corner tl"></div>
            <div className="pixel-corner tr"></div>
            <div className="pixel-corner bl"></div>
            <div className="pixel-corner br"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar; 