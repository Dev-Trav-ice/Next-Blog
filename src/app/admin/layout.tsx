import SideBar from "@/components/admin/SideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Blog Admin",
  description: "Exploring Tomorrows innovation one Byte at a time",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="flex-1/4 bg-gray-100">
        <SideBar />
      </div>
      <div className="flex-3/4 px-4">{children}</div>
    </div>
  );
}
