import client from '@/sanityClient'
import ProgramLocationFilter from '@/components/ProgramLocationFilter';
import type { Talk } from '@/types/talk';
import { cookies } from 'next/headers';

export default async function Program() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get('userEmail')?.value;

  // Fetch talks with location
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
    location
  }`;

  const talks: Talk[] = await client.fetch(query);

  // Get user's location if logged in
  let defaultLocation = 'Oslo';
  if (userEmail) {
    const attendeeQuery = `*[_type == "attendee" && attendeeEmail == $email][0]{
      participationLocation
    }`;
    const attendee = await client.fetch(attendeeQuery, { email: userEmail });
    if (attendee?.participationLocation) {
      defaultLocation = attendee.participationLocation;
    }
  }

  // Check if talks array is empty and render a message if so
  if (!talks || talks.length === 0) {
    return (
      <div className="text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl argent text-center mb-10">Program</h1>
          <p>Ingen foredrag funnet.</p>
        </div>
      </div>
    );
  }

  // If talks are found, render the grid with location filter
  return (
    <div className="text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-5xl argent text-center mb-10">Program</h1>
        <ProgramLocationFilter talks={talks} defaultLocation={defaultLocation} />
      </div>
    </div>
  );
}
