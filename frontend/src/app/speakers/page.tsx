import client from '@/sanityClient';
import SpeakerCard from '@/components/SpeakerCard';

interface Speaker {
  _id: string;
  name: string;
  summary: string;
  "picture": string; // URL to the speaker's image
}

export default async function Speakers() {
  const query = `*[_type == "speaker"] | order(name asc) {
    _id,
    name,
    summary,
    "picture": picture.asset->url
  }`;

  const speakers: Speaker[] = await client.fetch(query);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Speakers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker._id} speaker={speaker} />
        ))}
      </div>
    </div>
  );
}
