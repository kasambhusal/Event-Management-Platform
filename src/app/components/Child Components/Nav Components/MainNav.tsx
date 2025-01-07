"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";

function MainNav() {
  const pathname = usePathname();

  // Check if '/dashboard' is not in the URL
  const showTopNav = !pathname.includes("/dashboard");

  return <div className="w-full">{showTopNav && <TopNav />}</div>;
}

export default MainNav;
