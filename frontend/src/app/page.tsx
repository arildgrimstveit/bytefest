import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161E38] flex pt-25">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-18">
        <div className="text-left">
          <Image
            src="/images/BytefestText.svg"
            alt="BytefestText"
            width={940}
            height={160}
          />
        </div>
        <div className="text-left argent text-white pt-10 text-4xl">
          <a>Mikrokonferansen som dypdykker ned i systemutvikling</a>
        </div>
        <div className="text-left iceland text-white pt-10 text-5xl">
          <a>5. Januar 2025</a>
          <a className="text-2xl pl-20">16.00 - 21.00</a>
        </div>
      </div>
    </div>
  );
}
