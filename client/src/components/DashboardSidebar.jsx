import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";

export default function DashboardSidebar() {
  const location = useLocation();

  const [tab, setTab] = useState();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTab(params.get("tab"));
  }, [location.search]);

  return (
    <div className="w-full border-r-2 border-black flex flex-col gap-2 h-screen bg-purple-50 p-2 px-4 pt-4">
      <Link
        to={"/dashboard?tab=profile"}
        className={` border-gray-500 md:hover:text-gray-600 w-full px-2 py-1 text-lg font-medium rounded-lg  ${
          tab === "profile" ? "bg-purple-200 border-[1px]" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <FaRegUser />
          <p>Profile</p>
        </div>
      </Link>

      <Link
        to={""}
        className="md:hover:text-gray-600 w-full px-2 py-1 text-lg font-medium rounded-lg"
      >
        <div className="flex items-center gap-3">
          <FaSignOutAlt />
          <p>Sign Out</p>
        </div>
      </Link>
    </div>
  );
}
