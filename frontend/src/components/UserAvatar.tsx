'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useUser } from './UserContext';
import { LogOut } from 'lucide-react';
import { UserAvatarProps } from '@/types/props';
import { useMsal } from '@azure/msal-react';
import { graphConfig } from '@/config/AuthConfig';
import { InteractionStatus } from '@azure/msal-browser';

// Displays the user's avatar (profile picture or initials) and a dropdown menu.
// Fetches the profile picture from Microsoft Graph.
const UserAvatar = ({ size = 32 }: UserAvatarProps) => {
  const { instance, inProgress, accounts } = useMsal();
  const { user, isAuthenticated, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  // Effect to fetch profile photo when authenticated and ready
  useEffect(() => {
    isMounted.current = true;

    const photoTokenRequest = {
      scopes: ["User.Read"],
      account: accounts[0]
    };

    // Helper to acquire an access token for Graph API silently
    async function getPhotoToken() {
      if (!accounts[0]) {
        console.warn("No active account found for photo token request.");
        return null;
      }
      try {
        const resp = await instance.acquireTokenSilent(photoTokenRequest);
        return resp.accessToken;
      } catch (error) {
        console.error("Silent token acquisition failed: ", error);
        return null;
      }
    }

    // Helper to fetch the profile photo blob from Microsoft Graph
    async function fetchProfilePhoto() {
      if (!isMounted.current) return; // Avoid state updates if unmounted

      console.log("Attempting to fetch profile photo...");
      const token = await getPhotoToken();
      if (!token) {
        console.error("Failed to acquire token for profile photo.");
        return;
      }

      try {
        const res = await fetch(graphConfig.graphPhotoEndpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          console.error("Photo fetch failed:", res.status, await res.text());
          throw new Error("Photo fetch failed: " + res.status);
        }

        const blob = await res.blob();
        if (isMounted.current) { // Check mounted status before setting state
          const url = URL.createObjectURL(blob);
          console.log("Photo fetched successfully:", url);
          setPhotoUrl(url);
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    }

    // Trigger photo fetch if conditions met
    if (isAuthenticated && inProgress === InteractionStatus.None && !photoUrl && accounts.length > 0) {
      fetchProfilePhoto();
    }

    // Cleanup function to revoke object URL and update mounted status
    return () => {
      isMounted.current = false;
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [isAuthenticated, inProgress, accounts, instance, photoUrl]);

  // Effect to handle clicking outside the dropdown to close it
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
      <button
        className="relative flex items-center pt-3 group cursor-pointer"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Hover background effect */}
        <div className="absolute left-0 right-0 transition-all duration-200 mb-[-5px] group-hover:bg-gray-100 lg:inset-y-[-24px] lg:left-[-16px] lg:right-[-16px]" />

        {/* Avatar image or initials */}
        <div className="relative z-10 flex items-center">
          <div className="relative rounded-full overflow-hidden flex items-center justify-center">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={user?.name || 'User'}
                width={size}
                height={size}
                className="object-cover"
              />
            ) : (
              // Fallback initials display - THIS ONE IS OKAY (inside expression)
              <div style={{ width: size, height: size }} className="flex items-center justify-center bg-[#2A1449] text-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
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
          {/* Pixel corner styled container */}
          <div className="pixel-corners relative">
            <div className="bg-white divide-y divide-gray-200 z-10 w-full">
              {/* User Info */}
              <div className="px-4 py-3">
                <p className="text-sm text-[#2A1449]">Logget inn som</p>
                <p className="truncate text-sm font-medium text-[#2A1449]">{user?.email}</p>
              </div>
              {/* Logout Button */}
              <div className="py-1">
                <button
                  onClick={logout}
                  className="flex w-full items-center px-4 py-2 mt-[-4] mb-[-4] text-sm text-[#2A1449] hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                >
                  <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
                  Logg ut
                </button>
              </div>
            </div>

            {/* Pixel corner visual elements */}
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