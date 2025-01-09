"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Settings, LogOut, UserPlus } from "lucide-react";
import Image from "next/image";

const DashboardNav = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-[8vh]">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpg"
            width={120}
            height={60}
            alt="Logo"
            className="max-h-full w-auto"
          />
        </Link>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="text-white text-sm md:text-base font-medium flex items-center">
            {user.name}
            {user.role === "ADMIN" && (
              <span className="ml-2 px-2 py-1 bg-white text-red-500 text-xs rounded-full shadow">
                ADMIN
              </span>
            )}
          </div>

          {/* Settings Icon */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white hover:text-blue-300"
            >
              <Settings size={28} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md py-2 z-10">
                <button
                  onClick={() => alert("Account Management")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <UserPlus className="inline-block mr-2" size={18} />
                  Manage Account
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <LogOut className="inline-block mr-2" size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
