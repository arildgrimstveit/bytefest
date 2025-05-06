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

export async function POST(request: NextRequest) {
  const email = getAuthenticatedUserEmail(request);
  
  // Check authentication early
  if (!email) {
    return NextResponse.json({
      error: 'User not authenticated',
      details: 'You need to be logged in to save favorites on the server',
      useLocalStorage: true
    }, { status: 200 }); // Return 200 so frontend can still use localStorage
  }
  
  try {
    const { talkSlug, favorite } = await request.json();
    
    if (!talkSlug) {
      return NextResponse.json({ error: 'Talk slug is required' }, { status: 400 });
    }
    
    // Get talk document(s) by slug
    const talks = await client.fetch<TalkDoc[]>(
      `*[_type == "talk" && slug.current == $talkSlug]{ _id, title }`,
      { talkSlug }
    );
    
    if (!talks || talks.length === 0) {
      return NextResponse.json({
        error: 'Talk not found',
        details: `No talk found with slug "${talkSlug}"`,
        useLocalStorage: true
      }, { status: 404 });
    }
    
    // Get attendee document
    const attendee = await client.fetch(
      `*[_type == "attendee" && attendeeEmail == $email][0]{ 
        _id, 
        "favoriteTalks": favoriteTalks[]._ref 
      }`,
      { email }
    );
    
    if (!attendee) {
      return NextResponse.json({
        error: 'Attendee not found',
        details: `No attendee record for ${email}`,
        useLocalStorage: true
      }, { status: 200 });
    }
    
    // Log attendee document ID to check if it's a draft
    console.log(`Attendee document ID: ${attendee._id}, isDraft: ${attendee._id.startsWith('drafts.')}`);
    
    // Get all possible IDs for this talk (draft and published versions)
    const talkIds = talks.map((t: TalkDoc) => t._id);
    // Get clean IDs for reference creation (without "drafts." prefix)
    const cleanIds = talkIds.map(cleanReferenceId);
    // Select one ID to use (prefer published)
    const referenceId = cleanIds[0];
    
    // Get existing favorite IDs
    const existingFavoriteIds = attendee.favoriteTalks || [];
    
    // Check if any version of this talk is already favorited
    const isAlreadyFavorited = talkIds.some((id: string) => 
      existingFavoriteIds.includes(id) || existingFavoriteIds.includes(cleanReferenceId(id))
    );
    
    // Adding to favorites
    if (favorite !== false) {
      if (isAlreadyFavorited) {
        return NextResponse.json({ success: true, action: 'already_exists' });
      }
      
      try {
        // Add favorite using a clean reference ID
        console.log(`Attempting to update attendee ${attendee._id} with talk reference ${referenceId}`);
        console.log(`Current favorites: ${JSON.stringify(existingFavoriteIds)}`);
        
        // Try to publish the document first if it's a draft
        if (attendee._id.startsWith('drafts.')) {
          console.log('Attendee is in draft state, attempting to use published ID');
          
          // Get the published ID (remove drafts. prefix)
          const publishedId = attendee._id.replace(/^drafts\./, '');
          console.log(`Trying published ID: ${publishedId}`);
          
          try {
            // Try to patch using the published ID instead
            const patchResult = await client
              .patch(publishedId)
              .setIfMissing({ favoriteTalks: [] })
              .append('favoriteTalks', [{ 
                _type: 'reference', 
                _ref: referenceId
              }])
              .commit();
              
            console.log(`Patch result with published ID: ${JSON.stringify(patchResult)}`);
            return NextResponse.json({ success: true, action: 'added' });
          } catch (publishedError) {
            console.error('Error using published ID:', publishedError);
            // Fall back to using the draft ID
            console.log('Falling back to using draft ID');
          }
        }
        
        // Regular patch if not draft or if publishing failed
        const patchResult = await client
          .patch(attendee._id)
          .setIfMissing({ favoriteTalks: [] })
          .append('favoriteTalks', [{ 
            _type: 'reference', 
            _ref: referenceId
          }])
          .commit();
          
        console.log(`Patch result: ${JSON.stringify(patchResult)}`);
        return NextResponse.json({ success: true, action: 'added' });
      } catch (error) {
        // Log detailed error information
        console.error("Error updating favorites:", error);
        console.error("Error details:", error instanceof Error ? error.message : 'Unknown error');
        
        if (error instanceof Error && error.message.includes('permission')) {
          return NextResponse.json({
            error: 'Permission denied',
            details: 'Your Sanity token may have insufficient permissions',
            useLocalStorage: true
          }, { status: 200 });
        }
        
        return NextResponse.json({ 
          error: 'Failed to update favorites in database',
          details: error instanceof Error ? error.message : 'Unknown error',
          useLocalStorage: true
        }, { status: 200 });
      }
    } 
    // Removing from favorites
    else {
      if (!isAlreadyFavorited) {
        return NextResponse.json({ success: true, action: 'not_found' });
      }
      
      try {
        // Remove all versions of this talk from favorites
        const updatedFavorites = existingFavoriteIds.filter((id: string) => 
          !talkIds.includes(id) && !talkIds.includes(`drafts.${id}`)
        );
        
        await client
          .patch(attendee._id)
          .set({ favoriteTalks: updatedFavorites.map((id: string) => ({ 
            _type: 'reference', 
            _ref: id 
          }))})
          .commit();
          
        return NextResponse.json({ success: true, action: 'removed' });
      } catch {
        return NextResponse.json({ 
          error: 'Failed to remove favorite',
          useLocalStorage: true
        }, { status: 200 }); // Return 200 so frontend can still use localStorage
      }
    }
  } catch (error) {
    console.error('Error handling favorites:', error);
    return NextResponse.json({ 
      error: 'Server error',
      useLocalStorage: true
    }, { status: 200 }); // Return 200 so frontend can still use localStorage
  }
}

export async function GET(request: NextRequest) {
  const email = getAuthenticatedUserEmail(request);
  const talkSlug = request.nextUrl.searchParams.get('talkSlug');
  
  // Check authentication early and return appropriate response for localStorage
  if (!email) {
    return NextResponse.json({
      useLocalStorage: true
    }, { status: 200 });
  }
  
  try {
    // For checking a specific talk's favorite status
    if (talkSlug) {
      // Get talk IDs for the slug
      const talk = await client.fetch<TalkDoc>(
        `*[_type == "talk" && slug.current == $talkSlug][0]{ _id }`,
        { talkSlug }
      );
      
      if (!talk) {
        return NextResponse.json({ isFavorite: false });
      }
      
      const talkId = talk._id;
      const cleanId = cleanReferenceId(talkId);
      
      // Check if user has favorited this talk
      const favorited = await client.fetch(
        `*[_type == "attendee" && attendeeEmail == $email && 
          count(favoriteTalks[_ref == $talkId || _ref == $cleanId]) > 0
        ][0]{ _id }`,
        { email, talkId, cleanId }
      );
      
      return NextResponse.json({ isFavorite: !!favorited });
    }
    
    // For getting all favorites
    const favorites = await client.fetch<FavoriteItem[]>(
      `*[_type == "attendee" && attendeeEmail == $email][0]{
        "favorites": favoriteTalks[]-> {
          _id,
          "slug": slug.current,
          title
        }
      }.favorites`,
      { email }
    );
    
    return NextResponse.json({ 
      favorites: (favorites || [])
        .filter((item: FavoriteItem) => item && item.slug)
        .map((item: FavoriteItem) => ({
          talkId: item._id,
          talkSlug: item.slug,
          title: item.title
        }))
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ 
      error: 'Server error',
      useLocalStorage: true
    }, { status: 200 }); // Return 200 so frontend can still use localStorage
  }
} 