"use client";

import Link from "next/link";
import React from "react";
import { Home, Briefcase, Building2 } from "lucide-react";

export default function NavBar() {
  const navBarArr = [
    { icon: <Home size={20} />, link: "/", label: "Home" },
    { icon: <Briefcase size={20} />, link: "/vacancies", label: "Vacancies" },
    { icon: <Building2 size={20} />, link: "/companies", label: "Companies" },
  ];

  return (
    <div>
      <ul className="flex gap-10 max-[768px]:hidden items-center">
        {navBarArr.map((el, index) => (
          <li key={index} className="group relative cursor-pointer">
            <Link
              href={el.link}
              className="cursor-pointer flex flex-col items-center text-black group-hover:text-purple-600 transition"
            >
              {el.icon}
              <span className="text-[10px] mt-1 text-gray-600 group-hover:text-purple-600">
                {el.label}
              </span>
              <span className="absolute left-0 bottom-[-30px] h-[3px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
