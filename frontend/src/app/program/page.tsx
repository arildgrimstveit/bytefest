import client from '@/sanityClient'
import ProgramTalkCard from '@/components/ProgramTalkCard';
import type { Talk } from '@/types/talk';

export default async function Program() {
  // Fetch speaker fields directly as defined in the schema
  const query = `*[_type == "talk"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    speakers[]{
      _key,
      name,
      email,
      picture {
        asset->{
          url
        }
      }
    },
    publishedAt,
    tags,
    duration
  }`;

  const talks: Talk[] = await client.fetch(query);

  // Check if talks array is empty and render a message if so
  if (!talks || talks.length === 0) {
    return (
      <div className="text-white py-10 bg-[#161E38]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl argent text-center mb-10">Program</h1>
          <p>Ingen foredrag funnet. Vennligst sjekk Sanity-konfigurasjonen og om foredrag er publisert.</p>
        </div>
      </div>
    );
  }

  // If talks are found, render the grid
  return (
    <div className="text-white py-12 bg-[#161E38]">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-5xl argent text-center mb-10">Program</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {talks.map((talk) => (
            <ProgramTalkCard key={talk._id} talk={talk} />
          ))}
        </div>

      </div>
    </div>
  );
}
