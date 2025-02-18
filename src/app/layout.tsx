import type { Metadata } from "next";
import "@ant-design/v5-patch-for-react-19";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNav from "./components/Child Components/Nav Components/MainNav";
import { UserProvider } from "./context/UserContext";
import MainFooter from "./components/Child Components/Nav Components/MainFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Sphere",
  description: "Event Sphere is a comprehensive platform for organizing, managing, and streamlining your events effortlessly. From event creation to attendee engagement, we've got you covered.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <UserProvider>
          <MainNav />
          {children}
          <MainFooter />
        </UserProvider>
      </body>
    </html>
  );
}
