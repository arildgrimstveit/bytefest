import client from '../sanityClient';
import PostCard from '../components/PostCard';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Program</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "image": image.asset->url,
    publishedAt
  }`;

  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}
