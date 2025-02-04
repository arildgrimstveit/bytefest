import client from '@/sanityClient';
import TalkSearch from '@/components/TalkSearch';
import type { Talk } from '@/types/talk';

export default async function TalksPage() {
  const query = `*[_type == "talk"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "image": image.asset->url,
    publishedAt
  }`;

  const talks: Talk[] = await client.fetch(query);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Talks</h1>
      <TalkSearch talks={talks} />
    </div>
  );
}
