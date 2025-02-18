"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Events from "@/app/components/Child Components/Event Components/Event";
import { useUser } from "@/app/context/UserContext";
import Loader from "@/app/components/Child Components/Other Components/Loader";
import RoadBlocking from "@/app/components/Child Components/Other Components/RoadBlocking";
import { checkFirstVisit } from "@/lib/utils/firstVisit";

export default function Page() {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState<typeof user | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showRoadBlocking, setShowRoadBlocking] = useState(false);

  useEffect(() => {
    const isFirstVisit = checkFirstVisit();
    setShowRoadBlocking(isFirstVisit);
  }, []);

  useEffect(() => {
    if (user === null) {
      // User context is not yet initialized
      return;
    }

    if (user && user.id && user.name && user.email) {
      setCurrentUser(user);
    } else {
      router.push("/dashboard/login");
    }

    setLoading(false);
  }, [user, router]);

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Events />
      {showRoadBlocking && <RoadBlocking />}
    </>
  );
}
