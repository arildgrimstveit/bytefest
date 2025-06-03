"use client";

// import {useUser} from "@/components/UserContext";
// import {useState} from "react";
import client from "@/sanityClient";
import {useState} from "react";

export default function Bytefest() {
  // const { isAuthenticated } = useUser();
  // const paameldingHref = isAuthenticated ? "/paamelding" : "/login?intent=paamelding";
  // const [pageStatus, setPageStatus] = useState<'loading' | 'authenticating' | 'fetchingData' | 'formReady' | 'loginRequired' | 'error'>('loading');
  const [bergen, setBergen] = useState<number>(0);
  const [drammen, setDrammen] = useState<number>(0);
  const [fredrikstad, setFredrikstad ] = useState<number>(0);
  const [hamar, setHamar ] = useState<number>(0);
  const [kristiansand, setKristiansand ] = useState<number>(0);
  const [kobenhaven, setKobenhaven ] = useState<number>(0);
  const [oslo, setOslo ] = useState<number>(0);
  const [stavanger, setStavanger ] = useState<number>(0);
  const [tromso, setTromso ] = useState<number>(0);
  const [trondheim, setTrondheim ] = useState<number>(0);
  const [digitalt, setDigitalt ] = useState<number>(0);

  const fetchData = async () => {
    try {
      const [bergen, drammen, fredrikstad, hamar ] = await Promise.all([
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Bergen'])`),
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Drammen'])`),
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Fredrikstad'])`),
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Hamar'])`),
      ]);

      const [kristiansand, kobenhaven, oslo, stavanger] = await Promise.all([
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Kristiansand'])`),
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'København'])`),
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Oslo'])`),
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Stavanger'])`)
      ]);

      const [tromso, trondheim, digitalt ] = await Promise.all([
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Tromsø'])`),
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Trondheim'])`),
        client.fetch<number>(`count(*[_type == 'attendee' && participationLocation == 'Digitalt'])`)
      ]);

      setBergen(bergen);
      setDrammen(drammen);
      setFredrikstad(fredrikstad);
      setHamar(hamar);
      setKristiansand(kristiansand);
      setKobenhaven(kobenhaven);
      setOslo(oslo);
      setStavanger(stavanger);
      setTromso(tromso);
      setTrondheim(trondheim)
      setDigitalt(digitalt)

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
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Bergen</td>
                        <td className="px-4 py-2 border-b border-gray-300">{bergen}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Drammen</td>
                        <td className="px-4 py-2 border-b border-gray-300">{drammen}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Fredrikstad</td>
                        <td className="px-4 py-2 border-b border-gray-300">{fredrikstad}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Hamar</td>
                        <td className="px-4 py-2 border-b border-gray-300">{hamar}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Kristiansand</td>
                        <td className="px-4 py-2 border-b border-gray-300">{kristiansand}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Københaven</td>
                        <td className="px-4 py-2 border-b border-gray-300">{kobenhaven}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Oslo</td>
                        <td className="px-4 py-2 border-b border-gray-300">{oslo}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Stavanger</td>
                        <td className="px-4 py-2 border-b border-gray-300">{stavanger}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Tromså</td>
                        <td className="px-4 py-2 border-b border-gray-300">{tromso}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Trondheim</td>
                        <td className="px-4 py-2 border-b border-gray-300">{trondheim}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">Digitalt</td>
                        <td className="px-4 py-2 border-b border-gray-300">{digitalt}</td>
                      </tr>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-2 border-a border-gray-300 font-semibold">Totalt</td>
                      <td className="px-4 py-2 border-b border-gray-300 font-semibold">
                        { bergen+drammen+fredrikstad+hamar+kristiansand+kobenhaven+oslo+stavanger+tromso+trondheim+digitalt }
                      </td>
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