// // "use client";
// // import {
// //   Navbar as HeroUINavbar,
// //   NavbarContent,
// //   NavbarMenu,
// //   NavbarMenuToggle,
// //   NavbarBrand,
// //   NavbarItem,
// //   NavbarMenuItem,
// // } from "@heroui/navbar";
// // import { Input } from "@heroui/input";
// // import NextLink from "next/link";
// // import clsx from "clsx";
// // import { FaCartPlus } from "react-icons/fa";
// // import { useRouter } from "next/navigation";
// // import { useForm } from "react-hook-form";
// // import Link from "next/link";

// // import { useUser } from "../context/User.context";
// // import { useGetCart } from "../hooks/cart.hook";

// // import NavbarDropdown from "./NavbarDropdown";

// // import { SearchIcon, Logo } from "@/src/components/icons";
// // import { ThemeSwitch } from "@/src/components/theme-switch";
// // import { siteConfig } from "@/src/config/site";

// // interface SearchForm {
// //   searchTerm: string;
// // }

// // export const Navbar = () => {
// //   const router = useRouter();
// //   const { data } = useGetCart();

// //   console.log(data);
// //   const cartItems = (data as { items: any[] })?.items ?? [];

// //   console.log(cartItems);
// //   const cartCount = cartItems.length;
// //   const { user } = useUser();
// //   const { register, handleSubmit } = useForm<SearchForm>();

// //   const onSubmit = (data: SearchForm) => {
// //     if (data.searchTerm.trim()) {
// //       router.push(`/product?searchTerm=${encodeURIComponent(data.searchTerm)}`);
// //     } else {
// //       router.push("/product");
// //     }
// //   };

// //   const searchInput = (
// //     <form
// //       className="flex items-center w-full"
// //       onSubmit={handleSubmit(onSubmit)}
// //     >
// //       <Input
// //         {...register("searchTerm")}
// //         className="text-black dark:text-white"
// //         endContent={
// //           <button
// //             className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
// //             type="submit"
// //           >
// //             <SearchIcon />
// //           </button>
// //         }
// //         placeholder="Search products..."
// //         type="search"
// //       />
// //     </form>
// //   );

// //   return (
// //     <HeroUINavbar
// //       className="bg-amber-500 text-white dark:bg-gray-900 dark:text-gray-100 shadow-md container mx-auto transition-colors duration-300"
// //       maxWidth="xl"
// //       position="sticky"
// //     >
// //       {/* Left side - Logo & Menu */}
// //       <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
// //         <NavbarBrand as="li" className="gap-3 max-w-fit">
// //           <NextLink className="flex justify-start items-center gap-1" href="/">
// //             <Logo />
// //             <p className="font-bold text-white dark:text-amber-400">
// //               ElectroShop
// //             </p>
// //           </NextLink>
// //         </NavbarBrand>

// //         {/* Nav Links */}
// //         <ul className="hidden lg:flex gap-4 justify-start ml-2">
// //           {siteConfig.navItems.map((item) => (
// //             <NavbarItem key={item.href}>
// //               <NextLink
// //                 className={clsx(
// //                   "font-medium text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400 transition-colors",
// //                 )}
// //                 href={item.href}
// //               >
// //                 {item.label}
// //               </NextLink>
// //             </NavbarItem>
// //           ))}
// //         </ul>
// //       </NavbarContent>

// //       {/* Right side - Search, Theme, Cart */}
// //       <NavbarContent
// //         className="hidden sm:flex basis-1/5 sm:basis-full"
// //         justify="end"
// //       >
// //         {user && user.email && user.role === "CUSTOMER" && (
// //           <NavbarItem className="hidden sm:flex gap-2">
// //             <Link href="/becomeaseller">Become a Seller</Link>
// //           </NavbarItem>
// //         )}
// //         <NavbarItem className="hidden sm:flex gap-2">
// //           <ThemeSwitch />
// //         </NavbarItem>

// //         <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
// //         <NavbarItem className="hidden sm:flex gap-2">
// //           {user?.email ? (
// //             <div className="">
// //               <NavbarDropdown />
// //             </div>
// //           ) : (
// //             <Link
// //               className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-md text-white font-semibold"
// //               href="/login"
// //             >
// //               Login
// //             </Link>
// //           )}
// //         </NavbarItem>
// //         <Link href="/cart">
// //           <NavbarItem className="hidden md:flex relative">
// //             <FaCartPlus className="text-white dark:text-gray-200 text-xl hover:text-amber-200 dark:hover:text-amber-400 transition-colors" />
// //             {cartCount > 0 && (
// //               <span
// //                 aria-label={`${cartCount} items in cart`}
// //                 className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
// //               >
// //                 {cartCount}
// //               </span>
// //             )}
// //           </NavbarItem>
// //         </Link>
// //       </NavbarContent>

// //       {/* Mobile menu toggle */}
// //       <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
// //         <ThemeSwitch />
// //         <NavbarMenuToggle className="text-white dark:text-gray-200" />
// //       </NavbarContent>

// //       {/* Mobile Menu */}
// //       <NavbarMenu className="bg-amber-500 text-white dark:bg-gray-900 dark:text-gray-100">
// //         {searchInput}
// //         <div className="mx-4 mt-2 flex flex-col gap-2">
// //           {siteConfig.navMenuItems.map((item, index) => (
// //             <NavbarMenuItem key={`${item}-${index}`}>
// //               <Link
// //                 className="text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400"
// //                 href={item.href}
// //               >
// //                 {item.label}
// //               </Link>
// //             </NavbarMenuItem>
// //           ))}
// //         </div>
// //       </NavbarMenu>
// //     </HeroUINavbar>
// //   );
// // };

// "use client";
// import {
//   Navbar as HeroUINavbar,
//   NavbarContent,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarBrand,
//   NavbarItem,
// } from "@heroui/navbar";
// import { Input } from "@heroui/input";
// import NextLink from "next/link";
// import clsx from "clsx";
// import { FaCartPlus } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { motion } from "framer-motion";

// import { useUser } from "../context/User.context";
// import { useGetCart } from "../hooks/cart.hook";

// import NavbarDropdown from "./NavbarDropdown";

// import { SearchIcon, Logo } from "@/src/components/icons";
// import { ThemeSwitch } from "@/src/components/theme-switch";
// import { siteConfig } from "@/src/config/site";

// interface SearchForm {
//   searchTerm: string;
// }

// export const Navbar = () => {
//   const router = useRouter();
//   const { data } = useGetCart();
//   const cartItems = (data as { items: any[] })?.items ?? [];
//   const cartCount = cartItems.length;
//   const { user } = useUser();
//   const { register, handleSubmit } = useForm<SearchForm>();

//   const onSubmit = (data: SearchForm) => {
//     if (data.searchTerm.trim()) {
//       router.push(`/product?searchTerm=${encodeURIComponent(data.searchTerm)}`);
//     } else {
//       router.push("/product");
//     }
//   };

//   const searchInput = (
//     <form
//       className="flex items-center w-full"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <Input
//         {...register("searchTerm")}
//         className="text-black dark:text-white"
//         endContent={
//           <button
//             className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
//             type="submit"
//           >
//             <SearchIcon />
//           </button>
//         }
//         placeholder="Search products..."
//         type="search"
//       />
//     </form>
//   );

//   // Navbar motion variants
//   const navVariants = {
//     hidden: { y: -50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.3 },
//     }),
//   };

//   return (
//     <motion.div
//       animate="visible"
//       className="w-full sticky top-0 z-50"
//       initial="hidden"
//       variants={navVariants}
//     >
//       <HeroUINavbar
//         className="bg-amber-500 text-white dark:bg-gray-900 dark:text-gray-100 shadow-md container mx-auto transition-colors duration-300"
//         maxWidth="xl"
//         position="sticky"
//       >
//         {/* Left side - Logo & Menu */}
//         <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
//           <NavbarBrand as="li" className="gap-3 max-w-fit">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <NextLink
//                 className="flex justify-start items-center gap-1"
//                 href="/"
//               >
//                 <Logo />
//                 <p className="font-bold text-white dark:text-amber-400">
//                   ElectroShop
//                 </p>
//               </NextLink>
//             </motion.div>
//           </NavbarBrand>

//           {/* Nav Links */}
//           <ul className="hidden lg:flex gap-4 justify-start ml-2">
//             {siteConfig.navItems.map((item, i) => (
//               <motion.li
//                 key={item.href}
//                 animate="visible"
//                 custom={i}
//                 initial="hidden"
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05, color: "#fcd34d" }}
//               >
//                 <NextLink
//                   className={clsx(
//                     "font-medium text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400 transition-colors",
//                   )}
//                   href={item.href}
//                 >
//                   {item.label}
//                 </NextLink>
//               </motion.li>
//             ))}
//           </ul>
//         </NavbarContent>

//         {/* Right side - Search, Theme, Cart */}
//         <NavbarContent
//           className="hidden sm:flex basis-1/5 sm:basis-full"
//           justify="end"
//         >
//           {user && user.email && user.role === "CUSTOMER" && (
//             <motion.div
//               className="hidden sm:flex gap-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               <Link href="/becomeaseller">Become a Seller</Link>
//             </motion.div>
//           )}

//           <motion.div className="hidden sm:flex" whileHover={{ rotate: 10 }}>
//             <ThemeSwitch />
//           </motion.div>

//           <motion.div
//             animate={{ opacity: 1, y: 0 }}
//             className="hidden lg:flex"
//             initial={{ opacity: 0, y: -10 }}
//             transition={{ delay: 0.3 }}
//           >
//             {searchInput}
//           </motion.div>

//           <NavbarItem className="hidden sm:flex gap-2">
//             {user?.email ? (
//               <motion.div whileHover={{ scale: 1.03 }}>
//                 <NavbarDropdown />
//               </motion.div>
//             ) : (
//               <motion.div whileHover={{ scale: 1.05 }}>
//                 <Link
//                   className="
//       px-4 py-2 rounded-md font-semibold transition-all duration-300
//       text-white
//       bg-amber-500 hover:bg-amber-600
//       dark:bg-amber-400 dark:hover:bg-amber-500
//       shadow-md dark:shadow-amber-800/30
//     "
//                   href="/login"
//                 >
//                   Login
//                 </Link>
//               </motion.div>
//             )}
//           </NavbarItem>

//           <Link href="/cart">
//             <motion.div
//               className="hidden md:flex relative"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <FaCartPlus className="text-white dark:text-gray-200 text-xl hover:text-amber-200 dark:hover:text-amber-400 transition-colors" />
//               {cartCount > 0 && (
//                 <span
//                   aria-label={`${cartCount} items in cart`}
//                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold"
//                 >
//                   {cartCount}
//                 </span>
//               )}
//             </motion.div>
//           </Link>
//         </NavbarContent>

//         {/* Mobile Menu Toggle */}
//         <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
//           <motion.div whileHover={{ rotate: 10 }}>
//             <ThemeSwitch />
//           </motion.div>
//           <NavbarMenuToggle className="text-white dark:text-gray-200" />
//         </NavbarContent>
//         {/* Mobile Menu */}
//         <NavbarMenu className="bg-amber-500 text-white dark:bg-gray-900 dark:text-gray-100">
//           {searchInput}
//           <div className="mx-4 mt-2 flex flex-col gap-2">
//             {siteConfig.navMenuItems.map((item, index) => (
//               <motion.div
//                 key={index}
//                 animate={{ opacity: 1, x: 0 }}
//                 initial={{ opacity: 0, x: -10 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Link
//                   className="text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400"
//                   href={item.href}
//                 >
//                   {item.label}
//                 </Link>
//               </motion.div>
//             ))}

//             {/* User Dropdown for Mobile */}
//             <div className="mt-2">
//               {user?.email ? (
//                 <NavbarDropdown />
//               ) : (
//                 <motion.div
//                   animate={{ opacity: 1, x: 0 }}
//                   initial={{ opacity: 0, x: -10 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <Link
//                     className="text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400"
//                     href="/login"
//                   >
//                     Login
//                   </Link>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </NavbarMenu>
//       </HeroUINavbar>
//     </motion.div>
//   );
// };
"use client";

import React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { useUser } from "../context/User.context";
import { useGetCart } from "../hooks/cart.hook";

import NavbarDropdown from "./NavbarDropdown";

import { SearchIcon, Logo } from "@/src/components/icons";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { siteConfig } from "@/src/config/site";

interface SearchForm {
  searchTerm: string;
}

export const Navbar = () => {
  const router = useRouter();
  const { data } = useGetCart();
  const cartItems = (data as { items: any[] })?.items ?? [];
  console.log(cartItems)
  const cartCount = cartItems.length;
  const { user } = useUser();
  const { register, handleSubmit } = useForm<SearchForm>();

  const onSubmit = (data: SearchForm) => {
    if (data.searchTerm.trim()) {
      router.push(`/product?searchTerm=${encodeURIComponent(data.searchTerm)}`);
    } else {
      router.push("/product");
    }
  };

  const searchInput = (
    <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("searchTerm")}
        className="text-black dark:text-white"
        endContent={
          <button
            className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
            type="submit"
          >
            <SearchIcon />
          </button>
        }
        placeholder="Search products..."
        type="search"
      />
    </form>
  );

  // Motion variants
  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      animate="visible"
      className="w-full sticky top-0 z-50"
      initial="hidden"
      variants={navVariants}
    >
      <HeroUINavbar
        className="bg-amber-500 text-white dark:bg-gray-900 dark:text-gray-100 shadow-md container mx-auto transition-colors duration-300"
        maxWidth="xl"
        position="sticky"
      >
        {/* Left Side */}
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NextLink className="flex items-center gap-1" href="/">
                <Logo />
                <p className="font-bold text-white dark:text-amber-400">
                  ElectroShop
                </p>
              </NextLink>
            </motion.div>
          </NavbarBrand>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item, i) => (
              <motion.li
                key={item.href}
                animate="visible"
                custom={i}
                initial="hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.05, color: "#fcd34d" }}
              >
                <NextLink
                  className="font-medium text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400 transition-colors"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </motion.li>
            ))}
          </ul>
        </NavbarContent>

        {/* Right Side */}
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          {user && user.email && user.role === "CUSTOMER" && (
            <motion.div
              className="hidden sm:flex gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <NextLink href="/becomeaseller">Become a Seller</NextLink>
            </motion.div>
          )}

          <motion.div className="hidden sm:flex" whileHover={{ rotate: 10 }}>
            <ThemeSwitch />
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:flex"
            initial={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.3 }}
          >
            {searchInput}
          </motion.div>

          <NavbarItem className="hidden sm:flex gap-2">
            {user?.email ? (
              <NavbarDropdown />
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <NextLink
                  className="px-4 py-2 rounded-md font-semibold transition-all duration-300
                  text-white bg-amber-500 hover:bg-amber-600
                  dark:bg-amber-400 dark:hover:bg-amber-500 shadow-md dark:shadow-amber-800/30"
                  href="/login"
                >
                  Login
                </NextLink>
              </motion.div>
            )}
          </NavbarItem>

          <NextLink href="/cart">
            <motion.div
              className="hidden md:flex relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCartPlus className="text-white dark:text-gray-200 text-xl hover:text-amber-200 dark:hover:text-amber-400 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </motion.div>
          </NextLink>
        </NavbarContent>

        {/* Mobile Toggle */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <motion.div whileHover={{ rotate: 10 }}>
            <ThemeSwitch />
          </motion.div>

          <motion.div whileHover={{ rotate: 10 }}>
           {/* User Dropdown */}
            {user?.email ? (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="px-2 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
              >
                <NavbarDropdown />
              </motion.div>
            ) : (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
              >
                <NextLink
                  className="text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400 px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
                  href="/login"
                >
                  Login
                </NextLink>
              </motion.div>
            )}
          </motion.div>
          <NavbarMenuToggle className="text-white dark:text-gray-200" />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="bg-amber-500 text-white dark:bg-gray-900 dark:text-gray-100">
          {/* Search */}
          <div className="mx-4 mt-2">{searchInput}</div>

          {/* Menu Items */}
          <div className="mx-4 mt-4 flex flex-col gap-3">
            {siteConfig.navMenuItems.map((item, index) => (
              <motion.div
                key={index}
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <NextLink
                  className="text-white hover:text-amber-200 dark:text-gray-200 dark:hover:text-amber-400 px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </motion.div>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </motion.div>
  );
};
