"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className="flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.jpg" width={120} height={60} alt="Logo" />
        </Link>

        {/* Hamburger Icon */}
        <div
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative cursor-pointer"
          onClick={toggleMenu}
        >
          {/* Top Line */}
          <span
            className={`h-0.5 w-6 bg-gray-800 rounded-full absolute transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
            }`}
          ></span>
          {/* Middle Line */}
          <span
            className={`h-0.5 w-6 bg-gray-800 rounded-full absolute transition-all duration-300 ${
              isMenuOpen ? "opacity-0 translate-x-3" : "opacity-100"
            }`}
          ></span>
          {/* Bottom Line */}
          <span
            className={`h-0.5 w-6 bg-gray-800 rounded-full absolute transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
            }`}
          ></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-blue-800"
          >
            Home
          </Link>
          <Link
            href="/dashboard/events"
            className="text-gray-700 font-medium hover:text-blue-800"
          >
            Events
          </Link>
          <Link
            href="/dashboard/contact"
            className="text-gray-700 font-medium hover:text-blue-800"
          >
            Contact
          </Link>
        </div>

        {/* Login Button */}
        <Link href="/dashboard/login" className="hidden md:block">
          <button className="font-medium text-white bg-[#7ED321] py-2 px-6 rounded-full hover:bg-green-600">
            Join / Login
          </button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col items-center bg-white shadow-md transition-all duration-300 ${
          isMenuOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <Link
          href="/"
          className="text-gray-700 font-medium hover:text-blue-800 py-2"
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link
          href="/dashboard/events"
          className="text-gray-700 font-medium hover:text-blue-800 py-2"
          onClick={toggleMenu}
        >
          Events
        </Link>
        <Link
          href="/dashboard/contact"
          className="text-gray-700 font-medium hover:text-blue-800 py-2"
          onClick={toggleMenu}
        >
          Contact
        </Link>
        <Link
          href="/dashboard/login"
          className="text-gray-700 font-medium hover:text-blue-800 py-2"
          onClick={toggleMenu}
        >
          Join / Login
        </Link>
      </div>
    </div>
  );
}

