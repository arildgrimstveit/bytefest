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
    <div className="min-h-screen bg-[#161E38] text-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">Program</h1>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-gray-800">Date</th>
                <th className="py-2 px-4 border-b text-gray-800">Time</th>
                <th className="py-2 px-4 border-b text-gray-800">Talk</th>
                <th className="py-2 px-4 border-b text-gray-800">Speaker</th>
                <th className="py-2 px-4 border-b text-gray-800">Location</th>
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
                    <td className="py-2 px-4 border-b">{talk.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
