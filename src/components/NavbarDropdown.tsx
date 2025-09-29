import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
// import { useCustomSession } from "../context/sessonContext";
import { useRouter } from "next/navigation";

import { useUser } from "../context/User.context";
import { Logout } from "../services/authServices";
// import { signOut } from "next-auth/react";

const NavbarDropdown = () => {
  const router = useRouter();
  // const { session } = useCustomSession();
  const { user, setIsLoading, setUser } = useUser();
  // লগআউট ফাংশন
  const handleLogout = async () => {
    console.log("লগআউট হচ্ছে...");
    Logout();
    setUser(null);
    setIsLoading(true);
    // await signOut({ callbackUrl: "/" }); // লগআউটের পর হোম পেজে নিয়ে যাবে
  };

  // নেভিগেশন ফাংশন
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  // মেনু আইটেমগুলো আলাদাভাবে বানানো হচ্ছে
  const menuItems = [];

  if (user?.email) {
    let dashboardPath = "";

    if (user?.role === "ADMIN") {
      dashboardPath = "/admin/overview";
    } else if (user?.role === "SELLER") {
      dashboardPath = "/seller/overview";
    } else if (user?.role === "CUSTOMER") {
      dashboardPath = "/customer/overview";
    } else if (user?.role === "DELIVERYBOY") {
      dashboardPath = "/delivaryboy/overview";
    }

    menuItems.push(
      <DropdownItem
        key="dashboard"
        onClick={() => handleNavigation(dashboardPath)}
      >
        Dashboard
      </DropdownItem>,
    );
  }

  // সবার জন্য লগআউট আইটেম
  menuItems.push(
    <DropdownItem
      key="delete"
      className="text-danger"
      color="danger"
      onClick={handleLogout}
    >
      Logout
    </DropdownItem>,
  );

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar className="cursor-pointer" src={user?.image as string} />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Menu" disabledKeys={["edit"]}>
          {menuItems}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropdown;
