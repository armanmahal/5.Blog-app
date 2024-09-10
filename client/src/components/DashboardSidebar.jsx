import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUser, FaSignOutAlt, FaBook } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signOutUser } from "../redux/user/userSlice";

export default function DashboardSidebar() {
  const location = useLocation();

  const [tab, setTab] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setTab(params.get("tab"));
  }, [location.search]);

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/user/signoutUser`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(signOutUser());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      toast("Signout Failed");
    }
  };

  return (
    <div className="w-full border-r-2 border-black flex flex-col gap-2 h-screen bg-purple-50 p-2 px-4 pt-12 ">
      <ToastContainer />
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
        to={"/dashboard?tab=posts"}
        className={` border-gray-500 md:hover:text-gray-600 w-full px-2 py-1 text-lg font-medium rounded-lg  ${
          tab === "posts" ? "bg-purple-200 border-[1px]" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <FaBook />
          <p>Posts</p>
        </div>
      </Link>

      <Link
        to={""}
        className="md:hover:text-gray-600 w-full px-2 py-1 text-lg font-medium rounded-lg"
      >
        <button className="flex items-center gap-3" onClick={handleSignout}>
          <FaSignOutAlt />
          <p>Sign Out</p>
        </button>
      </Link>
    </div>
  );
}
