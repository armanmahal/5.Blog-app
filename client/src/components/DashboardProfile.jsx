import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuRefreshCcw } from "react-icons/lu";

export default function DashboardProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [data, setData] = useState({
    username: currentUser.username,
    email: currentUser.email,
  });

  return (
    <div className="flex flex-col gap-4 items-center w-full py-8">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            className="w-[90px] h-[90px] border-black border-2 rounded-[50%]"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="DP"
          ></img>
          {/* CHANGE PROFILE PHOTO BUTTON */}
          <button
            className="border-[1px] border-black absolute top-0 left-1 rounded-full bg-white p-1 md:hover:bg-gray-300"
            onClick={null}
          >
            <LuRefreshCcw />
          </button>
        </div>

        <h1 className="text-2xl font-bold">{data.username}</h1>
      </div>

      <div className="flex items-center flex-col ">
        <p className="text-sm text-gray-600 left-[40%] top-[-18px]">Email</p>
        <h2 className="border-[1px] border-gray-500 px-2 rounded-md min-w-[300px]">
          {data.email}
        </h2>
      </div>

      {/* CHANGE PASSWORD BUTTON */}
      <button
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-md mt-2 md:hover:shadow-custom-logo md:hover:shadow-pink-300"
        onClick={null}
      >
        Change Password
      </button>

      <div className="mt-1 flex flex-col gap-2 justify-center items-center">
        {/* DELETE ACCOUNT BUTTON */}
        <button
          className="border-2 border-red-400 px-2 py-[2px] rounded-md md:hover:bg-red-400 md:hover:text-white"
          onClick={null}
        >
          Delete Account
        </button>
        {/* SIGNOUT BUTTON */}
        <button
          className="border-2 border-red-400 px-2 py-[2px] rounded-md md:hover:bg-red-400 md:hover:text-white"
          onClick={null}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
