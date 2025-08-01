import { Company, User } from "@/app/types/types";
import Image from "next/image";
import React from "react";

type Props = {
  user: User | Company;
};
export default function RespHeaderProfite({ user }: Props) {
  return (
    <div className="flex items-center gap-4 mt-5 ">
      <Image
        src={user.avatar!}
        alt="user profile"
        className="rounded-full shadow-[#A155B9] "
        width={40}
        height={40}
      />
      <p className="text-[#A155B9] hover:text-purple-800 font-semibold font-stretch-50% cursor-pointer">
        {typeof user.fullName === "string"
          ? user.fullName
          : `${user.fullName.firstName ?? ""} ${user.fullName.lastName ?? ""}`}
      </p>
    </div>
  );
}
