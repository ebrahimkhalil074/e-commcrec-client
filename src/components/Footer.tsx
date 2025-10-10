"use client";

import React from "react";
import { motion } from "framer-motion";
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

  // Motion variants for smooth fade-up animation
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.footer
      className="container mx-auto dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors"
      initial="hidden"
      viewport={{ once: false, amount: 0.2 }}
      whileInView="visible"
    >
      {/* === Top: Multi-column layout === */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-6 py-12">
        {[
          {
            title: "Customer Care",
            items: [
              { name: "Help Center", href: "/help" },
              { name: "Track Order", href: "/track" },
              { name: "Returns & Refunds", href: "/returns" },
              { name: "FAQ", href: "/faq" },
            ],
          },
          {
            title: "About Us",
            items: [
              { name: "Company Info", href: "/about" },
              { name: "Careers", href: "/careers" },
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms & Conditions", href: "/terms" },
            ],
          },
        ].map((section, i) => (
          <motion.div
            key={section.title}
            className="w-full"
            custom={i}
            variants={fadeUp}
          >
            <h3 className="font-bold text-lg mb-4 text-amber-600 dark:text-amber-400">
              {section.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    className="hover:text-amber-600 dark:hover:text-amber-400"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Download App */}
        <motion.div custom={2} variants={fadeUp}>
          <h3 className="font-bold text-lg mb-4 text-amber-600 dark:text-amber-400">
            Download App
          </h3>
          <div className="flex flex-col gap-3">
            <a
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-2 rounded-md"
              href="https://play.google.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaGooglePlay /> Google Play
            </a>
            <a
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-2 rounded-md"
              href="https://apple.com/app-store/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaApple /> App Store
            </a>
          </div>
        </motion.div>

        {/* Follow Us */}
        <motion.div custom={3} variants={fadeUp}>
          <h3 className="font-bold text-lg mb-4 text-amber-600 dark:text-amber-400">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://facebook.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaFacebookF className="hover:text-amber-600 dark:hover:text-amber-400" />
            </a>
            <a
              href="https://twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaTwitter className="hover:text-amber-600 dark:hover:text-amber-400" />
            </a>
            <a
              href="https://instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaInstagram className="hover:text-amber-600 dark:hover:text-amber-400" />
            </a>
            <a
              href="https://youtube.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaYoutube className="hover:text-amber-600 dark:hover:text-amber-400" />
            </a>
          </div>
        </motion.div>
      </div>

      <Divider className="bg-amber-200 dark:bg-amber-700" />

      {/* === Bottom: Copyright === */}
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 text-sm"
        custom={4}
        variants={fadeUp}
      >
        <p>&copy; {year} My E-Commerce. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Built with Next.js & HeroUI</p>
      </motion.div>
    </motion.footer>
  );
}
