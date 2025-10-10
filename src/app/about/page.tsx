"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaShieldAlt, FaHeadset, FaShoppingBag } from "react-icons/fa";

// Reusable icon renderer
function Icon({
  name,
  className = "h-6 w-6 text-amber-600",
}: {
  name: any;
  className?: string;
}) {
  switch (name) {
    case "FaShieldAlt":
      return <FaShieldAlt className={className} />;
    case "FaTruck":
      return <FaTruck className={className} />;
    case "FaHeadset":
      return <FaHeadset className={className} />;
    case "FaShoppingBag":
    default:
      return <FaShoppingBag className={className} />;
  }
}

export default function AboutUs() {
  const data = {
    company: {
      name: "মায়ের দোয়া Marketplace",
      tagline: "Quality goods. Honest prices. Fast delivery.",
      founded: 2018,
      location: "Dhaka, Bangladesh",
      description:
        "Aurora Marketplace connects local makers and trusted brands with shoppers across the region. We focus on sustainable sourcing, transparent pricing and lightning-fast logistics so you get what you need — without compromise.",
      cta: { label: "Start Shopping", href: "/shop" },
    },
    stats: [
      { id: "s1", label: "Products", value: "3,420+" },
      { id: "s2", label: "Happy customers", value: "42,300+" },
      { id: "s3", label: "Countries served", value: "6" },
      { id: "s4", label: "Avg. delivery (hrs)", value: "48" },
    ],
    pillars: [
      {
        id: "p1",
        icon: "FaShieldAlt",
        title: "Trust & Safety",
        text: "Verified sellers, buyer protection and secure payments.",
      },
      {
        id: "p2",
        icon: "FaTruck",
        title: "Fast Delivery",
        text: "Multiple shipping hubs for faster fulfillment.",
      },
      {
        id: "p3",
        icon: "FaShoppingBag",
        title: "Curated Selection",
        text: "Handpicked products from reliable suppliers.",
      },
      {
        id: "p4",
        icon: "FaHeadset",
        title: "24/7 Support",
        text: "Local support team ready to help.",
      },
    ],
    team: [
      {
        id: "t1",
        name: "Fatima Noor",
        role: "Founder & CEO",
        bio: "Ex-ecommerce product manager passionate about sustainable retail and inclusive growth.",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "t2",
        name: "Rashed Hossain",
        role: "Head of Engineering",
        bio: "Builds resilient systems and loves clean API design.",
        image:
          "https://images.unsplash.com/photo-1545996124-8a1f8b8f4d49?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "t3",
        name: "Nadia Islam",
        role: "Head of Operations",
        bio: "Scaling fulfillment and customer experience across multiple cities.",
        image:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
      },
    ],
    milestones: [
      {
        id: "m1",
        year: 2018,
        text: "Company founded with 2 founders and a laptop.",
      },
      {
        id: "m2",
        year: 2019,
        text: "Reached 10k customers and launched B2B partnerships.",
      },
      {
        id: "m3",
        year: 2021,
        text: "Opened first fulfillment center outside Dhaka.",
      },
      { id: "m4", year: 2024, text: "Crossed 1M orders milestone." },
    ],
    testimonials: [
      {
        id: "c1",
        name: "Samir Ahmed",
        text: "Fast delivery, good packaging — Aurora saved me hours of shopping.",
      },
      {
        id: "c2",
        name: "Rina K.",
        text: "Great selection of local artisans — quality products every time.",
      },
    ],
  };

  const { company, stats, pillars, team, milestones, testimonials } = data;

  // Basic animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="container mx-auto px-6 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Hero Section */}
      <motion.div
        className="relative py-16 text-center"
        initial="hidden"
        variants={fadeUp}
        viewport={{ once: false, amount: 0.2 }}
        whileInView="show"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          About <span className="text-amber-600">{company.name}</span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {company.description}
        </p>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          whileInView={{ scaleX: 1 }}
        />
      </motion.div>

      {/* Mission + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-4">
        <motion.div
          initial="hidden"
          variants={fadeUp}
          viewport={{ once: false, amount: 0.2 }}
          whileInView="show"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Our Mission
          </h2>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
            {company.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <a
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-amber-600 text-white font-medium shadow hover:scale-105 transition-transform"
              href={company.cta.href}
            >
              {company.cta.label}
            </a>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Founded {company.founded} • {company.location}
            </span>
          </div>

          <motion.div
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial="hidden"
            variants={fadeIn}
            viewport={{ once: false }}
            whileInView="show"
          >
            {stats.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <div className="text-xl font-bold text-amber-600">
                  {s.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Pillars + Image + Testimonial */}
        <motion.div
          className="relative"
          initial="hidden"
          variants={fadeUp}
          viewport={{ once: false, amount: 0.3 }}
          whileInView="show"
        >
          <div className="rounded-2xl bg-gradient-to-tr from-amber-100 to-pink-100 dark:from-amber-700 dark:to-purple-700 p-6 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p) => (
                <motion.div
                  key={p.id}
                  className="flex items-start gap-3"
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg shadow-sm">
                    <Icon name={p.icon} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-white">
                      {p.title}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {p.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <Image
                alt="warehouse"
                className="mt-6 w-full h-44 sm:h-56 rounded-xl object-cover"
                height={44}
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                width={1000}
              />
            </motion.div>
          </div>

          {/* Floating Testimonial */}
          <motion.div
            className="absolute -bottom-6 left-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4 w-64"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="text-xs text-slate-500">Customer feedback</div>
            <div className="mt-2 text-sm text-slate-800 dark:text-white">
              “{testimonials[0].text}”
            </div>
            <div className="mt-3 text-xs text-slate-500">
              — {testimonials[0].name}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div
        className="mt-20"
        initial="hidden"
        variants={fadeUp}
        viewport={{ once: false, amount: 0.3 }}
        whileInView="show"
      >
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Meet the team
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          People who make it happen.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((m) => (
            <motion.div
              key={m.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow hover:shadow-lg transition"
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 relative rounded-full overflow-hidden border border-gray-300">
                  <Image
                    fill
                    alt={m.name}
                    className="object-cover"
                    src={m.image}
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-white">
                    {m.name}
                  </div>
                  <div className="text-sm text-slate-500">{m.role}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                {m.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        className="mt-16"
        initial="hidden"
        variants={fadeUp}
        viewport={{ once: false, amount: 0.2 }}
        whileInView="show"
      >
        <h4 className="text-xl font-bold text-slate-900 dark:text-white">
          Milestones
        </h4>
        <ol className="mt-6 space-y-4">
          {milestones.map((ms) => (
            <motion.li
              key={ms.id}
              className="flex gap-4"
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white font-bold">
                {ms.year}
              </div>
              <div>
                <div className="text-slate-800 dark:text-white font-semibold">
                  {ms.year}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {ms.text}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        className="mt-12 rounded-xl bg-gradient-to-r from-amber-600 to-purple-600 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="font-bold text-lg">Want to work with us?</div>
          <div className="text-sm opacity-90 mt-1">
            We partner with brands, creators and logistics partners to grow
            together.
          </div>
        </div>
        <a
          className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white text-amber-700 font-semibold hover:scale-105 transition"
          href="/contact"
        >
          Get in touch
        </a>
      </motion.div>
    </section>
  );
}
