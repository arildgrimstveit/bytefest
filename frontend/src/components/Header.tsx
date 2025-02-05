import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="flex items-center bg-[rgba(0,175,234,255)] h-16 px-4 shadow-md">
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/BytefestWhite.png"
            alt="Bytefest Logo"
            width={120}
            height={40}
            className="opacity-100 cursor-pointer"
          />
        </Link>
        <nav className="flex space-x-4 self-end pb-[0px]">
          <Link href="/program" className="text-white hover:underline">
            Program
          </Link>
          <Link href="/speakers" className="text-white hover:underline">
            Speakers
          </Link>
          <Link href="/talks" className="text-white hover:underline">
            Talks
          </Link>
          <Link href="/about" className="text-white hover:underline">
            About
          </Link>
          <Link href="/submit-talk" className="text-white hover:underline">
            Submit Talk
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
