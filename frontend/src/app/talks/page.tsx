
import client from '@/sanityClient';
import TalkFilters from '@/components/TalkFilters';
import type { Talk } from '@/types/talk';

export default async function TalksPage() {
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
  const allTags = Array.from(new Set(talks.flatMap(talk => talk.tags || [])));

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-5xl argent text-[#F8F5D3]">Alle foredrag</h1>
        </div>
        <div className="text-xl argent text-white mb-6">
          <p>
            Bli med på en spennende reise inn i systemutviklingens verden! På Bytefest vil foredragsholderne fra Sopra Steria dele sine unike innsikter og erfaringer, og gi deg nye perspektiver som kan inspirere deg til å tenke kreativt og innovativt.
          </p>
        </div>

        <TalkFilters 
          talks={talks}
          availableTags={allTags}
        />
      </div>
    </main>
  );
}