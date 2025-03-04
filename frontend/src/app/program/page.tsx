import client from '@/sanityClient';
import Link from 'next/link';
import type { TalkProgram } from '@/types/talkProgram';

export default async function Program() {
  const query = `*[_type == "talk"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    talkTime,
    speaker->{name},
    location
  }`;

  const talks: TalkProgram[] = await client.fetch(query);

  return (
    <div className="text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl argent text-center mb-10">Program</h1>
        
        {/* Table for larger screens - hidden on mobile */}
        <div className="relative hidden md:block">
          <div className="absolute bg-yellow-400 w-full h-full top-1 left-1"></div>
          <div className="bg-white overflow-hidden shadow-lg relative z-10">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-gray-800">Dato</th>
                  <th className="py-2 px-4 border-b text-gray-800">Tidspunkt</th>
                  <th className="py-2 px-4 border-b text-gray-800">Foredrag</th>
                  <th className="py-2 px-4 border-b text-gray-800">Foredragsholder</th>
                </tr>
              </thead>
              <tbody>
                {talks.map((talk) => {
                  const dateObj = new Date(talk.talkTime);
                  const formattedDate = dateObj.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  });

                  const formattedTime = dateObj.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <tr key={talk._id} className="text-center text-gray-800">
                      <td className="py-2 px-4 border-b">{formattedDate}</td>
                      <td className="py-2 px-4 border-b">{formattedTime}</td>
                      <td className="py-2 px-4 border-b">
                        <Link href={`/talks/${talk.slug.current}`} className="text-blue-500 hover:underline">
                          {talk.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">{talk.speaker?.name || "Unknown Speaker"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Card layout for mobile screens */}
        <div className="md:hidden space-y-4">
          {talks.map((talk) => {
            const dateObj = new Date(talk.talkTime);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "2-digit",
              year: "numeric",
            });

            const formattedTime = dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div key={talk._id} className="relative">
                <div className="absolute bg-yellow-400 w-full h-full top-1 left-1"></div>
                <div className="bg-white p-4 shadow-lg relative z-10 text-gray-800">
                  <div className="flex justify-between mb-2 text-sm font-medium">
                    <span>{formattedDate}</span>
                    <span>{formattedTime}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    <Link href={`/talks/${talk.slug.current}`} className="text-blue-500 hover:underline">
                      {talk.title}
                    </Link>
                  </h3>
                  <p>
                    <span className="text-gray-600">Foredragsholder: </span>
                    {talk.speaker?.name || "Unknown Speaker"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
