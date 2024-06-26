import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LuRefreshCcw } from "react-icons/lu";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [image, setImage] = useState("");
  const [temporaryImageUrl, setTemporaryImageUrl] = useState("");

  const [data, setData] = useState({
    username: currentUser.username,
    email: currentUser.email,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setTemporaryImageUrl(URL.createObjectURL(file));
    }
  };
  const cancelImageUpload = () => {
    setImage("");
    setTemporaryImageUrl("");
  };
  const handleImageUpload = async (e) => {
    e.preventDefault();

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast("Image should be less than 2MB");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setTemporaryImageUrl(downloadUrl);
          toast("Image successfully changed");
          setImage("");
        });
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            className="w-[90px] h-[90px] border-black border-2 rounded-[50%]"
            src={
              temporaryImageUrl !== ""
                ? temporaryImageUrl
                : currentUser.image
            }
            alt="DP"
          ></img>
          {/* CHANGE PROFILE PHOTO */}
          <form onSubmit={handleImageUpload}>
            <label
              htmlFor="image"
              className="border-[1px] border-black absolute top-0 left-1 rounded-full bg-white p-1 md:hover:bg-gray-300"
            >
              <LuRefreshCcw />
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleImageChange}
              hidden
            />
            {image !== "" && (
              <center>
                <button className="text-sm text-white bg-blue-500 px-1 mb-2 rounded-sm">
                  Change
                </button>
              </center>
            )}
          </form>
          {image !== "" && (
            <center>
              <button
                className="text-sm text-white bg-red-500 px-1 mb-2 rounded-sm"
                onClick={cancelImageUpload}
              >
                Cancel
              </button>
            </center>
          )}
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
