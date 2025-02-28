import client from "@/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Talk } from '@/types/talk';

interface TalkProps {
  params: { slug: string };
}

export default async function TalkDetail(props: TalkProps) {
  const resolvedParams = await Promise.resolve(props.params);
  const slug = resolvedParams.slug;

  const query = `*[_type == "talk" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "image": image.asset->url,
    publishedAt,
    body
  }`;

  const talk: Talk | null = await client.fetch(query, { slug });

  if (!talk) {
    return <p className="text-center text-gray-500">Talk not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">{talk.title}</h1>
      <Image
        src={talk.image}
        alt={talk.title}
        width={800}
        height={400}
        className="object-cover w-full h-64 rounded-lg"
      />
      <div className="mt-4 text-gray-700 text-white">
        <PortableText value={talk.body} />
      </div>
      <p className="mt-6 text-white text-sm">
        Published on {new Date(talk.publishedAt).toLocaleDateString()}
      </p>
      <Link href="/talks" className="block mt-4 text-blue-500 hover:underline">
        ← Back to Talks
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "talk"]{ slug }`;
  const talks: { slug: { current: string } }[] = await client.fetch(query);

  return talks.map((talk) => ({
    slug: talk.slug.current,
  }));
}
