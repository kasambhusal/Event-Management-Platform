"use client";
import React from "react";
import { usePathname } from "next/navigation";
import DashboardNav from "./DashboardNav";

function SecondNav() {
  const pathname = usePathname();

  // Check if '/dashboard' is not in the URL
  const showTopNav = pathname.includes("/events");

  return <div className="w-full">{showTopNav && <DashboardNav />}</div>;
}

export default SecondNav;
