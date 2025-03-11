import client from "@/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Talk } from '@/types/talk';

interface TalkProps {
  params: Promise<{ slug: string }>;
}

export default async function TalkDetail(props: TalkProps) {
  const resolvedParams = await Promise.resolve(props.params);
  const slug = resolvedParams.slug;

  const query = `*[_type == "talk" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "speakerImage": speakers[0]->picture.asset->url,
    "speakerName": speakers[0]->name,
    "speakerEmail": speakers[0]->email,
    publishedAt,
    description,
    duration,
    tags,
    talkTime,
    forkunnskap
  }`;

  const talk: Talk | null = await client.fetch(query, { slug });

  if (!talk) {
    return <p className="text-center text-gray-700">Talk not found</p>;
  }

  // Fallback image if speaker image is not available
  const imageUrl = talk.speakerImage || '/images/LitenFisk.svg';
  const isFallbackImage = !talk.speakerImage;
  
  // Format duration display
  const durationDisplay = talk.duration ? 
    talk.duration.replace('min', ' MIN') : 
    '20 MIN'; // Default fallback
    
  // Format required knowledge level
  const getKnowledgeLevelText = (value: string | undefined) => {
    if (!value) return 'Ikke spesifisert';
    
    switch (value) {
      case 'none': return 'Ingen grad';
      case 'low': return 'Liten grad';
      case 'medium': return 'Middels grad';
      case 'high': return 'Stor grad';
      default: return value;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-99px)] items-center justify-center -mt-[99px] pt-[99px]">
      <div className="w-full max-w-4xl mx-auto my-8">
        <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20 break-words">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          {/* Header with title and talk time */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Foredrag</h1>
          </div>
          
          <div className="bg-[#F6EBD5] p-6 border-2 border-black">
            <h2 className="text-2xl font-medium mb-4 break-words overflow-hidden">{talk.title}</h2>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="flex items-center text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-sm">{durationDisplay}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M5 19V5H19V19H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm">Forkunnskap: {getKnowledgeLevelText(talk.forkunnskap)}</span>
              </div>
            </div>
            
            {/* Tags */}
            {talk.tags && talk.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {talk.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="flex items-center bg-[#161E38] text-white px-4 py-1 mb-2 max-w-[160px] sm:max-w-[200px] md:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Talk description */}
            <div className="prose max-w-none text-gray-700 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Om foredraget</h2>
              {talk.description ? (
                <PortableText value={talk.description} />
              ) : (
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t-2 border-black">
              <h3 className="font-medium mb-4">Foredragsholder:</h3>
              <div className="flex flex-col items-start sm:flex-row sm:items-center gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-black shrink-0 flex items-center justify-center">
                  <Image
                    src={imageUrl}
                    alt={talk.speakerName || talk.title}
                    width={128}
                    height={128}
                    className={isFallbackImage 
                      ? 'object-contain w-auto h-auto max-h-[70%] max-w-[70%]' 
                      : 'object-cover w-full h-full'
                    }
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-medium mb-2 break-words overflow-hidden">{talk.speakerName || 'Speaker TBA'}</h3>
                  <div className="flex flex-row items-end justify-start gap-2">
                    <Image
                      src="/images/Mail.svg"
                      alt="Mail"
                      width={16}
                      height={16}
                      className="shrink-0 w-3 h-3 sm:w-4 sm:h-4"
                    />
                    <span className="text-gray-700 text-xs sm:text-sm sm:text-base break-all translate-y-[2px]">{talk.speakerEmail || 'E-post ikke tilgjengelig'}</span>
                  </div>
                </div>
                <div className="absolute right-30 h-full hidden md:flex md:items-center">
                  <Image
                    src="/images/FargerikFisk.svg"
                    alt="FargerikFisk"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link href="/talks" className="inline-flex items-center text-gray-800 hover:text-gray-900">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Tilbake til program
            </Link>
          </div>
        </div>
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
