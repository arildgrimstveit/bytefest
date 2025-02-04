import client from '@/sanityClient';
import Image from 'next/image';
import Link from 'next/link';
import type { Speaker } from '@/types/speaker';

interface SpeakerProps {
  params: { slug: string };
}

interface Talk {
  _id: string;
  title: string;
  slug: { current: string };
  talkTime: string;
}

export default async function SpeakerDetail(props: SpeakerProps) {
  const resolvedParams = await Promise.resolve(props.params);
  const slug = resolvedParams.slug;

  const query = `*[_type == "speaker" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    "picture": picture.asset->url,
    summary,
    "talks": *[_type == "talk" && references(^._id)]{
      _id,
      title,
      slug,
      talkTime
    }
  }`;

  const speaker: Speaker & { talks: Talk[] } | null = await client.fetch(query, { slug });

  if (!speaker) {
    return <p className="text-center text-gray-500">Speaker not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col items-center text-center">
        <div className="h-32 w-32 relative rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src={speaker.picture}
            alt={speaker.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold mt-4">{speaker.name}</h1>
      </div>

      <div className="mt-6 p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">About {speaker.name}</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">{speaker.summary}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Talks by {speaker.name}</h2>
        <ul className="mt-4 space-y-4">
          {speaker.talks.map((talk) => (
            <li key={talk._id} className="border-b pb-2">
              <Link href={`/talks/${talk.slug.current}`} className="text-blue-500 hover:underline">
                {talk.title}
              </Link>
              <p className="text-gray-500 text-sm">
                {new Date(talk.talkTime).toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/speakers" className="block mt-6 text-blue-500 hover:underline">
        ← Back to Speakers
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "speaker"]{ slug }`;
  const speakers: { slug: { current: string } }[] = await client.fetch(query);

  return speakers.map((speaker) => ({
    slug: speaker.slug.current,
  }));
}
