"use client";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 overflow-hidden">
      <motion.div
        className="relative py-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Contact <span className="text-amber-600">E-Shop</span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Questions about orders, products, or partnerships? Our support team is
          ready to help you 7 days a week.
        </p>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: false }}
          whileInView={{ scaleX: 1 }}
        />
      </motion.div>

      {/* Contact Info + Form */}
      <div className="mt-4 grid md:grid-cols-2 gap-12">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <InfoItem
            icon={<FaMapMarkerAlt />}
            text={`E-Shop Ltd.\n456 Market Street, Suite 220\nDhaka 1207, Bangladesh`}
            title="Our Headquarters"
          />
          <InfoItem
            icon={<FaPhoneAlt />}
            text="+880 1712-345678 (9am-8pm, GMT+6)"
            title="Call Us"
          />
          <InfoItem
            icon={<FaEnvelope />}
            text="support@eshop-demo.com"
            title="Email"
          />
          <InfoItem
            icon={<FaClock />}
            text={`Sat–Thu: 9:00 – 20:00\nFriday: Closed`}
            title="Business Hours"
          />
        </motion.div>

        <motion.form
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6"
          initial={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            required
            label="Full Name"
            placeholder="Your name"
            type="text"
          />
          <Input
            required
            label="Email Address"
            placeholder="you@example.com"
            type="email"
          />
          <Textarea
            required
            label="Message"
            placeholder="Tell us how we can help..."
            rows={4}
          />
          <Button
            className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full shadow-md transition"
            type="submit"
          >
            Send Message
          </Button>
        </motion.form>
      </div>

      {/* Map */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <iframe
          className="w-full h-72 rounded-xl shadow-md border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.840393!2d90.3913!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8!2sDhaka!"
          title="E-Shop Map"
        />
      </motion.div>
    </section>
  );
}

function InfoItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: false }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <div className="text-amber-600 text-2xl mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
