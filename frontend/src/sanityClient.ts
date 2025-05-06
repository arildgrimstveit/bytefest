import { createClient, type SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN ?? process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Missing required Sanity environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID, and NEXT_PUBLIC_SANITY_DATASET or SANITY_DATASET"
  );
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-05-05",
  useCdn: false,
  perspective: "previewDrafts",
  token,
  ignoreBrowserTokenWarning: Boolean(token),
});

export default client;
