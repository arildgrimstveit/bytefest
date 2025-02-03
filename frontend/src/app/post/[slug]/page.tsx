import client from "@/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@sanity/types";

interface PostProps {
  params: { slug: string };
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  publishedAt: string;
  body: PortableTextBlock[];
}

export default async function PostDetail(props: PostProps) {
  const resolvedParams = await Promise.resolve(props.params);
  const slug = resolvedParams.slug;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "image": image.asset->url,
    publishedAt,
    body
  }`;

  const post: Post | null = await client.fetch(query, { slug });
  
  if (!post) {
    return <p className="text-center text-gray-500">Post not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="object-cover w-full h-64 rounded-lg"
      />
      <div className="mt-4 text-gray-700">
        <PortableText value={post.body} />
      </div>
      <p className="mt-6 text-gray-500 text-sm">
        Published on {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <Link href="/" className="block mt-4 text-blue-500 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "post"]{ slug }`;
  const posts: { slug: { current: string } }[] = await client.fetch(query);

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}
