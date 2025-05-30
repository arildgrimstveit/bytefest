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
  const [isCachedPhotoBeingLoaded, setIsCachedPhotoBeingLoaded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);
  const localStorageKey = 'userProfilePhotoDataUrl';

  const photoUrlRef = useRef(photoUrl);
  useEffect(() => {
    photoUrlRef.current = photoUrl;
  }, [photoUrl]);

  // Effect to load from localStorage on mount
  useEffect(() => {
    isMounted.current = true;
    try {
      const cachedPhoto = localStorage.getItem(localStorageKey);
      if (cachedPhoto) {
        console.log("Loaded photo from localStorage");
        setPhotoUrl(cachedPhoto);
      }
    } catch (error) {
      console.error("Error reading photo from localStorage:", error);
    }
    setIsCachedPhotoBeingLoaded(false); // Done trying to load from cache

    // Cleanup function to revoke object URL and update mounted status
    return () => {
      isMounted.current = false;
      // Only revoke if it's an object URL (blob:...). Data URLs don't need revoking.
      if (photoUrlRef.current && photoUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(photoUrlRef.current);
      }
    };
  }, []); // Runs once on mount

  // Effect to fetch profile photo when authenticated and ready, or to update cached one
  useEffect(() => {
    const activeAccount = accounts && accounts.length > 0 ? accounts[0] : null;

    if (!isAuthenticated || inProgress !== InteractionStatus.None || !activeAccount) {
      if (!isAuthenticated && photoUrlRef.current) { // Use photoUrlRef.current here
        setPhotoUrl(null);
        try {
          localStorage.removeItem(localStorageKey);
        } catch (error) {
          console.error("Error removing photo from localStorage:", error);
        }
      }
      return;
    }

    const photoTokenRequest = {
      scopes: ["User.Read"],
      account: activeAccount
    };

    async function getPhotoToken() {
      if (!activeAccount) {
        console.warn("No active account found for photo token request.");
        return null;
      }
      try {
        const resp = await instance.acquireTokenSilent(photoTokenRequest);
        return resp.accessToken;
      } catch (error) {
        console.error("Silent token acquisition failed: ", error);
        // Potentially handle interactive request here if necessary
        return null;
      }
    }

    async function fetchProfilePhotoAndUpdate() {
      if (!isMounted.current) return;

      console.log("Attempting to fetch/update profile photo...");
      const token = await getPhotoToken();
      if (!token) {
        console.error("Failed to acquire token for profile photo.");
        // If token fails, and we have a cached photo, we keep it.
        // If no cached photo, it will show fallback.
        return;
      }

      try {
        const res = await fetch(graphConfig.graphPhotoEndpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          console.error("Photo fetch failed:", res.status);
          if (res.status === 404) { // User has no photo
            setPhotoUrl(null); // Ensure no old photo is shown
            localStorage.removeItem(localStorageKey);
          }
          // For other errors, we might keep the stale cached photo if available
          return;
        }

        const blob = await res.blob();
        
        // Convert blob to Data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          if (isMounted.current) {
            // Only update if different from current or if current is an old object URL
            if (photoUrlRef.current !== dataUrl || (photoUrlRef.current && photoUrlRef.current.startsWith('blob:'))) {
                 // Revoke old object URL if it exists and is a blob URL
                if (photoUrlRef.current && photoUrlRef.current.startsWith('blob:')) {
                    URL.revokeObjectURL(photoUrlRef.current);
                }
                setPhotoUrl(dataUrl);
            }
            try {
              localStorage.setItem(localStorageKey, dataUrl);
              console.log("Photo updated and cached in localStorage");
            } catch (error) {
              console.error("Error saving photo to localStorage:", error);
            }
          }
        };
        reader.onerror = () => {
            console.error("Error converting blob to Data URL");
        };
        reader.readAsDataURL(blob);

      } catch (error) {
        console.error("Error fetching/processing profile photo:", error);
        // Keep stale cached photo if an error occurs
      }
    }

    fetchProfilePhotoAndUpdate();
    
    // No direct dependency on photoUrl here to avoid re-fetching if only photoUrl changed by cache
  }, [isAuthenticated, inProgress, accounts, instance]);

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
            {(photoUrl && !isCachedPhotoBeingLoaded) ? (
              <Image
                src={photoUrl}
                alt={user?.name || 'User'}
                width={size}
                height={size}
                className="object-cover"
              />
            ) : (
              // Fallback initials display
              // Show fallback if:
              // 1. Still checking cache (isCachedPhotoBeingLoaded is true)
              // 2. No photoUrl AND finished checking cache
              <div style={{ width: size, height: size }} className="flex items-center justify-center bg-[#2A1449] text-white">
                {(isCachedPhotoBeingLoaded && !photoUrl) ? '' : (user?.name ? user.name.charAt(0).toUpperCase() : 'U')}
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