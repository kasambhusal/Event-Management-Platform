import type { Metadata } from "next";
import SecondNav from "../components/Child Components/Nav Components/SecondNav";

export const metadata: Metadata = {
  title: "Event Sphere | Events",
  description:
    "Event Sphere is a comprehensive platform for organizing, managing, and streamlining your events effortlessly. From event creation to attendee engagement, we've got you covered.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen bg-gray-400">
      <SecondNav />

      {children}
    </div>
  );
}
