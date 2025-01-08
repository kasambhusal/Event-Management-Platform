import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogoutOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

function DashboardNav() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();
  const handleLogout = (): void => {
    setUser({
      id: null,
      name: null,
      email: null,
    });
    setShowLogoutConfirm(false);
    router.push("/");
  };

  const toggleLogoutConfirm = () => {
    setShowLogoutConfirm((prev) => !prev);
  };

  return (
    <div className="w-full h-[8vh] bg-blue-800 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex h-full"
      >
        <div className="w-full px-[5%] flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image src="/logo.jpg" width={150} height={50} alt="Logo" />
          </Link>

          {/* Welcome Message */}
          <h1 className="text-lg font-medium text-white">
            Hi, {user?.name || "Unknown User"}
          </h1>

          {/* Logout Icon with Dropdown */}
          <div className="relative">
            <LogoutOutlined
              style={{ fontSize: "25px", color: "white", cursor: "pointer" }}
              onClick={toggleLogoutConfirm}
            />

            {showLogoutConfirm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-4 z-50"
              >
                <p className="text-gray-700 mb-4">
                  Are you sure you want to logout?
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
                    onClick={() => setShowLogoutConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
                    onClick={handleLogout}
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardNav;
