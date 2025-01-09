"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Settings, LogOut, User } from "lucide-react";
import AccountManagement from "../Other Components/AccountManagement";
import Image from "next/image";

const DashboardNav = () => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showAccountManagement, setShowAccountManagement] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    router.push("/");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <nav className="bg-blue-600 py-2 px-2 md:px-[10%] flex flex-wrap justify-between items-center">
      <Link href="/" className="text-white text-2xl font-bold">
        <Image src="/logo.jpg" width={150} height={80} alt="Logo" />
      </Link>
      <h1 className="text-white font-bold">
        Hi, {user.name}
        {user.role === "ADMIN" && <button className="ml-[5px] text-[10px]  bg-white text-red-600 px-2 py-[1px] rounded-xl">ADMIN</button>}{" "}
      </h1>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-white hover:text-blue-200"
        >
          <Settings size={24} />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={() => {
                setShowAccountManagement(true);
                setShowDropdown(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <User className="inline-block mr-2" size={18} />
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
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {showAccountManagement && (
        <AccountManagement onClose={() => setShowAccountManagement(false)} />
      )}
    </nav>
  );
};

export default DashboardNav;
