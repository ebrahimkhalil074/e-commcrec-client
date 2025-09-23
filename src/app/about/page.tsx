// AboutUsComponent.jsx
// Production-ready, editable "About Us" component for a demo e‑commerce site.
// - Drop into a Next.js or Create React App project (client component).
// - Uses Tailwind CSS classes (v2+/JIT). Replace images with your own or use Next/Image if desired.
// - Edit the `DEFAULT_DATA` object below to change all visible content.

import React from 'react';
import { FaTruck, FaShieldAlt, FaHeadset, FaShoppingBag } from 'react-icons/fa';

const DEFAULT_DATA = {
  company: {
    name: 'মায়ের দোয়া Marketplace',
    tagline: 'Quality goods. Honest prices. Fast delivery.',
    founded: 2018,
    location: 'Dhaka, Bangladesh',
    description:
      'Aurora Marketplace connects local makers and trusted brands with shoppers across the region. We focus on sustainable sourcing, transparent pricing and lightning-fast logistics so you get what you need — without compromise.',
    cta: {
      label: 'Start Shopping',
      href: '/shop',
    },
  },
  stats: [
    { id: 's1', label: 'Products', value: '3,420+' },
    { id: 's2', label: 'Happy customers', value: '42,300+' },
    { id: 's3', label: 'Countries served', value: '6' },
    { id: 's4', label: 'Avg. delivery (hrs)', value: '48' },
  ],
  pillars: [
    { id: 'p1', icon: 'FaShieldAlt', title: 'Trust & Safety', text: 'Verified sellers, buyer protection and secure payments.' },
    { id: 'p2', icon: 'FaTruck', title: 'Fast Delivery', text: 'Multiple shipping hubs for faster fulfillment.' },
    { id: 'p3', icon: 'FaShoppingBag', title: 'Curated Selection', text: 'Handpicked products from reliable suppliers.' },
    { id: 'p4', icon: 'FaHeadset', title: '24/7 Support', text: 'Local support team ready to help.' },
  ],
  team: [
    {
      id: 't1',
      name: 'Fatima Noor',
      role: 'Founder & CEO',
      bio: 'Ex‑ecommerce product manager passionate about sustainable retail and inclusive growth.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 't2',
      name: 'Rashed Hossain',
      role: 'Head of Engineering',
      bio: 'Builds resilient systems and loves clean API design.',
      image: 'https://images.unsplash.com/photo-1545996124-8a1f8b8f4d49?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 't3',
      name: 'Nadia Islam',
      role: 'Head of Operations',
      bio: 'Scaling fulfillment and customer experience across multiple cities.',
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    },
  ],
  milestones: [
    { id: 'm1', year: 2018, text: 'Company founded with 2 founders and a laptop.' },
    { id: 'm2', year: 2019, text: 'Reached 10k customers and launched B2B partnerships.' },
    { id: 'm3', year: 2021, text: 'Opened first fulfillment center outside Dhaka.' },
    { id: 'm4', year: 2024, text: 'Crossed 1M orders milestone.' },
  ],
  testimonials: [
    {
      id: 'c1',
      name: 'Samir Ahmed',
      text: "Fast delivery, good packaging — Aurora saved me hours of shopping.",
    },
    {
      id: 'c2',
      name: 'Rina K.',
      text: 'Great selection of local artisans — quality products every time.',
    },
  ],
};

function Icon({ name, className = 'h-6 w-6' }) {
  switch (name) {
    case 'FaShieldAlt':
      return <FaShieldAlt className={className} />;
    case 'FaTruck':
      return <FaTruck className={className} />;
    case 'FaHeadset':
      return <FaHeadset className={className} />;
    case 'FaShoppingBag':
      return <FaShoppingBag className={className} />;
    default:
      return <FaShoppingBag className={className} />;
  }
}

export default function AboutUs({ data = DEFAULT_DATA }) {
  const { company, stats, pillars, team, milestones, testimonials } = data;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Company intro */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">About {company.name}</h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{company.tagline}</p>

            <p className="mt-6 text-slate-700 dark:text-slate-300 leading-relaxed">{company.description}</p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <a
                href={company.cta.href}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-amber-600 text-white font-medium shadow hover:scale-[1.02] transition-transform"
              >
                {company.cta.label}
              </a>

              <div className="text-sm text-slate-500 dark:text-slate-400">
                Founded {company.founded} • {company.location}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
                  <div className="text-xl font-bold text-amber-600">{s.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pillars + visual */}
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-tr from-amber-100 to-pink-100 dark:from-amber-700 dark:to-purple-700 p-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((p) => (
                  <div key={p.id} className="flex items-start gap-3">
                    <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg shadow-sm">
                      <Icon name={p.icon} className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-white">{p.title}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{p.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                  alt="warehouse"
                  className="w-full rounded-xl object-cover h-44 sm:h-56"
                />
              </div>
            </div>

            {/* Decorative floating card */}
            <div className="absolute -bottom-6 left-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-4 w-64">
              <div className="text-xs text-slate-500">Customer feedback</div>
              <div className="mt-2 text-sm text-slate-800 dark:text-white">“{testimonials[0].text}”</div>
              <div className="mt-3 text-xs text-slate-500">— {testimonials[0].name}</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Meet the team</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">People who make it happen.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow hover:shadow-lg transition">
                <div className="flex items-center gap-4">
                  <img src={m.image} alt={m.name} className="w-16 h-16 rounded-full object-cover border" />
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-white">{m.name}</div>
                    <div className="text-sm text-slate-500">{m.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline / milestones */}
        <div className="mt-16">
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Milestones</h4>
          <ol className="mt-6 space-y-4">
            {milestones.map((ms) => (
              <li key={ms.id} className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white font-bold">{ms.year}</div>
                <div>
                  <div className="text-slate-800 dark:text-white font-semibold">{ms.year}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">{ms.text}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-amber-600 to-purple-600 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-lg">Want to work with us?</div>
            <div className="text-sm opacity-90 mt-1">We partner with brands, creators and logistics partners to grow together.</div>
          </div>
          <a href="/contact" className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white text-amber-700 font-semibold">Get in touch</a>
        </div>
      </div>
    </section>
  );
}

/*
HOW TO USE / CUSTOMIZE
1. Replace DEFAULT_DATA values to change company copy, stats, team, etc.
2. Swap image URLs for your real team/hero images or use Next.js <Image> for optimization.
3. This component is intentionally data-driven: pass a `data` prop to override DEFAULT_DATA.

Example:
<AboutUs data={myCustomAboutData} />

Accessibility notes:
- Headings are semantic (h2/h3/h4).
- Images include alt text; replace with descriptive text where appropriate.

Production tips:
- Use Next/Image with proper sizing and placeholder blur for performance.
- Move DEFAULT_DATA to a CMS or JSON file for non-developer edits (Sanity, Contentful, Netlify CMS, or a simple JSON served from /public).
- Add unit/integration tests for presence of core blocks (intro, stats, team).
*/

