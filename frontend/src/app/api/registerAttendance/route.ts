import { NextResponse } from "next/server";
import { sanityClientWithToken as sanityClient } from "@/sanityClient";
import type { RegistrationSubmitData } from "@/types/registration";

function isValidRegistrationData(
  data: unknown
): data is RegistrationSubmitData {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const potentialData = data as Record<string, unknown>;
  return (
    typeof potentialData.bu === "string" &&
    potentialData.bu.trim() !== "" &&
    typeof potentialData.participationLocation === "string" &&
    potentialData.participationLocation.trim() !== "" &&
    typeof potentialData.wantsFood === "string" &&
    ["yes", "no", "digital"].includes(potentialData.wantsFood as string) &&
    Array.isArray(potentialData.dietaryNeeds) &&
    potentialData.dietaryNeeds.every(item => typeof item === 'string') &&
    typeof potentialData.attendsParty === "string" &&
    ["yes", "no"].includes(potentialData.attendsParty as string) &&
    typeof potentialData.willPresent === "string" &&
    ["yes", "no"].includes(potentialData.willPresent as string) &&
    typeof potentialData.attendeeName === "string" &&
    typeof potentialData.attendeeEmail === "string" &&
    (potentialData.localFavoriteSlugs === undefined || 
     (Array.isArray(potentialData.localFavoriteSlugs) && 
      potentialData.localFavoriteSlugs.every(item => typeof item === 'string')))
  );
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!isValidRegistrationData(data)) {
      console.error("[API Error] Invalid registration data received:", data);
      return NextResponse.json(
        { error: "Invalid registration data" },
        { status: 400 }
      );
    }

    const formFields = {
        attendeeName: data.attendeeName,
        attendeeEmail: data.attendeeEmail,
        bu: data.bu,
        participationLocation: data.participationLocation,
        wantsFood: data.wantsFood,
        dietaryNeeds: data.dietaryNeeds,
        attendsParty: data.attendsParty,
        willPresent: data.willPresent,
        registeredAt: new Date().toISOString(),
    };

    const attendeeId = `attendee-${data.attendeeEmail.replace(/[^a-zA-Z0-9]/g, '-')}`;

    const existingAttendee = await sanityClient.fetch(
      `*[_type == "attendee" && attendeeEmail == $email][0]{_id}`, // Only need _id for existence check and patch
      { email: data.attendeeEmail }
    );

    let savedAttendee;
    let migratedFavoriteCount = 0; // Retain for response, though not actively used here
    
    if (existingAttendee) {
      savedAttendee = await sanityClient
        .patch(existingAttendee._id)
        .set(formFields)
        .commit();
      console.log(`[API Info] Attendee document updated: ${savedAttendee._id}`);
    } else {
      let initialFavoriteReferences: {_type: string, _ref: string, _key: string}[] = [];
      // Logic for migrating localFavoriteSlugs - keep if this is a desired feature for new users
      if (data.localFavoriteSlugs && data.localFavoriteSlugs.length > 0) {
        const uniqueLocalSlugs = [...new Set(data.localFavoriteSlugs)];
        const talks = await sanityClient.fetch<{_id: string, slug: {current: string}}[]>( // Explicit type for fetched talks
          `*[_type == "talk" && slug.current in $slugs && !(_id in path("drafts.**"))]{_id, "slug": slug.current}`,
          { slugs: uniqueLocalSlugs }
        );

        if (talks && talks.length > 0) {
          const uniqueTalkReferencesMap = new Map<string, {_type: string, _ref: string, _key: string}>();
          talks.forEach((talk) => { // Removed explicit type for talk here as it's inferred
            const cleanedId = talk._id.replace(/^drafts\./, ''); // Inlined cleanTalkId
            if (!uniqueTalkReferencesMap.has(cleanedId)) {
              uniqueTalkReferencesMap.set(cleanedId, { 
                _type: 'reference', 
                _ref: cleanedId, 
                _key: cleanedId 
              });
            }
          });
          initialFavoriteReferences = Array.from(uniqueTalkReferencesMap.values());
          migratedFavoriteCount = initialFavoriteReferences.length;
        }
      }

      const newAttendeeDocument = {
        _type: "attendee",
        _id: attendeeId,
        ...formFields,
        favoriteTalks: initialFavoriteReferences, 
      };
      savedAttendee = await sanityClient.createOrReplace(newAttendeeDocument);
      console.log(`[API Info] Attendee document created: ${savedAttendee._id}`);
    }

    return NextResponse.json(
      { 
        message: "Registration successful", 
        attendeeId: savedAttendee._id,
        migratedFavorites: migratedFavoriteCount 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API Error] Error during registration process:", error);
    // Simplify error logging, avoid exposing too many details unless in dev mode
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    const errorDetails = process.env.NODE_ENV === "development" && error instanceof Error && (error as any).response?.body 
                         ? (error as any).response.body 
                         : undefined;

    return NextResponse.json(
      {
        error: "Failed to submit registration",
        details: errorMessage,
        ...(errorDetails && { sanityError: errorDetails }) // Conditionally add Sanity error details in dev
      },
      { status: 500 }
    );
  }
}
