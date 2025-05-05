import { createClient } from "@sanity/client";

// Check for environment variables
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity project ID or dataset. Check your environment variables (.env.local?)."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-05-05",
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN
});

export default client;
