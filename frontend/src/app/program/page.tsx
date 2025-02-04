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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Program</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Talk</th>
            <th className="py-2 px-4 border-b">Speaker</th>
            <th className="py-2 px-4 border-b">Location</th>
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
              <tr key={talk._id} className="text-center">
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
  );
}
