import { createClient, SanityClient } from "@sanity/client";

const client: SanityClient = createClient({
  projectId: "twav4yff",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

export default client;
