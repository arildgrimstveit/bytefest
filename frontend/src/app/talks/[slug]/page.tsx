import client from "@/sanityClient";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Talk } from '@/types/talk';

interface TalkProps {
  params: { slug: string };
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
    
  // Format talk time
  const talkTimeDisplay = talk.talkTime ? 
    new Date(talk.talkTime).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' }) : 
    null;
    
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
    <div className="min-h-screen text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header with title and talk time */}
          <div className="mb-8">
            {talkTimeDisplay && (
              <p className="text-sm text-gray-400 mb-1">{talkTimeDisplay}</p>
            )}
            <h1 className="text-3xl font-bold text-white">{talk.title}</h1>
          </div>
          
          <div className="bg-[#F6EBD5] border border-gray-700 shadow-lg mb-8">
            <div className="p-6">
              {/* Speaker and talk info */}
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                {/* Speaker image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={talk.speakerName || talk.title}
                    width={128}
                    height={128}
                    className={isFallbackImage 
                      ? 'object-contain w-auto h-auto max-h-[70%] max-w-[70%] mx-auto mt-4' 
                      : 'object-cover w-full h-full'
                    }
                  />
                </div>
                
                {/* Speaker and talk details */}
                <div className="flex-1">
                  <p className="text-lg text-gray-700 mb-4">{talk.speakerName || 'Speaker TBA'}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span className="text-sm">{durationDisplay}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M8 9h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M9 4.5H5C3.89543 4.5 3 5.39543 3 6.5V19.5C3 20.6046 3.89543 21.5 5 21.5H19C20.1046 21.5 21 20.6046 21 19.5V6.5C21 5.39543 20.1046 4.5 19 4.5H15" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 2.5L12 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-sm">Forkunnskap: {getKnowledgeLevelText(talk.forkunnskap)}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {talk.tags && talk.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {talk.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-block bg-white text-xs font-medium px-2 py-1 rounded text-gray-700 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Talk description */}
              <div className="prose max-w-none text-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Om foredraget</h2>
                {talk.description ? (
                  <PortableText value={talk.description} />
                ) : (
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                  </p>
                )}
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-300">
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
