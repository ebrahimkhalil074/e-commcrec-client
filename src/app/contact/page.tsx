"use client";

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Contact <span className="text-amber-600">E-Shop</span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Questions about orders, products, or partnerships?  
            Our support team is ready to help you 7 days a week.
          </p>
        </div>

        {/* Contact info + form */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <InfoItem
              icon={<FaMapMarkerAlt />}
              title="Our Headquarters"
              text="E-Shop Ltd.  
              456 Market Street, Suite 220  
              Dhaka 1207, Bangladesh"
            />
            <InfoItem
              icon={<FaPhoneAlt />}
              title="Call Us"
              text="+880 1712-345678 (9am-8pm, GMT+6)"
            />
            <InfoItem
              icon={<FaEnvelope />}
              title="Email"
              text="support@eshop-demo.com"
            />
            <InfoItem
              icon={<FaClock />}
              title="Business Hours"
              text="Sat–Thu: 9:00 – 20:00  
              Friday: Closed"
            />
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell us how we can help..."
                className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full shadow-md transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map (optional static embed) */}
        <div className="mt-16">
          <iframe
            title="E-Shop Map"
            className="w-full h-72 rounded-xl shadow-md border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.840393!2d90.3913!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8!2sDhaka!"
          ></iframe>
        </div>
      </div>
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
    <div className="flex items-start gap-4">
      <div className="text-amber-600 text-2xl mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
          {text}
        </p>
      </div>
    </div>
  );
}
