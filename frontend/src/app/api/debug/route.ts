import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    projectId: process.env.SANITY_PROJECT_ID || "Not found",
    dataset: process.env.SANITY_DATASET || "Not found",
  });
}
