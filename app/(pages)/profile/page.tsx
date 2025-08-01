"use client";
import LoadingOverlay from "@/app/components/__atoms/loader/LOadingOverlay";
import CopmanyProfile from "@/app/components/__organisms/companyProfile/CopmanyProfile";
import UserProfile from "@/app/components/__organisms/userProfile/UserProfile";
import { useGetCurrentUserOrCompany } from "@/app/lib/getCurrentUserOrCompany";
import { Company, User } from "@/app/types/types";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

export default function page() {
  const [profile, setProfile] = useState<Company | User>();
  const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany();
  const token = getCookie("token");

  useEffect(() => {
    if (token) getCurrentUserOrCompany({ token, setUser: setProfile });
  }, []);

  if (!profile) return <LoadingOverlay />;
  return (
    <div>
      {profile.role === "COMPANY" ? (
        <CopmanyProfile company={profile as Company} />
      ) : (
        <UserProfile user={profile as User} />
      )}
    </div>
  );
}
