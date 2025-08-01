"use client";
import AdminDashboard from "@/app/components/__molecules/adminPage/AdminDashboard";
import AdminHeader from "@/app/components/__molecules/adminheader/AdminHeader";
import IsLoggedIn from "@/app/guard/IsLogedIn.guard";
import React, { useEffect, useState } from "react";

export default function AdminPage() {
  return (
    <IsLoggedIn>
      <div className="flex">
        <AdminHeader />
        <AdminDashboard />
      </div>
    </IsLoggedIn>
  );
}
