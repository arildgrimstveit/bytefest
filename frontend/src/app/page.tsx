import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161E38] flex pt-25">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-18">
        <div className="text-left">
          <Image
            src="/images/BytefestText.svg"
            alt="BytefestText"
            width={960}
            height={480}
          />
        </div>
        <div className="text-left argent text-white">
          <a>OISAUDJFOPSJDFGPOAISDFJGPAOFIDGJSPAODFIGJPSODFIUGJSPODITFHGUIOJ</a>
        </div>
      </div>
    </div>
  );
}
