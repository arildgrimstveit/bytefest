import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import slugify from "slugify";
import formidable from "formidable";
import { readFile } from "fs/promises";
import { IncomingMessage } from "http";
import { Readable } from "stream";
import type { ReadableStream as NodeReadableStream } from "stream/web";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function getIncomingMessageFromRequest(
  req: Request
): Promise<IncomingMessage> {
  if (!req.body) throw new Error("Request body is empty");
  const webStream = req.body as unknown as NodeReadableStream<Uint8Array>;
  const nodeStream = Readable.fromWeb(webStream);
  const headers = Object.fromEntries(req.headers.entries());
  const fakeReq = Object.assign(nodeStream, {
    headers,
    method: req.method,
    aborted: false,
    httpVersion: "1.1",
    httpVersionMajor: 1,
    httpVersionMinor: 1,
    connection: {},
  });
  return fakeReq as IncomingMessage;
}

async function parseFormData(
  req: Request
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const nodeReq = await getIncomingMessageFromRequest(req);
  const form = formidable({ multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

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
    const { fields, files } = await parseFormData(req);
    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const talkTime = Array.isArray(fields.talkTime)
      ? fields.talkTime[0]
      : fields.talkTime;
    const location = Array.isArray(fields.location)
      ? fields.location[0]
      : fields.location;
    const body = Array.isArray(fields.body) ? fields.body[0] : fields.body;
    const speakerId = Array.isArray(fields.speakerId)
      ? fields.speakerId[0]
      : fields.speakerId;

    if (!title || !talkTime || !location || !body || !speakerId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const bodyBlocks = convertToPortableText(body as string);
    const slug = slugify(title as string, { lower: true, strict: true });
    let imageRef: { asset: { _ref: string; _type: "reference" } } | undefined =
      undefined;

    if (files.image) {
      const imageFile = Array.isArray(files.image)
        ? files.image[0]
        : files.image;
      if (!imageFile.filepath && !imageFile.newFilename)
        throw new Error("Image file path is missing.");
      const imagePath = imageFile.filepath || imageFile.newFilename;
      const fileBuffer = await readFile(imagePath);
      const imageData = await client.assets.upload("image", fileBuffer, {
        contentType: imageFile.mimetype || "application/octet-stream",
        filename: imageFile.originalFilename || imageFile.newFilename,
      });
      imageRef = { asset: { _ref: imageData._id, _type: "reference" } };
    }

    // Generate a unique draft ID
    const draftId = `drafts.${slug}-${Date.now()}`;
    const newTalk = await client.create({
      _id: draftId,
      _type: "talk",
      title,
      slug: { current: slug },
      image: imageRef,
      talkTime,
      location,
      body: bodyBlocks,
      speaker: { _type: "reference", _ref: speakerId },
    });

    return NextResponse.json(
      { message: "Talk submitted successfully", talk: newTalk },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to submit talk:", error);
    return NextResponse.json(
      { error: "Failed to submit talk" },
      { status: 500 }
    );
  }
}
