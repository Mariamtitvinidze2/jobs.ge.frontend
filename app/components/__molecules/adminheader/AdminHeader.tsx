"use client";
import LogoSvg from "@/app/assets/svgs/LogoSvg";
import React, { useEffect, useState } from "react";
import NavBar from "../IconPages/iconPages";
import Link from "next/link";
import PlusSvg from "@/app/assets/svgs/PlusSvg";
import BurgerSvg from "@/app/assets/svgs/BurgerSvg";
import Logout from "../../../assets/images/logout.png";
import { Company, User } from "@/app/types/types";
import { deleteCookie, getCookie } from "cookies-next";
import { useGetCurrentUserOrCompany } from "@/app/lib/getCurrentUserOrCompany";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeaderProfile from "../../__atoms/MainProfile/HeaderProfile";
import AdminNavBar from "../adminNavBar/AdminNavBar";

export default function AdminHeader() {
  const [user, setUser] = useState<Company | User>();
  const [showNavBar, setShowNavBar] = useState(false);
  const token = getCookie("token");
  const router = useRouter();

  const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany();
  useEffect(() => {
    if (token) {
      getCurrentUserOrCompany({ token, setUser });
    }
  }, []);

  return (
    <div className="w-full fixed shadow-[0_2px_10px_rgba(0,0,0,0.08)] top-0 bg-white py-5  z-30 ">
      <div className="max-w-[1440px] px-[100px] mx-auto flex  justify-between items-center max-[1058px]:px-[70px] max-[900px]:px-5 max-[450px]:px-3 transition-all duration-300 ">
        <div className="flex gap-[400px] items-center">
          <LogoSvg />
          <AdminNavBar />
        </div>

        <div className="flex">
          <div
            onClick={() => setShowNavBar(true)}
            className="hidden max-[768px]:flex cursor-pointer w-[2rem] h-[2rem]  justify-center items-center"
          >
            <BurgerSvg />
          </div>
          {user && ["COMPANY", "USER", "ADMIN"].includes(user?.role) ? (
            user.role === "COMPANY" ? (
              <div className="flex gap-3">
                <Link href="/add-vacancy">
                  <button className="flex cursor-pointer px-4 py-2.5 bg-[#A155B919] font-semibold hover:bg-[#A155B935] rounded-[14px] items-center gap-2 text-[13px] text-[#A155B9] max-[1118px]:hidden ">
                    <PlusSvg />
                    ვაკანსიის დამატება
                  </button>
                </Link>
                <HeaderProfile user={user} />
              </div>
            ) : (
              <div className="flex gap-3 ">
                <HeaderProfile user={user} />
              </div>
            )
          ) : (
            <div className="flex gap-2 items-center">
              <Link href="/sign-in">
                <button className="flex cursor-pointer px-4 py-2.5 bg-[#A155B919] font-semibold hover:bg-[#A155B935] rounded-[14px] items-center gap-2 text-[13px] text-[#A155B9] max-[1058px]:hidden ">
                  <PlusSvg />
                  ვაკანსიის დამატება
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="flex cursor-pointer px-5 py-2 bg-transparent border-[1px] border-[#0000006a] font-semibold hover:bg-[#00000017] rounded-[10px] text-[15px] max-[768px]:hidden  ">
                  შესვლა
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
