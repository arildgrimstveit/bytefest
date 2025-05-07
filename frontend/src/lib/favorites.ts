export type FavoriteId = string;

export interface FavoriteStore {
  get: () => Promise<FavoriteId[]>;
  add: (id: FavoriteId) => Promise<void>;
  remove: (id: FavoriteId) => Promise<void>;
  clear: () => Promise<void>;
  addMultiple?: (ids: FavoriteId[]) => Promise<void>; 
}

const LOCAL_STORAGE_KEY = 'favoriteTalks';

export const lsStore: FavoriteStore = {
  get: async () => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  },
  add: async (id) => {
    try {
      const currentFavorites = await lsStore.get();
      if (!currentFavorites.includes(id)) {
        const newFavorites = [...currentFavorites, id];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.error('Error adding favorite to localStorage:', error);
    }
  },
  remove: async (id) => {
    try {
      const currentFavorites = await lsStore.get();
      const newFavorites = currentFavorites.filter(favId => favId !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing favorite from localStorage:', error);
    }
  },
  clear: async () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing favorites from localStorage:', error);
    }
  },
  addMultiple: async (ids) => {
    try {
      const currentFavorites = await lsStore.get();
      const newFavorites = [...new Set([...currentFavorites, ...ids])];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error adding multiple favorites to localStorage:', error);
    }
  }
};

// Factory function for Sanity store - NOW USES /api/favorites for mutations
export const sanityStoreFactory = (_attendeeId: string): FavoriteStore => {
  // The attendeeId is implicitly handled by the API route via user cookie, 
  // but having it might be useful for certain GQL/other API designs.
  // For RESTful /api/favorites, it's not directly passed in body for mutations.

  const storeInstance: FavoriteStore = {
    get: async () => {
      try {
        // This fetch still goes to /api/favorites which uses the tokenized client server-side
        const response = await fetch('/api/favorites'); // GET request
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error fetching favorites from API:', response.status, errorData);
          throw new Error(`Failed to fetch favorites: ${errorData.details || response.statusText}`);
        }
        const data = await response.json();
        if (data.useLocalStorage) { // API might still direct to LS based on auth state
            console.warn('API directed to use localStorage for GET /api/favorites. This might indicate user is not fully authenticated for Sanity store.');
            return await lsStore.get(); // Fallback or indicate an issue
        }
        // Expects data.favorites to be an array of { talkId: string, talkSlug: string, title: string }
        // The FavoriteStore expects an array of slugs (FavoriteId)
        return data.favorites?.map((fav: { talkSlug: string }) => fav.talkSlug).filter(Boolean) || [];
      } catch (error) {
        console.error('Error in sanityStore.get:', error);
        return [];
      }
    },
    add: async (slug) => {
      try {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ talkSlug: slug, favorite: true }),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error adding favorite via API:', response.status, errorData);
          throw new Error(`Failed to add favorite: ${errorData.details || response.statusText}`);
        }
        const data = await response.json();
        if (data.useLocalStorage) {
            console.warn('API directed to use localStorage for POST /api/favorites (add). This implies user state issue or talk not found.');
        }
        // No explicit return value, but success is implied if no error
      } catch (error) {
        console.error('Error in sanityStore.add:', error);
        throw error; // Re-throw to allow useFavorites to catch and revert optimistic update
      }
    },
    remove: async (slug) => {
      try {
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ talkSlug: slug, favorite: false }), // favorite: false to remove
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error removing favorite via API:', response.status, errorData);
          throw new Error(`Failed to remove favorite: ${errorData.details || response.statusText}`);
        }
        const data = await response.json();
        if (data.useLocalStorage) {
            console.warn('API directed to use localStorage for POST /api/favorites (remove).');
        }
      } catch (error) {
        console.error('Error in sanityStore.remove:', error);
        throw error;
      }
    },
    clear: async () => {
      console.warn('sanityStore.clear() is calling remove individually for each favorite.');
      const currentFavs = await storeInstance.get();
      for (const slug of currentFavs) {
        await storeInstance.remove(slug);
      }
    },
    addMultiple: async (slugs) => {
      console.warn('sanityStore.addMultiple() is calling add individually for each favorite.');
      for (const slug of slugs) {
        await storeInstance.add(slug);
      }
    }
  };
  return storeInstance;
};

export let activeStore: FavoriteStore = lsStore; 

// Function to set the active store
export const setActiveFavoriteStore = (store: FavoriteStore) => {
  activeStore = store;
}; 