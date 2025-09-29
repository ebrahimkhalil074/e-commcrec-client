"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

import { useGetAllCategory } from "../hooks/category.hook";

export default function Filtering() {
  const { data: categoriesData, isLoading } = useGetAllCategory(undefined);
  const category = categoriesData?.data;

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <>loding...</>
      ) : (
        <nav className="bg-white shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
            {/* Logo */}
            <Link className="text-xl font-bold text-blue-600" href="/">
              ElectroShop
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6">
              {category.map((cat: any) => (
                <li key={cat.id} className="relative">
                  <button
                    className="hover:text-blue-600 font-medium"
                    onClick={() =>
                      setOpenCategory(openCategory === cat.id ? null : cat.id)
                    }
                  >
                    {cat.name}
                  </button>

                  {/* Dropdown */}
                  {cat.subCategories.length > 0 && openCategory === cat.id && (
                    <ul className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-48">
                      {cat.subCategories.map((sub: any) => (
                        <li key={sub.id}>
                          <Link
                            className="block px-4 py-2 hover:bg-gray-100"
                            href={`/category/${cat.slug}/${sub.slug}`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4 text-lg">
              <button>
                <FiSearch className="hover:text-blue-600" />
              </button>
              <button>
                <FiHeart className="hover:text-blue-600" />
              </button>
              <button>
                <FiShoppingCart className="hover:text-blue-600" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden bg-white shadow-lg">
              <ul className="flex flex-col p-4 space-y-2">
                {category.map((cat: any) => (
                  <li key={cat.id}>
                    <details>
                      <summary className="cursor-pointer font-medium hover:text-blue-600">
                        {cat.name}
                      </summary>
                      <ul className="pl-4 mt-1 space-y-1">
                        {cat.subCategories.map((sub: any) => (
                          <li key={sub.id}>
                            <Link
                              className="block px-2 py-1 hover:bg-gray-100 rounded"
                              href={`/category/${cat.slug}/${sub.slug}`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      )}
    </>
  );
}
