import client from '@/sanityClient';
import FeedbackTalksList from '@/components/FeedbackFilters';
import type { Talk } from '@/types/talk';

export default async function FeedbackPage() {
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
    duration,
    tags
  }`;

  const talks: Talk[] = await client.fetch(query);
  const allTags = Array.from(new Set(talks.flatMap(talk => talk.tags || [])));

  return (
    <main className="min-h-screen py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-4xl lg:text-5xl argent text-[#F8F5D3]">Gi tilbakemelding</h1>
        </div>
        <div className="text-base sm:text-lg lg:text-xl argent text-white mb-8 sm:mb-10">
          <p className="leading-relaxed">
            Takk for at du deltok på Bytefest! Din tilbakemelding er verdifull for oss.
            Velg et foredrag nedenfor for å gi tilbakemelding på det.
          </p>
        </div>

        <FeedbackTalksList 
          talks={talks}
          availableTags={allTags}
        />
      </div>
    </main>
  );
} 