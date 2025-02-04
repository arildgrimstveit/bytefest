import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 flex justify-center">
      <div className="w-full max-w-4xl px-4">
        <Image
          src="/images/BytefestBanner.png"
          alt="Bytefest Logo"
          width={1200}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
