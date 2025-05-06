
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
          På Bytefest får du dypdykke i systemutvikling. 
          Kompetente kolleger fra ulike fagbakgrunner deler kunnskap de mener er viktig. 
          Her er det noe for enhver, enten du vil dykke dypere i ditt eget felt, 
          eller få en innføring i noe du ikke kan så godt fra før.
          </p>
          <br />
          <p>
          Fullstendig program med tid og sted, kommer nærmere arrangementet.
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