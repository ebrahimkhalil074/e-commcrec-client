import { Navbar } from "@/src/components/navbar";


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     
      <div>
        {children}
      </div>
    </>
  );
}
