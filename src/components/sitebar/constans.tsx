import {
  FaList,
  FaPlus,
  FaUsers,
  FaChartBar,
  FaBoxOpen,
  FaMoneyBill,
  FaUserShield,
  FaTags,
  FaStore,
  FaStar,
  FaUser,
  FaHistory,
  FaHeart,
} from "react-icons/fa";

export const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin/overview",
    icon: <FaChartBar size={16} />,
  },
  {
    label: "Products",
    icon: <FaBoxOpen size={16} />,
    children: [
      {
        href: "/admin/products",
        label: "All Products",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/products/create",
        label: "Create Product",
        icon: <FaPlus size={16} />,
      },
      {
        href: "/admin/categories",
        label: "Categories",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/categories/create",
        label: " Create Category",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/subcategories",
        label: "SubCategories",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/subcategories/create",
        label: " Create SubCategories",
        icon: <FaList size={16} />,
      },
      { href: "/admin/brands", label: "Brands", icon: <FaList size={16} /> },
      {
        href: "/admin/brands/create",
        label: " Create Brands",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/flash-sales",
        label: "Flash Sales",
        icon: <FaTags size={16} />,
      },
      {
        href: "/admin/flash-sales/create",
        label: " Create Flash Sales",
        icon: <FaTags size={16} />,
      },
    ],
  },
  {
    label: "Users",
    icon: <FaUsers size={16} />,
    children: [
      { href: "/admin/users", label: "All Users", icon: <FaList size={16} /> },
      {
        href: "/admin/users/admins",
        label: "Admins",
        icon: <FaUserShield size={16} />,
      },
      {
        href: "/admin/users/sellers",
        label: "Sellers",
        icon: <FaStore size={16} />,
      },
      {
        href: "/admin/users/customers",
        label: "Customers",
        icon: <FaUsers size={16} />,
      },
    ],
  },
  {
    label: "Orders",
    icon: <FaMoneyBill size={16} />,
    children: [
      {
        href: "/admin/orders",
        label: "All Orders",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/orders/pending",
        label: "Pending Orders",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/orders/shipped",
        label: "Shipped Orders",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/orders/completed",
        label: "Completed Orders",
        icon: <FaList size={16} />,
      },
    ],
  },
  {
    label: "Payments",
    icon: <FaMoneyBill size={16} />,
    children: [
      {
        href: "/admin/payments",
        label: "All Payments",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/payments/due",
        label: "Due Payments",
        icon: <FaList size={16} />,
      },
      {
        href: "/admin/payments/completed",
        label: "Completed Payments",
        icon: <FaList size={16} />,
      },
    ],
  },

  {
    label: "Profile",
    href: "/admin/profile",
    icon: <FaUser size={16} />,
    // children: [
    //   {  label: "Profile Settings", icon: <FaUser size={16} /> },
    //   { href: "/seller/profile/password", label: "Change Password", icon: <FaUser size={16} /> },
    // ],
  },
];

export const sellerLinks = [
  {
    label: "Dashboard",
    href: "/seller/overview",
    icon: <FaBoxOpen size={16} />,
  },

  {
    label: "Orders",
    href: "/seller/orders",
    icon: <FaMoneyBill size={16} />,
    // children: [
    //   { href: "/seller/orders", label: "All Orders", icon: <FaList size={16} /> },
    //   { href: "/seller/orders/pending", label: "Pending Orders", icon: <FaList size={16} /> },
    //   { href: "/seller/orders/completed", label: "Completed Orders", icon: <FaList size={16} /> },
    // ],
  },
  {
    label: "Payments",
    href: "/seller/payments",
    icon: <FaMoneyBill size={16} />,
    // children: [
    //   { href: "/seller/payments", label: "All Payments", icon: <FaList size={16} /> },
    //   { href: "/seller/payments/due", label: "Due Payments", icon: <FaList size={16} /> },
    //   { href: "/seller/payments/completed", label: "Completed Payments", icon: <FaList size={16} /> },
    // ],
  },
  {
    label: "Reviews",
    icon: <FaStar size={16} />,
    children: [
      {
        href: "/seller/reviews",
        label: "All Reviews",
        icon: <FaStar size={16} />,
      },
      {
        href: "/seller/reviews/negative",
        label: "Negative Reviews",
        icon: <FaStar size={16} />,
      },
    ],
  },
  {
    label: "Profile",
    href: "/seller/profile",
    icon: <FaUser size={16} />,
    // children: [
    //   {  label: "Profile Settings", icon: <FaUser size={16} /> },
    //   { href: "/seller/profile/password", label: "Change Password", icon: <FaUser size={16} /> },
    // ],
  },
];

export const customerLinks = [
  {
    label: "Dashboard",
    href: "/customer/overview",
    icon: <FaBoxOpen size={16} />,
  },
  {
    label: "Orders",
    icon: <FaHistory size={16} />,
    href: "/customer/orders",
  },
  {
    label: "Payments",
    icon: <FaMoneyBill size={16} />,
    href: "/customer/payments",
  },
  {
    label: "Reviews",
    icon: <FaStar size={16} />,
    href: "/customer/reviews",
  },
  {
    label: "Viewed Products",
    href: "/customer/viewed-products",
    icon: <FaHistory size={16} />,
  },
  {
    label: "Wishlist",
    href: "/customer/wishlist",
    icon: <FaHeart size={16} />,
  },
  {
    label: "Profile",
    icon: <FaUser size={16} />,
    href: "/customer/profile",
  },
];
export const delivaryBoyLinks = [
  {
    label: "Dashboard",
    href: "/delivaryboy/overview",
    icon: <FaBoxOpen size={16} />,
  },
  {
    label: "Tasks",
    icon: <FaHistory size={16} />,
    href: "/delivaryboy/tasks",
  },

  {
    label: "Profile",
    icon: <FaUser size={16} />,
    href: "/customer/profile",
  },
];
