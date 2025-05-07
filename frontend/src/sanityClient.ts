import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = "2024-05-05"; // Use a specific API version

// Token for server-side operations requiring write access or privileged reads.
// This token should have appropriate permissions (e.g., Editor role).
// IMPORTANT: This variable is NOT prefixed with NEXT_PUBLIC_ and is only available server-side.
const serverToken = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Sanity config error: Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET environment variables."
  );
}

// Default client for client-side usage (browser).
// This client typically does not include a token for security reasons,
// limiting it to read operations on public data or based on dataset ACLs.
const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster reads
  perspective: "published", // Default to querying published documents
  // No token here: unauthenticated access for client-side.
});

export default client;

// Authenticated client for server-side operations (e.g., in API routes).
// This client uses the serverToken and should be used for mutations (create, update, delete)
// or for reading data that requires authentication (e.g., drafts, private data).
export const sanityClientWithToken = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Typically false for writes or to ensure freshest data for privileged reads
  perspective: "published", // Can be overridden to 'previewDrafts' if needed for specific server use cases
  token: serverToken, 
  ignoreBrowserTokenWarning: true // Suppresses warning as this client is intended for server-side only
});
