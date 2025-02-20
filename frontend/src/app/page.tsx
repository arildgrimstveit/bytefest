import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161E38] flex justify-center items-center">
      <div className="w-full max-w-4xl px-4">
        <Image
          src="/images/BytefestText.svg"
          alt="BytefestText"
          width={960}
          height={480}
        />
      </div>
    </div>
  );
}
