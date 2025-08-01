import Link from "next/link";
import React from "react";
import ss from "../images/ss.png";
import Image from "next/image";

export default function LogoSvg() {
  return (
    <Link href="/" className="cursor-pointer">
      <Image src={ss} alt="SS Jobs Logo" height={40} />
    </Link>
  );
}
