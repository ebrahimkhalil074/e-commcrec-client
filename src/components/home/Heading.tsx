"use client";

import React from "react";

type HeadingProps = {
  title: string;
  subtitle?: string;
  bgImage?: string;
  className?: string;
};

export default function Heading({
  title,
  subtitle,
  bgImage,
  className = "",
}: HeadingProps) {
  return (
    <section
      className={`relative w-full ${className}`}
      style={{
         backgroundImage: "url('https://i.ibb.co.com/KxmW2hZv/mona-eendra-v-C8wj-Kphak-unsplash.jpg')",
         backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
      }}
    >

      <div className="relative max-w-6xl mx-auto p-6 mb-2">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-500 dark:text-white inline-block relative">
          {title}
        
        </h2>
      </div>
    </section>
  );
}
