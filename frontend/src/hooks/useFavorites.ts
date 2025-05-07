import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/components/UserContext';
import sanityClient from '@/sanityClient';
import {
  FavoriteId,
  lsStore,
  sanityStoreFactory,
  setActiveFavoriteStore,
  activeStore as currentActiveStore // Use currentActiveStore to avoid confusion with the hook's activeStore concept during setup
} from '../lib/favorites';

interface AttendeeData {
  _id: string;
  // We might also want to fetch initial favorites here to avoid a separate get call later
  // For now, just the ID as per the plan, and the store.get() will fetch them.
}

export const useFavorites = () => {
  const { user, isAuthenticated } = useUser();
  const [attendeeId, setAttendeeId] = useState<string | null>(null);
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);
  const [favs, setFavs] = useState<FavoriteId[]>([]);
  const [isLoadingFavs, setIsLoadingFavs] = useState(false);
  const [errorFavs, setErrorFavs] = useState<string | null>(null);
  // Track if a migration attempt has been made for the current attendeeId session
  const [migrationAttemptedForCurrentAttendee, setMigrationAttemptedForCurrentAttendee] = useState(false);

  // Effect to determine attendeeId and set the active store
  useEffect(() => {
    const initializeStoreAndMigrate = async () => {
      setIsLoadingFavs(true);
      setErrorFavs(null);
      setIsStoreInitialized(false); 

      let currentAttendeeSanityStore: import('../lib/favorites').FavoriteStore | null = null;

      if (isAuthenticated && user && user.email) {
        try {
          const attendeeData = await sanityClient.fetch<AttendeeData | null>(
            `*[_type == "attendee" && attendeeEmail == $email && !(_id in path("drafts.**"))][0]{ _id }`,
            { email: user.email }
          );

          if (attendeeData && attendeeData._id) {
            // User is logged in AND registered
            if (attendeeId !== attendeeData._id) {
              // Attendee ID has changed or is being set for the first time
              setMigrationAttemptedForCurrentAttendee(false); // Reset migration attempt status for new/changed attendee
              setAttendeeId(attendeeData._id);
            }
            currentAttendeeSanityStore = sanityStoreFactory();
            setActiveFavoriteStore(currentAttendeeSanityStore);

            // **** MIGRATION LOGIC ****
            if (currentAttendeeSanityStore && currentAttendeeSanityStore.addMultiple && !migrationAttemptedForCurrentAttendee) {
              console.log('Attempting migration for attendee:', attendeeData._id);
              const localFavs = await lsStore.get();
              if (localFavs.length > 0) {
                console.log('Local favorites found:', localFavs);
                const remoteFavs = await currentAttendeeSanityStore.get();
                console.log('Remote favorites found:', remoteFavs);
                
                const toAdd = localFavs.filter(id => !remoteFavs.includes(id));
                
                if (toAdd.length > 0) {
                  console.log('Migrating favorites to Sanity:', toAdd);
                  await currentAttendeeSanityStore.addMultiple(toAdd);
                  // Optimistically update favs state
                  const newTotalFavs = [...new Set([...remoteFavs, ...toAdd])];
                  setFavs(newTotalFavs);
                  console.log('Localstorage favorites migrated. Clearing localstorage.');
                  await lsStore.clear(); 
                } else {
                  // No new favorites to add, but local ones existed. Clear them if desired, or leave as is.
                  // For a clean slate and to rely on Sanity as SoT, clear them.
                  // This also handles the case where local and remote are identical.
                  console.log('Local favorites already in Sanity or no new ones to add. Clearing localstorage.');
                  await lsStore.clear();
                }
              } else {
                console.log('No local favorites to migrate.');
              }
              setMigrationAttemptedForCurrentAttendee(true); // Mark migration as attempted for this attendee session
            }
            // **** END MIGRATION LOGIC ****

          } else {
            // User is logged in but not registered, or attendee doc missing _id
            setActiveFavoriteStore(lsStore);
            if (attendeeId !== null) setAttendeeId(null); // Update if it was previously set
            setMigrationAttemptedForCurrentAttendee(false); // Reset migration status
          }
        } catch (error) {
          console.error('Error during store initialization or migration:', error);
          setErrorFavs('Failed to initialize favorites store or migrate data.');
          setActiveFavoriteStore(lsStore); // Fallback
          if (attendeeId !== null) setAttendeeId(null);
          setMigrationAttemptedForCurrentAttendee(false);
        }
      } else {
        // User is not logged in (isAuthenticated is false or user/email is missing)
        setActiveFavoriteStore(lsStore);
        if (attendeeId !== null) setAttendeeId(null);
        setMigrationAttemptedForCurrentAttendee(false);
      }
      setIsStoreInitialized(true); // Signal that store setup (and migration if applicable) is complete
    };

    initializeStoreAndMigrate();
  }, [user, isAuthenticated, attendeeId, migrationAttemptedForCurrentAttendee]); // Depend on `user` and `isAuthenticated` from your context

  // Effect to load favorites once the store is initialized (or favs have been optimistically set by migration)
  useEffect(() => {
    if (!isStoreInitialized) {
      // Don't load favs until store is determined (lsStore or sanityStore)
      return;
    }

    let isMounted = true;
    const loadFavorites = async () => {
      setIsLoadingFavs(true);
      setErrorFavs(null);
      try {
        // currentActiveStore is the one set by setActiveFavoriteStore from ../lib/favorites
        const currentFavs = await currentActiveStore.get();
        if (isMounted) {
          setFavs(currentFavs);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        if (isMounted) {
          setErrorFavs('Failed to load favorites.');
          setFavs([]); // Clear favs on error or show stale if preferred
        }
      } finally {
        if (isMounted) {
          setIsLoadingFavs(false);
        }
      }
    };

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [isStoreInitialized]); // Re-run when store is initialized (or changes, if we adapt to that)

  // Toggle function
  const toggleFavorite = useCallback(async (id: FavoriteId) => {
    if (!isStoreInitialized) {
      console.warn('Favorites store not initialized yet. Cannot toggle.');
      return;
    }
    // Optimistic update (Step 6)
    const currentFavs = favs;
    const isCurrentlyFavorite = currentFavs.includes(id);
    
    if (isCurrentlyFavorite) {
      setFavs(currentFavs.filter(favId => favId !== id));
    } else {
      setFavs([...currentFavs, id]);
    }

    try {
      if (isCurrentlyFavorite) {
        await currentActiveStore.remove(id);
      } else {
        await currentActiveStore.add(id);
      }
      // Optionally, re-fetch to confirm, or rely on optimistic update if stores are robust.
      // For now, we assume the operation succeeded if no error was thrown.
      // If the store operation modifies the backend and then the hook re-fetches based on store changes,
      // the UI would update. Or, if add/remove return the new list, we can use that.
      // For simplicity with the current store interface, we're doing optimistic updates.
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setErrorFavs('Failed to update favorite.');
      // Revert optimistic update on error
      setFavs(currentFavs); 
    }
  }, [favs, isStoreInitialized]); // currentActiveStore is not a dep because it's a module-level let
                                  // but its behavior changes based on user/attendeeId, handled by isStoreInitialized refresh

  // Expose isStoreInitialized for consumers that might need to know if the store is ready
  return { favs, toggleFavorite, isLoadingFavs, errorFavs, attendeeId, user, isAuthenticated, isStoreInitialized };
}; 