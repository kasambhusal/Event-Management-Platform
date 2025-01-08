"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Events from "@/app/components/Child Components/Event Components/Event";
import { useUser } from "@/app/context/UserContext";

export default function Page() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState<typeof user | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.id === null || user.name === null || user.email === null) {
        // If all user attributes are null, redirect to login
        router.push("/dashboard/login");
      } else {
        setCurrentUser(user); // Set user data if it's valid
      }
    }
    setLoading(false); // Stop loading after checking user data
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  if (!currentUser) {
    return null; // If user is invalid or not available, return null
  }

  return <Events />; // Render events if user data is valid
}
