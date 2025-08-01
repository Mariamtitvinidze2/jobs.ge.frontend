"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Company, User } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import profile from "../../../assets/images/ProfilePic.jpg";

interface FullName {
  firstName: string;
  lastName: string;
}

interface Props {
  user: User | Company;
}

export default function HeaderProfile({ user }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/sign-in");
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Image
        src={profile}
        alt="profile"
        width={35}
        height={35}
        className="rounded-full cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      />

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-[200px] bg-white shadow-md border rounded-lg z-50 text-sm">
          <div className="px-4 py-2 font-semibold border-b">
            {typeof user.fullName === "object"
              ? `${user.fullName.firstName ?? ""} ${
                  user.fullName.lastName ?? ""
                }`
              : user.fullName}
          </div>

          <button
            onClick={() => {
              router.push("/profile");
              setShowDropdown(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            პროფილი
          </button>
          <button
            onClick={() => {
              setShowDropdown(false);
              setShowModal(true);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            გასვლა
          </button>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-transparent">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md text-center border border-gray-200 backdrop-blur-sm">
            <p className="text-lg mb-4">ნამდვილად გსურს გამოსვლა?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                არა
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                გასვლა
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
