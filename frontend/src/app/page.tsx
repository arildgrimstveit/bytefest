import client from '@/sanityClient';
import PostSearch from '@/components/PostSearch';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  publishedAt: string;
}

export default async function Home() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "image": image.asset->url,
    publishedAt
  }`;

  const posts: Post[] = await client.fetch(query);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold font-sans text-center my-6">
        Hva skjer på Bytefest?
      </h1>
      <PostSearch posts={posts} />
    </div>
  );
}
