import React, { useEffect, useState } from "react";
import { FaSearch, FaGripLines, FaChevronUp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const [search, setSearch] = useState("");
  const [navIsOpen, setNavIsOpen] = useState(false);

  const path = useLocation().pathname;

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setNavIsOpen(false);
  }, [path]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };

  return (
    <div className="border-black border-b-2 bg-purple-50 px-2 py-3 flex gap-5 items-center justify-between relative">
      {/* LOGO */}
      <div className="hidden md:block text-[1.5rem] font-semibold md:pl-2 lg:pl-4">
        <span className="bg-pink-500 px-[6px] text-white mr-[1px] py-[4px] rounded-md shadow-custom-logo shadow-pink-400">
          Blog
        </span>
        APP
      </div>

      {/* SEARCHBAR */}
      <form
        className="border-2 border-gray-400 p-1 bg-white rounded-md flex justify-between ml-2 md:w-[40%]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="border-none focus:outline-none md:w-[90%]"
        />
        <button className="pr-2 md:hover:text-pink-500">
          <FaSearch />
        </button>
      </form>

      {/* NAVIAGATION FOR LARGE SCREEN */}
      <div className="hidden md:flex items-center gap-4 ml-5 mr-4">
        <Link
          to={"/"}
          className={path === "/" ? "underline underline-offset-2" : ""}
        >
          <p className=" hover:text-gray-600">Home</p>
        </Link>
        <Link
          to={"/about"}
          className={path === "/about" ? "underline underline-offset-2" : ""}
        >
          <p className=" hover:text-gray-600">About</p>
        </Link>
        <Link
          to={"/projects"}
          className={path === "/projects" ? "underline underline-offset-2" : ""}
        >
          <p className=" hover:text-gray-600">Projects</p>
        </Link>
        {currentUser === null ? (
          <Link
            to={"/signin"}
            className={path === "/signin" ? "underline underline-offset-2" : ""}
          >
            <p className=" hover:text-gray-600">Signin</p>
          </Link>
        ) : (
          <Link to={"/dashboard?tab=profile"}>
            <img
              className="w-10 h-10 border-black border-2 rounded-[50%] hover:shadow-custom-logo hover:shadow-gray-400"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="DP"
            ></img>
          </Link>
        )}
      </div>

      {/* NAVIAGATION FOR SMALL SCREEN */}
      <button
        onClick={() => {
          setNavIsOpen(!navIsOpen);
        }}
        className="md:hidden mr-4 border-2 p-2 rounded-md border-gray-300"
      >
        {navIsOpen ? <FaChevronUp /> : <FaGripLines />}
      </button>

      <div
        className={`md:hidden border-2 border-black absolute z-50 top-[100%] right-0 w-[100vw] flex flex-col gap-1 bg-white py-2 ${
          navIsOpen ? "" : "hidden"
        }`}
      >
        {currentUser === null ? (
          <div
            className={
              path === "/signin"
                ? "bg-gradient-to-l from-white via-purple-200 to-white  w-full flex items-center justify-center py-1 text-lg"
                : "w-full flex items-center justify-center py-1 text-lg"
            }
          >
            <Link to={"/signin"}>SignIn</Link>
          </div>
        ) : (
          <div
            className={
              path === "/dashboard"
                ? "bg-gradient-to-l from-white via-purple-200 to-white  w-full flex items-center justify-center py-1 text-lg"
                : "w-full flex items-center justify-center py-1 text-lg"
            }
          >
            <Link to={"/dashboard?tab=profile"}>Dashboard</Link>
          </div>
        )}

        <div
          className={
            path === "/"
              ? "bg-gradient-to-l from-white via-purple-200 to-white  w-full flex items-center justify-center py-1 text-lg"
              : "w-full flex items-center justify-center py-1 text-lg"
          }
        >
          <Link to={"/"}>Home</Link>
        </div>
        <div
          className={
            path === "/about"
              ? "bg-gradient-to-l from-white via-purple-200 to-white  w-full flex items-center justify-center py-1 text-lg"
              : "w-full flex items-center justify-center py-1 text-lg"
          }
        >
          <Link to={"/about"}>About</Link>
        </div>
        <div
          className={
            path === "/projects"
              ? "bg-gradient-to-l from-white via-purple-200 to-white  w-full flex items-center justify-center py-1 text-lg"
              : "w-full flex items-center justify-center py-1 text-lg"
          }
        >
          <Link to={"/projects"}>Projects</Link>
        </div>
      </div>
    </div>
  );
}
