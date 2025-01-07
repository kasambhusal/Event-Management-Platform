import React from "react";
import Link from "next/link";

function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full bg-blue-800 text-white py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Welcome to EventSphere
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your all-in-one platform for effortless event management.
        </p>
        <Link href="/dashboard/sign-up">
          <button className="px-8 py-3 bg-[#7ED321] text-white rounded-full text-lg font-medium hover:bg-green-600">
            Get Started
          </button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-7xl py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            Event Management
          </h2>
          <p className="text-gray-600">
            Create, update, and manage your events with ease. Access
            user-friendly tools to ensure smooth operations.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            Role-Based Access
          </h2>
          <p className="text-gray-600">
            Admins manage all events, while users focus on their own. Secure
            access ensures proper control.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            Real-Time Notifications
          </h2>
          <p className="text-gray-600">
            Keep attendees informed with instant updates and notifications about
            your events.
          </p>
        </div>

        {/* Feature Card 4 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            Attendance Tracking
          </h2>
          <p className="text-gray-600">
            Monitor attendee participation with real-time analytics to ensure
            your event's success.
          </p>
        </div>

        {/* Feature Card 5 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            Advanced Filtering
          </h2>
          <p className="text-gray-600">
            Easily search and sort events based on location, date, or other
            criteria.
          </p>
        </div>

        {/* Feature Card 6 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            Responsive Dashboard
          </h2>
          <p className="text-gray-600">
            Access a user-friendly dashboard on any device for managing events
            and tracking progress.
          </p>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="w-full bg-gray-100 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Ready to Transform Your Event Management?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Sign up today and take control of your events with EventSphere.
        </p>
        <Link href="/dashboard/sign-up">
          <button className="px-6 py-3 bg-blue-800 text-white rounded-full font-medium hover:bg-blue-700">
            Get Started Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
