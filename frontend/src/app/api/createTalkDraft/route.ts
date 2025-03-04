import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import slugify from "slugify";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: "2023-01-01",
});

function convertToPortableText(text: string) {
  return [
    {
      _key: "block0",
      _type: "block",
      children: [{ _key: "span0", _type: "span", text }],
      markDefs: [],
      style: "normal",
    },
  ];
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, description, tags, duration, forkunnskap } = data;

    if (!title || !description || !tags || !duration || !forkunnskap) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const descriptionBlocks = convertToPortableText(description);
    const slug = slugify(title, { lower: true, strict: true });
    
    // Generate a unique draft ID
    const draftId = `drafts.${slug}-${Date.now()}`;
    
    const newTalk = await client.create({
      _id: draftId,
      _type: "talk",
      title,
      slug: { current: slug },
      description: descriptionBlocks,
      duration,
      forkunnskap,
      tags,
      publishedAt: new Date().toISOString(),
      speakers: [], // Initialize with empty speakers array
    });

    return NextResponse.json(
      { message: "Talk draft submitted successfully", talk: newTalk },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to submit talk draft:", error);
    return NextResponse.json(
      { error: "Failed to submit talk draft" },
      { status: 500 }
    );
  }
} 