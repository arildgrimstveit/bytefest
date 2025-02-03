import { useRouter } from "next/router";
import client from "../../sanityClient";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

const PostDetail = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
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
};

export async function getStaticPaths() {
  const query = `*[_type == "post"]{ slug }`;
  const posts = await client.fetch(query);

  const paths = posts.map((post) => ({
    params: { slug: post.slug.current },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "image": image.asset->url,
    publishedAt,
    body
  }`;
  const post = await client.fetch(query, { slug: params.slug });

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default PostDetail;
