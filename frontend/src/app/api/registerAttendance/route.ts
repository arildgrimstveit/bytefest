import { NextResponse } from "next/server";
import sanityClient from "@/sanityClient"; // Use default import for the client
import type { RegistrationSubmitData } from "@/types/registration"; // Import from new location

function isValidRegistrationData(
  data: unknown
): data is RegistrationSubmitData {
  // Check if data is an object and not null before accessing properties
  if (typeof data !== "object" || data === null) {
    return false;
  }

  // Explicitly check each property's existence and type
  const potentialData = data as Record<string, unknown>; // Cast for property access

  return (
    typeof potentialData.bu === "string" &&
    potentialData.bu.trim() !== "" &&
    typeof potentialData.participationLocation === "string" &&
    potentialData.participationLocation.trim() !== "" &&
    typeof potentialData.wantsFood === "string" &&
    ["yes", "no", "digital"].includes(potentialData.wantsFood as string) && // Added type assertion for safety
    Array.isArray(potentialData.dietaryNeeds) &&
    potentialData.dietaryNeeds.every(item => typeof item === 'string') && // Ensure all items in array are strings
    typeof potentialData.attendsParty === "string" &&
    ["yes", "no"].includes(potentialData.attendsParty as string) && // Added type assertion
    typeof potentialData.willPresent === "string" &&
    ["yes", "no"].includes(potentialData.willPresent as string) && // Added type assertion
    typeof potentialData.attendeeName === "string" && // Assuming name comes from frontend/SSO
    typeof potentialData.attendeeEmail === "string" && // Assuming email comes from frontend/SSO
    // localFavoriteSlugs is optional, but if present, should be an array of strings
    (potentialData.localFavoriteSlugs === undefined || 
     (Array.isArray(potentialData.localFavoriteSlugs) && 
      potentialData.localFavoriteSlugs.every(item => typeof item === 'string')))
  );
}

// Helper to clean talk IDs (remove drafts. prefix)
function cleanTalkId(id: string): string {
  return id.replace(/^drafts\./, '');
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate incoming data
    if (!isValidRegistrationData(data)) {
      console.error("Invalid registration data received:", data);
      return NextResponse.json(
        { error: "Invalid registration data" },
        { status: 400 }
      );
    }

    // Fields that can be submitted via the registration form
    const formFields = {
        attendeeName: data.attendeeName,
        attendeeEmail: data.attendeeEmail,
        bu: data.bu,
        participationLocation: data.participationLocation,
        wantsFood: data.wantsFood,
        dietaryNeeds: data.dietaryNeeds,
        attendsParty: data.attendsParty,
        willPresent: data.willPresent,
        registeredAt: new Date().toISOString(), // Always update/set registration timestamp
    };

    const attendeeId = `attendee.${data.attendeeEmail.replace(/[^a-zA-Z0-9]/g, '-')}`;

    // Check if an attendee with this email already exists
    const existingAttendee = await sanityClient.fetch(
      `*[_type == "attendee" && attendeeEmail == $email][0]{_id, "favoriteTalks": favoriteTalks[]._ref}`,
      { email: data.attendeeEmail }
    );

    let savedAttendee;
    let migratedFavoriteCount = 0;
    
    if (existingAttendee) {
      console.log(`Updating existing attendee document with ID ${existingAttendee._id}`);
      // For updates, we currently don't merge localFavoriteSlugs here to keep it simple.
      // The main purpose of this endpoint is registration data. Favorite management is separate.
      // If localFavoriteSlugs were provided, they are ignored for existing users via this endpoint.
      savedAttendee = await sanityClient
        .patch(existingAttendee._id) // Use the fetched ID, which is the published one
        .set(formFields) 
        .commit();
      
      console.log("Attendee document updated:", savedAttendee);
    } else {
      console.log(`Creating new attendee document with ID: ${attendeeId}`);
      let initialFavoriteReferences: {_type: string, _ref: string, _key: string}[] = [];

      if (data.localFavoriteSlugs && data.localFavoriteSlugs.length > 0) {
        console.log("Attempting to migrate localFavoriteSlugs:", data.localFavoriteSlugs);
        const uniqueLocalSlugs = [...new Set(data.localFavoriteSlugs)];
        // Fetch talk documents for these slugs to get their actual _ids
        const talks = await sanityClient.fetch<{_id: string, slug: {current: string}}[]>(
          `*[_type == "talk" && slug.current in $slugs]{_id, "slug": slug.current}`,
          { slugs: uniqueLocalSlugs }
        );

        if (talks && talks.length > 0) {
          initialFavoriteReferences = talks.map(talk => {
            const cleanedId = cleanTalkId(talk._id);
            return ({ _type: 'reference', _ref: cleanedId, _key: cleanedId });
          });
          migratedFavoriteCount = initialFavoriteReferences.length;
          console.log(`Successfully mapped ${migratedFavoriteCount} local slugs to talk references.`);
        } else {
          console.log("No matching talk documents found for localFavoriteSlugs.");
        }
      }

      // For new attendees, include _type, _id and initialize favoriteTalks
      const newAttendeeDocument = {
        _type: "attendee",
        _id: attendeeId,
        ...formFields,
        favoriteTalks: initialFavoriteReferences, 
      };
      savedAttendee = await sanityClient.createOrReplace(newAttendeeDocument);
      console.log("Attendee document created:", savedAttendee);
    }

    // Return a success response
    return NextResponse.json(
      { 
        message: "Registration successful", 
        attendeeId: savedAttendee._id,
        migratedFavorites: migratedFavoriteCount // Inform client how many were migrated
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration process:", error);
    // Return an error response
    return NextResponse.json(
      {
        error: "Failed to submit registration",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
