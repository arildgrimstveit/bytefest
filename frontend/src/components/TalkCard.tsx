import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { Talk } from '@/types/talk';

interface TalkCardProps {
  talk: Talk;
}

const TalkCard: FC<TalkCardProps> = ({ talk }) => {
  return (
    <Link href={`/talks/${talk.slug.current}`} className="block">
      <div className="max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transform hover:scale-[1.02] transition duration-300">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">{talk.title}</h2>
        </div>
        <Image
          src={talk.image}
          alt={talk.title}
          width={500}
          height={300}
          className="object-cover w-full h-56"
        />
      </div>
    </Link>
  );
};

export default TalkCard;
