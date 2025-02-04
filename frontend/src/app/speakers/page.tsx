import client from '@/sanityClient';
import SpeakerSearch from '@/components/SpeakerSearch';
import type { Speaker } from '@/types/speaker';

export default async function SpeakersPage() {
  const query = `*[_type == "speaker"] | order(name asc) {
    _id,
    name,
    slug,
    "picture": picture.asset->url
  }`;

  const speakers: Speaker[] = await client.fetch(query);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Speakers</h1>
      <SpeakerSearch speakers={speakers} />
    </div>
  );
}
