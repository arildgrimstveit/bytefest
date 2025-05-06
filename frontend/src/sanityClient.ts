import { createClient, SanityClient } from "@sanity/client";

// Ensure environment variables are set in .env.local
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const sanityToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

// Log loaded config (optional but helpful for debugging)
console.log("Sanity Config Loaded:", {
  projectId: sanityProjectId ? 'Found' : 'NOT Found',
  dataset: sanityDataset ? 'Found' : 'NOT Found',
  token: sanityToken ? 'Found (ends with ' + sanityToken.slice(-4) + ')' : 'NOT Found'
});

// Basic validation to prevent client creation with missing essential config
if (!sanityProjectId || !sanityDataset) {
  throw new Error("Missing required Sanity environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID and/or NEXT_PUBLIC_SANITY_DATASET");
}

const client: SanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2023-01-01",
  useCdn: false,      
  token: sanityToken,
  ignoreBrowserTokenWarning: sanityToken ? true : false,
});

export default client;
