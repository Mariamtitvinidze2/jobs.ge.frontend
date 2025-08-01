import { User } from "@/app/types/types";
import React, { useState } from "react";
import Header from "../header/Header";
import UserDescription from "../../__molecules/userInfo/userInfo";

export default function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <Header />
      <div className="mt-20 py-8 w-full max-w-[1440px] fleX items-center justify-center px-[100px]  mx-auto">
        <UserDescription user={user as User} />
      </div>
    </div>
  );
}
