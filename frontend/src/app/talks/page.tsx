import client from '@/sanityClient';
import TalkCard from '@/components/TalkCard';
import type { Talk } from '@/types/talk';

export default async function TalksPage() {
  // Updated query to include tags instead of location
  const query = `*[_type == "talk"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "speakerImage": speakers[0]->picture.asset->url,
    "speakerName": speakers[0]->name,
    publishedAt,
    duration,
    tags
  }`;

  const talks: Talk[] = await client.fetch(query);

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-5xl argent text-white mb-4">Foredrag</h1>
        </div>

        {talks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-300">Ingen foredrag funnet. Kom tilbake senere for oppdateringer.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {talks.map((talk) => (
              <TalkCard key={talk._id} talk={talk} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}