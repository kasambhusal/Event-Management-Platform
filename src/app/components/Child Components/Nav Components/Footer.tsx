"use client";
import React from "react";
import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 md:px-[10%]">
      <div className="flex flex-wrap justify-between items-center">
        {/* Logo and Description */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <Image
            src="/logo.jpg"
            width={200}
            height={150}
            alt="logo"
            className="my-2"
          />
          <p className="text-gray-400">
            Your all-in-one platform for managing and organizing events with
            ease. We bring simplicity and efficiency to event planning.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link href="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/" className="text-gray-300 hover:text-white">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/" className="text-gray-300 hover:text-white">
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/" className="text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/3">
          <h3 className="font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@eventsphere.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
          <p className="text-gray-400">Address: Anamnagar, Kathmandu, Nepal</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-600 pt-4 flex flex-wrap justify-between items-center">
        {/* Social Media Links */}
        <div>
          <Link
            href="https://facebook.com"
            target="_blank"
            className="text-gray-400 hover:text-white mx-2"
          >
            <FacebookOutlined className="w-6 h-6" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="text-gray-400 hover:text-white mx-2"
          >
            <TwitterOutlined className="w-6 h-6" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-gray-400 hover:text-white mx-2"
          >
            <InstagramOutlined className="w-6 h-6" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-gray-400 hover:text-white mx-2"
          >
            <LinkedinOutlined className="w-6 h-6" />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-gray-400 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} EventSphere. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
