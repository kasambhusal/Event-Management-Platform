"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

function MainFooter() {
  const pathname = usePathname();

  // Check if '/dashboard' is not in the URL
  const showTopNav = !pathname.includes("/dashboard");

  return <div className="w-full">{showTopNav && <Footer />}</div>;
}

export default MainFooter;
