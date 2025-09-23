
"use client";

import React from "react";
import { Link, Divider } from "@heroui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container mx-auto dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
      {/* === Top: Multi-column layout === */}
      <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-6 py-12">
        {/* Customer Care */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-amber-600 dark:text-amber-400">
            Customer Care
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/help" className="hover:text-amber-600 dark:hover:text-amber-400">Help Center</Link></li>
            <li><Link href="/track" className="hover:text-amber-600 dark:hover:text-amber-400">Track Order</Link></li>
            <li><Link href="/returns" className="hover:text-amber-600 dark:hover:text-amber-400">Returns & Refunds</Link></li>
            <li><Link href="/faq" className="hover:text-amber-600 dark:hover:text-amber-400">FAQ</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-amber-600 dark:text-amber-400">
            About Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400">Company Info</Link></li>
            <li><Link href="/careers" className="hover:text-amber-600 dark:hover:text-amber-400">Careers</Link></li>
            <li><Link href="/privacy" className="hover:text-amber-600 dark:hover:text-amber-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-amber-600 dark:hover:text-amber-400">Terms & Conditions</Link></li>
          </ul>
        </div>


        {/* App Download */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-amber-600 dark:text-amber-400">
            Download App
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-2 rounded-md"
            >
              <FaGooglePlay /> Google Play
            </a>
            <a
              href="https://apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-2 rounded-md"
            >
              <FaApple /> App Store
            </a>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-amber-600 dark:text-amber-400">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-amber-600 dark:hover:text-amber-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-amber-600 dark:hover:text-amber-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-amber-600 dark:hover:text-amber-400" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="hover:text-amber-600 dark:hover:text-amber-400" />
            </a>
          </div>
        </div>
      </div>

      <Divider className="bg-amber-200 dark:bg-amber-700" />

      {/* === Bottom: Copyright === */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 text-sm">
        <p>&copy; {year} My E-Commerce. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Built with Next.js & HeroUI</p>
      </div>
    </footer>
  );
}
