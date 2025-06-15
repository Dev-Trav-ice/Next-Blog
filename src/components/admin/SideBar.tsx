import Link from "next/link";
import React from "react";

export default function SideBar() {
  return (
    <div className="bg-gray-100 h-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-4 text-primary text-2xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex flex-col gap-4">
          <Link className="link" href={"/admin"}>
            Post Category
          </Link>
          <Link className="link" href={"/create-category"}>
            Users
          </Link>
          <Link className="link" href={"/create-category"}>
            Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
