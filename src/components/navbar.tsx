"use client"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { GithubIcon, SearchIcon, Logo } from "@/src/components/icons";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Avatar } from "@heroui/react";
import NavbarDropdown from "./NavbarDropdown";
import { useUser } from "../context/User.context";
import { useGetCart } from "../hooks/cart.hook";

interface SearchForm {
  searchTerm: string;
}

export const Navbar = () => {
  const router = useRouter();
   const { data, isLoading } = useGetCart();
   console.log(data)
    const cartItems =  data?.items ?? [];
    console.log(cartItems)
  const cartCount = cartItems.length;
const {user} =useUser()
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit = (data: SearchForm) => {
    if (data.searchTerm.trim()) {
      router.push(`/product?searchTerm=${encodeURIComponent(data.searchTerm)}`);
    } else {
      router.push("/product");
    }
  };

  const searchInput = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center w-full">
      <Input
        {...register("searchTerm")}
        type="search"
        placeholder="Search products..."
        className="text-black dark:text-white"
        endContent={
          <button
            type="submit"
            className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            <SearchIcon />
          </button>
        }
      />
    </form>
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-amber-500 text-white dark:bg-gray-900 dark:text-gray-100 shadow-md container mx-auto transition-colors duration-300"
    >
      {/* Left side - Logo & Menu */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-white dark:text-amber-400">ElectroShop</p>
          </NextLink>
        </NavbarBrand>

        {/* Nav Links */}
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "font-medium text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400 transition-colors"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Right side - Search, Theme, Cart */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
<NavbarItem className="hidden sm:flex gap-2">
         {user?.email ? (
          <div className="">
            <NavbarDropdown />
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-semibold"
          >
            Login
          </Link>
        )}
        </NavbarItem>
        <Link href="/cart">
          <NavbarItem className="hidden md:flex relative">
            <FaCartPlus className="text-white dark:text-gray-200 text-xl hover:text-amber-200 dark:hover:text-amber-400 transition-colors" />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </span>
            )}
          </NavbarItem>
        </Link>
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle className="text-white dark:text-gray-200" />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-amber-500 text-white dark:bg-gray-900 dark:text-gray-100">
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
