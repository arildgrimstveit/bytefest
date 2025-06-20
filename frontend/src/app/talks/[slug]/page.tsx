import client from "@/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Talk } from '@/types/talk';
import FavoriteButtonWrapper from './favorite-button-wrapper';
import ShareButton from './ShareButton';
import FeedbackForm from '@/components/FeedbackForm';

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#161E38] text-white px-4 py-2 text-sm uppercase inline-block">
      {children}
    </div>
  );
}

interface TalkPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TalkDetail({ params: paramsProxy, searchParams: searchParamsProxy }: TalkPageProps) {
  const { slug } = await paramsProxy;

  if (searchParamsProxy) {
    await searchParamsProxy;
  }

  const query = `*[_type == "talk" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    speakers[]{
      _key,
      name,
      email,
      picture { asset->{url} }
    },
    publishedAt,
    description,
    duration,
    tags,
    forkunnskap,
    location
  }`;

  const talk: Talk | null = await client.fetch(query, { slug });

  if (!talk) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2A1449]">
        <div className="p-8 text-white">Foredraget ble ikke funnet</div>
      </div>
    );
  }

  // Format duration display
  const durationDisplay = talk.duration ?
    talk.duration.replace('min', ' MIN') :
    '20 MIN'; // Default fallback

  // Format required knowledge level
  const getKnowledgeLevelText = (value: string | undefined) => {
    if (!value) return 'Ikke spesifisert';

    switch (value) {
      case 'none': return 'Har ikke hørt om temaet';
      case 'low': return 'Kjenner til temaet';
      case 'medium': return 'Har jobbet med temaet';
      case 'high': return 'Har bred erfaring med teamet';
      default: return value;
    }
  };

  // Fetch similar talks based on tags  
  let similarTalks: Talk[] = [];
  if (talk.tags && talk.tags.length > 0) {
    const similarQuery = `*[_type == "talk" && _id != $talkId && count((tags)[@ in $tags]) > 0] | order(count((tags)[@ in $tags]) desc)[0...3]{
      _id,
      title,
      slug,
      speakers[]{
        _key,
        name,
        picture { asset->{url} }
      },
      tags
    }`;

    similarTalks = await client.fetch(similarQuery, {
      talkId: talk._id,
      tags: talk.tags
    });
  }

  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/talks" className="text-[#2A1449] flex items-center mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Tilbake
        </Link>

        <div className="relative bg-[#F6EBD5] pt-8 pb-10 px-6 sm:pt-10 sm:pb-12 sm:px-10 md:pt-12 md:pb-16 md:px-16 shadow-lg font-plex">
          <div className="flex flex-col">
            {/* Time/location indicators with favorite button aligned */}
            <div className="flex justify-between items-center mb-4 text-[#2A1449]">
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{durationDisplay}</span>
                </div>
                <div className="flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>{talk.location || 'TBA'}</span>
                </div>
              </div>

              {/* Star/favorite button aligned with time/location */}
              <div>
                <FavoriteButtonWrapper talkSlug={talk.slug.current} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl argent text-[#2A1449] mb-6 mt-3">
              {talk.title}
            </h1>

            {/* Talk description */}
            <div className="max-w-none mb-8">
              {talk.description ? (
                <PortableText value={talk.description} />
              ) : (
                <p>
                  Informasjon om foredraget kommer snart.
                </p>
              )}
            </div>

            {/* Tiltenkt publikum */}
            <div className="mb-6">
              <h2 className="text-3xl iceland mb-2">Tiltenkt publikum</h2>
              <p className="text-[#2A1449]">{getKnowledgeLevelText(talk.forkunnskap)}</p>
            </div>

            {/* Tags */}
            {talk.tags && talk.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-3xl iceland mb-2">Tags</h2>
                <div className="flex flex-wrap gap-3">
                  {talk.tags.map((tag, index) => (
                    <Tag key={index}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Speaker information */}
            {talk.speakers && talk.speakers.length > 0 && (
              <div className="mt-8">
                {talk.speakers.map((speaker) => {
                  const speakerImageUrl = speaker?.picture?.asset?.url;
                  const speakerImage = speakerImageUrl || '/images/LitenFisk.svg';
                  const isFallback = !speakerImageUrl;

                  return (
                    <div key={speaker?._key || speaker?.name} className="flex flex-col sm:flex-row sm:items-center gap-6">
                      {/* Speaker image */}
                      <div className="relative flex-shrink-0" style={{ filter: "drop-shadow(4px 4px 0px #ffaf35)" }}>
                        <div className="relative w-32 h-32 sm:w-48 sm:h-48 border-2 border-[#2A1449] overflow-hidden bg-[#2A1449]">
                          <Image
                            src={speakerImage}
                            alt={speaker?.name || 'Speaker'}
                            width={400}
                            height={400}
                            className={isFallback ? 'object-contain p-4' : 'object-cover w-full h-full'}
                            quality={100}
                          />
                        </div>
                      </div>

                      {/* Speaker details */}
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-2xl iceland text-[#2A1449] mb-2">{speaker?.name || 'Speaker TBA'}</h3>
                        {speaker?.email && (
                          <div className="flex items-center">
                            <Image
                              src="/images/Mail.svg"
                              alt="Mail"
                              width={16}
                              height={16}
                              className="shrink-0 w-4 h-4 mr-2"
                            />
                            <span className="text-sm text-[#2A1449]">{speaker.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Feedback Form */}
            <div className="mt-8 pt-8">
              <FeedbackForm 
                talkId={talk._id} 
                talkTitle={talk.title || 'Ukjent foredrag'} 
                shareButton={<ShareButton />}
              />
            </div>
          </div>
        </div>

        {/* Similar talks */}
        {similarTalks.length > 0 && (
          <div className="mt-12 text-center">
            <h2 className="text-3xl iceland text-white mb-8">Lignende foredrag</h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
                {similarTalks.map(similarTalk => (
                  <Link key={similarTalk._id} href={`/talks/${similarTalk.slug?.current}`} className="block group pt-2 pl-2">
                    <div className="relative h-full">
                      {/* Orange backdrop */}
                      <div className="absolute bg-[#ffaf35] top-0 left-0 w-full h-full -z-10"></div>

                      {/* Main card container */}
                      <div className="relative h-full flex flex-col bg-[#2A1449] -translate-y-1 -translate-x-1 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">

                        {/* Image Container */}
                        <div className="flex-grow relative min-h-[200px] bg-[#2A1449] overflow-hidden">
                          {similarTalk.speakers && similarTalk.speakers[0]?.picture?.asset?.url ? (
                            <Image
                              src={similarTalk.speakers[0].picture.asset.url}
                              alt={similarTalk.speakers[0]?.name ? `Photo of ${similarTalk.speakers[0].name}` : (similarTalk.title || 'Similar talk image')}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Image
                                src="/images/LitenFisk.svg"
                                alt=""
                                width={90}
                                height={90}
                                className="object-contain"
                                style={{ imageRendering: 'pixelated' }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Content Area */}
                        <div className="bg-[#F6EBD5] w-full">
                          <div className="p-5 relative text-left">
                            <h3 className="text-xl iceland text-[#2A1449] leading-tight text-left">
                              {similarTalk.title}
                            </h3>

                            {similarTalk.speakers && similarTalk.speakers[0]?.name && (
                              <p className="text-lg iceland text-[#2A1449] text-left">
                                {similarTalk.speakers[0].name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "talk"]{ slug }`;
  const talks: { slug: { current: string } }[] = await client.fetch(query);

  return talks.map((talk) => ({
    slug: talk.slug.current,
  }));
}