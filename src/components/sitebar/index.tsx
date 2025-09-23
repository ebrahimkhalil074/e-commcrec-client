
import { FaBars } from "react-icons/fa";
import { adminLinks, customerLinks, delivaryBoyLinks, sellerLinks } from "./constans";
import SidebarOptions from "./sidebarOptions";
import { useUser } from "@/src/context/User.context";
import Link from "next/link";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => {
 const {user} = useUser();
console.log('sidedar',user)
    // const user1 ={
    //     email:"rahi@gmail.com",
    //     role:"SELLER"
    // }
let sidebarLinks 
    if (user?.role === 'ADMIN') {
      sidebarLinks =adminLinks
    }
    if (user?.role === 'SELLER') {
      sidebarLinks =sellerLinks
    }
    if (user?.role === 'CUSTOMER') {
      sidebarLinks = customerLinks
    }
    if (user?.role === 'DELIVERYBOY') {
      sidebarLinks = delivaryBoyLinks
    }
  return (
    <div>
       <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`text-xl font-bold ${!sidebarOpen && "hidden"}`}><Link href='/'>ElectroShop</Link></h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <FaBars />
          </button>
        </div>
      <SidebarOptions sidebarOpen={sidebarOpen} 
      links={sidebarLinks}
      />
    </div>
  );
};

export default Sidebar;