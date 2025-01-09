"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Calendar, Users, Filter, Layout } from "lucide-react";

// Dynamically import Typewriter for client-side rendering
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component only renders after the client-side hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering the component during SSR
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-500 rounded-full opacity-10"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to EventSphere
          </motion.h1>

          <div className="text-xl md:text-2xl mb-8 h-20 font-light">
            {isMounted && (
              <Typewriter
                options={{
                  strings: [
                    "Your all-in-one platform for effortless event management.",
                    "Create and manage events with ease.",
                    "Transform your event planning experience.",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/dashboard/login">
              <button className="group px-8 py-4 bg-gradient-to-r from-[#7ED321] to-green-500 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 active:scale-95">
                Get Started
                <ArrowRight
                  className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        className="container mx-auto py-24 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
          variants={item}
        >
          Powerful Features for Event Management
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature Card 1 */}
          <motion.div
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Event Management
            </h3>
            <p className="text-gray-600">
              Create, update, and manage your events with ease. Access
              user-friendly tools to ensure smooth operations.
            </p>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Role-Based Access
            </h3>
            <p className="text-gray-600">
              Admins manage all events, while users focus on their own. Secure
              access ensures proper control.
            </p>
          </motion.div>

          {/* Feature Card 3 */}
          <motion.div
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Filter className="text-orange-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Advanced Filtering
            </h3>
            <p className="text-gray-600">
              Easily search and sort events based on location, date, or other
              criteria for better organization.
            </p>
          </motion.div>

          {/* Feature Card 4 */}
          <motion.div
            variants={item}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Layout className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Responsive Dashboard
            </h3>
            <p className="text-gray-600">
              Access a user-friendly dashboard on any device for managing events
              and tracking progress.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Call-to-Action */}
      <motion.div
        className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to Transform Your Event Management?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join EventSphere today and experience the future of event planning
              and management.
            </p>
            <Link href="/dashboard/login">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95">
                Get Started Now
                <ArrowRight
                  className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
