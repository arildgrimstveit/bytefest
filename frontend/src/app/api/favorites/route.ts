import { NextRequest, NextResponse } from 'next/server';
import client from '@/sanityClient';

// Get user email from cookie for authentication
function getAuthenticatedUserEmail(request: NextRequest) {
  return request.cookies.get('userEmail')?.value || null;
}

// Clean ID for references - removes draft prefix if present
function cleanReferenceId(id: string): string {
  return id.replace(/^drafts\./, '');
}

interface TalkDoc {
  _id: string;
  title?: string;
}

interface FavoriteItem {
  _id: string;
  slug?: string;
  title?: string;
}

// Type for the result of fetching attendee with their favorite talks projected
interface AttendeeWithFavorites {
  favorites: FavoriteItem[];
}

export async function POST(request: NextRequest) {
  const email = getAuthenticatedUserEmail(request);
  
  if (!email) {
    console.log("POST /api/favorites: User not authenticated.");
    return NextResponse.json({
      error: 'User not authenticated',
      details: 'You need to be logged in to save favorites on the server',
      useLocalStorage: true
    }, { status: 200 });
  }
  
  try {
    const { talkSlug, favorite } = await request.json();
    
    if (!talkSlug) {
      console.error("POST /api/favorites: Talk slug is required.");
      return NextResponse.json({ error: 'Talk slug is required' }, { status: 400 });
    }
    
    // Get talk document by slug - we only need one, published or draft.
    const talk = await client.fetch<TalkDoc>(
      `*[_type == "talk" && slug.current == $talkSlug][0]{ _id }`,
      { talkSlug }
    );
    
    if (!talk) {
      console.log(`POST /api/favorites: Talk not found for slug "${talkSlug}".`);
      return NextResponse.json({
        error: 'Talk not found',
        details: `No talk found with slug "${talkSlug}"`,
        useLocalStorage: true
      }, { status: 404 }); // Keep 404 for talk not found
    }
    
    // Use the cleaned ID for the talk reference (ensures we reference the published version if applicable)
    const talkReferenceId = cleanReferenceId(talk._id);

    // Get PUBLISHED attendee document
    console.log(`POST /api/favorites: Fetching published attendee for email: ${email}`);
    const attendee = await client.fetch(
      `*[_type == "attendee" && attendeeEmail == $email && !(_id in path("drafts.**"))][0]{ 
        _id, 
        "favoriteTalks": favoriteTalks[]._ref 
      }`,
      { email }
    );
    
    if (!attendee) {
      console.log(`POST /api/favorites: Published attendee not found for email "${email}". Defaulting to localStorage.`);
      return NextResponse.json({
        error: 'Published attendee not found',
        details: `No published attendee record for ${email}. Favorites will be saved locally.`,
        useLocalStorage: true
      }, { status: 200 }); // 200 allows frontend to use localStorage
    }
    
    console.log(`POST /api/favorites: Found published attendee: ${attendee._id}`);
    const existingFavoriteIds = attendee.favoriteTalks || [];
    
    // Check if this specific talk reference is already favorited
    const isAlreadyFavorited = existingFavoriteIds.includes(talkReferenceId);
    
    // Adding to favorites
    if (favorite !== false) {
      if (isAlreadyFavorited) {
        console.log(`POST /api/favorites: Talk ${talkReferenceId} already favorited by ${attendee._id}.`);
        return NextResponse.json({ success: true, action: 'already_exists' });
      }
      
      try {
        console.log(`POST /api/favorites: Attempting to add talk ${talkReferenceId} to favorites for attendee ${attendee._id}`);
        await client
          .patch(attendee._id) // Operate on the fetched published attendee ID
          .setIfMissing({ favoriteTalks: [] })
          .append('favoriteTalks', [{ 
            _type: 'reference', 
            _ref: talkReferenceId, 
            _key: talkReferenceId
          }])
          .commit(); // Removed skipDuplicatePatchError
          
        console.log(`POST /api/favorites: Successfully added talk ${talkReferenceId} for attendee ${attendee._id}`);
        return NextResponse.json({ success: true, action: 'added' });
      } catch (error) {
        console.error(`POST /api/favorites: Error adding favorite for attendee ${attendee._id}, talk ${talkReferenceId}:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ 
          error: 'Failed to update favorites in database',
          details: errorMessage,
          useLocalStorage: true
        }, { status: 200 });
      }
    } 
    // Removing from favorites
    else {
      if (!isAlreadyFavorited) {
        console.log(`POST /api/favorites: Talk ${talkReferenceId} not found in favorites of ${attendee._id} to remove.`);
        return NextResponse.json({ success: true, action: 'not_found' });
      }
      
      try {
        console.log(`POST /api/favorites: Attempting to remove talk ${talkReferenceId} from favorites for attendee ${attendee._id}`);
        const updatedFavorites = existingFavoriteIds.filter((id: string) => id !== talkReferenceId);
        
        await client
          .patch(attendee._id) // Operate on the fetched published attendee ID
          .set({ favoriteTalks: updatedFavorites.map((id: string) => ({ 
            _type: 'reference', 
            _ref: id, 
            _key: id
          }))})
          .commit(); // Removed skipDuplicatePatchError
          
        console.log(`POST /api/favorites: Successfully removed talk ${talkReferenceId} for attendee ${attendee._id}`);
        return NextResponse.json({ success: true, action: 'removed' });
      } catch (error) {
        console.error(`POST /api/favorites: Error removing favorite for attendee ${attendee._id}, talk ${talkReferenceId}:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ 
          error: 'Failed to remove favorite from database',
          details: errorMessage,
          useLocalStorage: true
        }, { status: 200 });
      }
    }
  } catch (error) {
    console.error('POST /api/favorites: General error handling favorites:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Server error while handling favorites',
      details: errorMessage,
      useLocalStorage: true
    }, { status: 200 });
  }
}

export async function GET(request: NextRequest) {
  const email = getAuthenticatedUserEmail(request);
  const talkSlug = request.nextUrl.searchParams.get('talkSlug');
  
  if (!email) {
    console.log("GET /api/favorites: User not authenticated.");
    return NextResponse.json({
      useLocalStorage: true // Allow frontend to use localStorage if user not logged in
    }, { status: 200 });
  }
  
  try {
    // For checking a specific talk's favorite status
    if (talkSlug) {
      console.log(`GET /api/favorites: Checking favorite status for talkSlug: ${talkSlug}, user: ${email}`);
      const talk = await client.fetch<TalkDoc>(
        `*[_type == "talk" && slug.current == $talkSlug][0]{ _id }`,
        { talkSlug }
      );
      
      if (!talk) {
        console.log(`GET /api/favorites: Talk not found for slug "${talkSlug}".`);
        // If talk doesn't exist, it can't be a favorite.
        // Still return useLocalStorage: false as user is authenticated, but talk isn't favorited.
        return NextResponse.json({ isFavorite: false, useLocalStorage: false });
      }
      
      const talkReferenceId = cleanReferenceId(talk._id);
      
      // Check if the PUBLISHED attendee has favorited this talk
      const favoritedAttendee = await client.fetch(
        `*[_type == "attendee" && 
           attendeeEmail == $email && 
           !(_id in path("drafts.**")) && 
           $talkReferenceId in favoriteTalks[]._ref
        ][0]{ _id }`,
        { email, talkReferenceId }
      );
      
      const isFavorite = !!favoritedAttendee;
      console.log(`GET /api/favorites: Talk ${talkSlug} (ref: ${talkReferenceId}) isFavorite: ${isFavorite} for user ${email}`);
      return NextResponse.json({ isFavorite: isFavorite, useLocalStorage: false });
    }
    
    // For getting all favorites for the authenticated user
    console.log(`GET /api/favorites: Fetching all favorites for user: ${email}`);
    const attendeeWithFavorites = await client.fetch<AttendeeWithFavorites | null>( // Using specific type or null
      `*[_type == "attendee" && attendeeEmail == $email && !(_id in path("drafts.**"))][0]{
        "favorites": favoriteTalks[]->{ 
          _id, 
          "slug": slug.current, 
          title 
        }
      }`,
      { email }
    );
    
    if (!attendeeWithFavorites || !attendeeWithFavorites.favorites) {
      console.log(`GET /api/favorites: No published attendee or no favorites found for user ${email}.`);
      return NextResponse.json({ favorites: [], useLocalStorage: false });
    }

    const validFavorites = (attendeeWithFavorites.favorites || [])
      .filter((item: FavoriteItem) => item && item.slug) // Ensure item and slug are present
      .map((item: FavoriteItem) => ({
        talkId: cleanReferenceId(item._id), // Ensure talk ID is clean
        talkSlug: item.slug,
        title: item.title
      }));
      
    console.log(`GET /api/favorites: Found ${validFavorites.length} favorites for user ${email}.`);
    return NextResponse.json({ 
      favorites: validFavorites,
      useLocalStorage: false 
    });
    
  } catch (error) {
    console.error(`GET /api/favorites: Error fetching favorites for user ${email}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    // For GET requests, if there's a server error, it's safer to also suggest localStorage
    // as the data might be inconsistent or unavailable.
    return NextResponse.json({ 
      error: 'Server error fetching favorites',
      details: errorMessage,
      useLocalStorage: true // Fallback to localStorage on general GET errors
    }, { status: 200 });
  }
} 