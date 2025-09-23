'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const SidebarOptions = ({ links, sidebarOpen }: { links: any; sidebarOpen: boolean }) => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="mt-2">
      {links?.map((link) => {
        const isActive = pathname === link.href;
        const hasChildren = link.children && link.children.length > 0;
        const isOpen = openMenus[link.label] || false;

        return (
          <div key={link.label} className="mb-1">
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggleMenu(link.label)}
                  className={`flex items-center justify-between w-full rounded-md px-3 py-2 transition ${
                    isOpen ? "bg-amber-500 text-white" : "hover:bg-amber-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    {sidebarOpen && link.label}
                  </span>
                  {sidebarOpen &&
                    (isOpen ? (
                      <FaChevronDown size={16} />
                    ) : (
                      <FaChevronRight size={16} />
                    ))}
                </button>

                {/* Submenu */}
                {isOpen && sidebarOpen && (
                  <div className="ml-6 mt-1 space-y-2">
                    {link.children?.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2 rounded-md ${
                            isChildActive
                              ? "bg-amber-500 text-white font-semibold"
                              : "hover:bg-amber-300"
                          }`}
                        >
                          ➤ {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className={`flex items-center gap-2 w-full rounded-md px-3 py-2 transition ${
                  isActive
                    ? "bg-amber-500 text-white font-semibold"
                    : "hover:bg-amber-300"
                }`}
              >
                {link.icon}
                {sidebarOpen && link.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarOptions;
