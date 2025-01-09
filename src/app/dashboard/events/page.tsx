"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Events from "@/app/components/Child Components/Event Components/Event";
import { useUser } from "@/app/context/UserContext";
import Loader from "@/app/components/Child Components/Other Components/Loader";
import RoadBlocking from "@/app/components/Child Components/Other Components/RoadBlocking";

export default function Page() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState<typeof user | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      if (user) {
        if (
          user.id === undefined ||
          user.name === undefined ||
          user.email === undefined
        ) {
          router.push("/dashboard/login");
        } else {
          setCurrentUser(user);
        }
      }
    };

    // Simulate a loading delay
    const timer = setTimeout(() => {
      checkUser();
      setLoading(false);
    }, 1000); // Show loader for 1 second

    return () => clearTimeout(timer);
  }, [user, router]);

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <RoadBlocking />
      <Events />
    </>
  );
}
