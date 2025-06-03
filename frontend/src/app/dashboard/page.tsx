"use client";

// import {useUser} from "@/components/UserContext";
// import {useState} from "react";
import client from "@/sanityClient";
import {Counter} from "@/types/sanity";

export default function Bytefest() {
  // const { isAuthenticated } = useUser();
  // const paameldingHref = isAuthenticated ? "/paamelding" : "/login?intent=paamelding";
  // const [pageStatus, setPageStatus] = useState<'loading' | 'authenticating' | 'fetchingData' | 'formReady' | 'loginRequired' | 'error'>('loading');
  let bergen: Counter = {result:0, ms: 0}
  let drammen: Counter = {result:0, ms: 0}

  const fetchData = async () => {
    try {
      [bergen, drammen] = await Promise.all([
        client.fetch<Counter>(`count(*[_type=='attendee' && participationLocation == 'Bergen'])`),
        client.fetch<Counter>(`count(*[_type=='attendee' && participationLocation == 'Drammen'])`)
      ]);
    } catch (error) {
      console.error("Error fetching program data:", error);
    }
  };

  fetchData();



  return (
    <div className="py-10">
      {/* Visual elements container */}
      <div className="relative flex flex-col items-center mt-15">
        {/* Container 2 - Stats box */}
        <div className="w-full max-w-5xl mx-auto px-4 mt-15">
          <div className="flex flex-col items-center justify-center mx-1 sm:mx-12">
            <div className="bg-[#F6EBD5] w-full lg:max-w-[900px] py-10 px-6 md:px-12">
              <p className="text-3xl md:text-6xl text-[#2A1449] mb-6 md:mb-8 text-center">Statistisk</p>
              <div className="flex w-full mt-2 text-2xl md:text-4xl text-[#2A1449] items-center justify-center">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 bg-white">
                    <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="px-4 py-2 border-b border-gray-300">Sted</th>
                      <th className="px-4 py-2 border-b border-gray-300">Påmeldinger</th>
                    </tr>
                    </thead>
                    <tbody>{/* Bergen, Drammen, Fredrikstad, Hamar, Kristiansand, Københaven, Oslo, Stavanger, Tromså, Trondheim, Digitalt */}
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Bergen</td>
                        <td className="px-4 py-2 border-b border-gray-300">{bergen.result}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Drammen</td>
                        <td className="px-4 py-2 border-b border-gray-300">{drammen.result}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Fredrikstad</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Hamar</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Kristiansand</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Københaven</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Oslo</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Stavanger</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Tromså</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Trondheim</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Digitalt</td>
                        <td className="px-4 py-2 border-b border-gray-300">100</td>
                      </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2 border-a border-gray-300 font-semibold">Totalt</td>
                      <td className="px-4 py-2 border-b border-gray-300 font-semibold">100</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
