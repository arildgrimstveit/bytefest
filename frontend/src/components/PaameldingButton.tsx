"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/components/UserContext";

export default function PaameldingButton() {
  const { isAuthenticated } = useUser();

  // Determine the correct href based on authentication status
  const paameldingHref = isAuthenticated ? "/paamelding" : "/login?intent=paamelding";

  return (
    <Link
      href={paameldingHref}
      className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
      target="_self"
    >
      <Image
        alt="Meld deg på"
        height="55"
        src="/images/MeldDegPaa.svg"
        width="263"
      />
    </Link>
  );
} 