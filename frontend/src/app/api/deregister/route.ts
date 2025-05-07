import { NextResponse } from "next/server";
import { sanityClientWithToken } from "@/sanityClient";
import { cookies } from "next/headers"; // For reading cookies in App Router

// Helper to get authenticated user email from the cookie
async function getAuthenticatedUserEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("userEmail")?.value || null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {
  const userEmail = await getAuthenticatedUserEmail();

  if (!userEmail) {
    return NextResponse.json(
      { error: "User not authenticated for deregistration." },
      { status: 401 }
    );
  }

  try {
    // Find the attendee document by email to get its _id for deletion
    // It's safer to delete by _id found via authenticated user's email 
    // than to trust an _id sent from the client.
    const attendee = await sanityClientWithToken.fetch< { _id: string } | null >(
      `*[_type == "attendee" && attendeeEmail == $email][0]{_id}`,
      { email: userEmail }
    );

    if (!attendee || !attendee._id) {
      return NextResponse.json(
        { error: "Registration not found for this user." },
        { status: 404 } 
      );
    }

    console.log(`[API Info] Attempting to delete registration for attendee ID: ${attendee._id}`);
    await sanityClientWithToken.delete(attendee._id);
    console.log(`[API Info] Successfully deleted registration: ${attendee._id}`);

    return NextResponse.json({ message: "Deregistration successful" }, { status: 200 });

  } catch (error) {
    console.error("[API Error] Error during deregistration:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to deregister.", details: errorMessage },
      { status: 500 }
    );
  }
} 