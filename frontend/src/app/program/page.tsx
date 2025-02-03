import client from '@/sanityClient';
import Link from 'next/link';

interface ProgramPost {
  _id: string;
  title: string;
  slug: { current: string };
  talkTime: string;
  presenter: string;
  location: string;
}

export default async function Program() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    talkTime,
    presenter,
    location
  }`;

  const posts: ProgramPost[] = await client.fetch(query);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Program</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Talk</th>
            <th className="py-2 px-4 border-b">Presenter</th>
            <th className="py-2 px-4 border-b">Location</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="text-center">
              <td className="py-2 px-4 border-b">{post.talkTime}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/post/${post.slug.current}`} className="text-blue-500 hover:underline">
                  {post.title}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">{post.presenter}</td>
              <td className="py-2 px-4 border-b">{post.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
