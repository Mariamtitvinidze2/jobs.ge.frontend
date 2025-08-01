"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/__atoms/loader/LOadingOverlay";

export default function IsLoggedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      router.push("/");
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) return <LoadingOverlay />;

  return <>{children}</>;
}
