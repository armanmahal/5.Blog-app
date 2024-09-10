import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardProfile from "../components/DashboardProfile";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import DashboardPosts from "../components/DashboardPosts";

export default function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = useState();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTab(params.get("tab"));
    setShowMenu(false);
  }, [location.search]);

  return (
    <div className="flex relative">
      {/* SIDEBAR FOR LARGE SCREEN*/}
      <div className="hidden w-[30%] max-w-80 md:block">
        <DashboardSidebar />
      </div>

      {/* SIDEBAR FOR SMALL SCREEN*/}

      <div
        className={`w-[70%] fixed z-40 top-0 ${
          showMenu ? "left-0" : "left-[-72%]"
        } transition-all`}
      >
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden fixed text-3xl font-extrabold left-[8px] top-[45vh] "
        >
          {showMenu ? <MdArrowBackIos /> : <MdArrowForwardIos />}
        </button>
        <DashboardSidebar />
      </div>

      {/* PROFILE */}
      {tab === "profile" && (
        <div className="w-full">
          <DashboardProfile />
        </div>
      )}

      {/* POSTS */}
      {tab === "posts" && (
        <div className="w-full">
          <DashboardPosts />
        </div>
      )}
    </div>
  );
}
