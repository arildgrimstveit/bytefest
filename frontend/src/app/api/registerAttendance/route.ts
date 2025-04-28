import { NextResponse } from "next/server";
import sanityClient from "@/sanityClient"; // Use default import for the client
import type { RegistrationSubmitData } from "@/app/paamelding/summary/page"; // Import the type

// Use unknown for incoming data type
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
    ["yes", "no", "digital"].includes(potentialData.wantsFood) &&
    Array.isArray(potentialData.dietaryNeeds) &&
    typeof potentialData.attendsParty === "string" &&
    ["yes", "no"].includes(potentialData.attendsParty) &&
    typeof potentialData.willPresent === "string" &&
    ["yes", "no"].includes(potentialData.willPresent) &&
    typeof potentialData.attendeeName === "string" && // Assuming name comes from frontend/SSO
    typeof potentialData.attendeeEmail === "string" // Assuming email comes from frontend/SSO
  );
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

    // Prepare the document to be created in Sanity
    const attendeeDocument = {
      _type: "attendee",
      attendeeName: data.attendeeName,
      attendeeEmail: data.attendeeEmail,
      bu: data.bu,
      participationLocation: data.participationLocation,
      wantsFood: data.wantsFood,
      dietaryNeeds: data.dietaryNeeds, // Directly pass the array of strings
      attendsParty: data.attendsParty,
      willPresent: data.willPresent,
      // Optional: Add registeredAt timestamp if schema supports it
      // registeredAt: new Date().toISOString(),
    };

    // Use the Sanity client to create the document
    console.log("Creating attendee document:", attendeeDocument);
    const createdAttendee = await sanityClient.create(attendeeDocument);
    console.log("Attendee document created:", createdAttendee);

    // Return a success response
    return NextResponse.json(
      { message: "Registration successful", attendeeId: createdAttendee._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating attendee document:", error);
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
