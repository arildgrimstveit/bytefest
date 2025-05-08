import { NextRequest, NextResponse } from 'next/server';
import { sanityClientWithToken as client } from '@/sanityClient';

// Get user email from cookie for authentication
function getAuthenticatedUserEmail(request: NextRequest): string | null {
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
    return NextResponse.json({
      error: 'User not authenticated',
      details: 'User must be logged in to save favorites on the server.',
      useLocalStorage: true 
    }, { status: 200 }); 
  }
  
  try {
    const { talkSlug, favorite } = await request.json();
    
    if (!talkSlug || typeof talkSlug !== 'string') {
      return NextResponse.json({ error: 'Talk slug is required and must be a string.' }, { status: 400 });
    }
    if (typeof favorite !== 'boolean') {
      return NextResponse.json({ error: "Invalid 'favorite' value. Must be true or false." }, { status: 400 });
    }
    
    const talk = await client.fetch<TalkDoc | null>(
      `*[_type == "talk" && slug.current == $talkSlug][0]{ _id }`,
      { talkSlug }
    );
    
    if (!talk) {
      return NextResponse.json({
        error: 'Talk not found',
        details: `No talk found with slug "${talkSlug}".`,
        useLocalStorage: true 
      }, { status: 404 }); 
    }
    
    const talkReferenceId = cleanReferenceId(talk._id);

    const attendee = await client.fetch< { _id: string, favoriteTalks?: string[] } | null >(
      `*[_type == "attendee" && attendeeEmail == $email && !(_id in path("drafts.**"))][0]{ 
        _id, 
        "favoriteTalks": favoriteTalks[]._ref 
      }`,
      { email }
    );
    
    if (!attendee) {
      return NextResponse.json({
        error: 'Attendee record not found',
        details: `No published attendee record for ${email}. Favorites will be saved locally.`,
        useLocalStorage: true
      }, { status: 200 }); 
    }
    
    const existingFavoriteIds = attendee.favoriteTalks || [];
    const isAlreadyFavorited = existingFavoriteIds.includes(talkReferenceId);
    
    if (favorite === true) {
      if (isAlreadyFavorited) {
        return NextResponse.json({ success: true, message: 'Talk already favorited.', action: 'already_exists' });
      }
      
      await client
        .patch(attendee._id)
        .setIfMissing({ favoriteTalks: [] })
        .append('favoriteTalks', [{ _type: 'reference', _ref: talkReferenceId, _key: talkReferenceId }])
        .commit();
      return NextResponse.json({ success: true, message: 'Favorite added.', action: 'added' });

    } else { // favorite === false (to remove)
      if (!isAlreadyFavorited) {
        // If the talk is not in the favorites list, there's nothing to remove.
        // This can happen if multiple remove requests were sent and one already processed it.
        // Or if the client's state was out of sync.
        return NextResponse.json({ success: true, message: 'Talk not in favorites to remove.', action: 'not_found' });
      }
      
      // Use Sanity's atomic unset operation to remove the reference from the array
      // This targets items in the 'favoriteTalks' array where _ref matches talkReferenceId
      await client
        .patch(attendee._id)
        .unset([`favoriteTalks[_ref=="${talkReferenceId}"]`])
        .commit();
        
      return NextResponse.json({ success: true, message: 'Favorite removed.', action: 'removed' });
    }

  } catch (error) {
    console.error('[API POST /api/favorites] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json({ 
      error: 'Server error while updating favorites',
      details: errorMessage,
      useLocalStorage: true 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const email = getAuthenticatedUserEmail(request);
  const talkSlug = request.nextUrl.searchParams.get('talkSlug');
  
  if (!email) {
    return NextResponse.json({
      message: "User not authenticated for fetching server-side favorites.",
      useLocalStorage: true 
    }, { status: 200 });
  }
  
  try {
    if (talkSlug) {
      const talk = await client.fetch<TalkDoc | null>(
        `*[_type == "talk" && slug.current == $talkSlug][0]{ _id }`,
        { talkSlug }
      );
      
      if (!talk) {
        return NextResponse.json({ isFavorite: false, useLocalStorage: false, message: "Talk not found." });
      }
      
      const talkReferenceId = cleanReferenceId(talk._id);
      const favoritedAttendee = await client.fetch< { _id: string } | null >(
        `*[_type == "attendee" && 
           attendeeEmail == $email && 
           !(_id in path("drafts.**")) && 
           $talkReferenceId in favoriteTalks[]._ref
        ][0]{ _id }`,
        { email, talkReferenceId }
      );
      return NextResponse.json({ isFavorite: !!favoritedAttendee, useLocalStorage: false });
    }
    
    // For getting all favorites for the authenticated user
    const attendeeWithFavorites = await client.fetch<AttendeeWithFavorites | null>(
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
      return NextResponse.json({ favorites: [], useLocalStorage: false, message: "No attendee or favorites found." });
    }

    const validFavorites = (attendeeWithFavorites.favorites || [])
      .filter((item: FavoriteItem) => item && item.slug) 
      .map((item: FavoriteItem) => ({
        talkId: cleanReferenceId(item._id), 
        talkSlug: item.slug!,
        title: item.title
      }));
      
    return NextResponse.json({ 
      favorites: validFavorites,
      useLocalStorage: false 
    });
    
  } catch (error) {
    console.error(`[API GET /api/favorites] Error for user ${email}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json({ 
      error: 'Server error fetching favorites',
      details: errorMessage,
      useLocalStorage: true 
    }, { status: 500 }); 
  }
} 