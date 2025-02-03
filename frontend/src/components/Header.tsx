import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between bg-[rgba(0,175,234,255)] h-16 px-4 shadow-md">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/BytefestWhite.png"
          alt="Bytefest Logo"
          width={120}
          height={40}
          className="opacity-100 cursor-pointer"
        />
      </Link>
      <nav className="space-x-4">
        <Link href="/program" className="text-white hover:underline">
          Program
        </Link>
        <Link href="/speakers" className="text-white hover:underline">
          Speakers
        </Link>
        <Link href="/about" className="text-white hover:underline">
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
