import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2023-01-01",
});

export async function GET() {
  const speakers = await client.fetch(`*[_type == "speaker"]{_id, name}`);
  return NextResponse.json({ speakers });
}
