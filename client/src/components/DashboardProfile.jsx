import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { signOutUser, updateUserImage } from "../redux/user/userSlice.js";
import axios from "axios";
import DeleteUserPopup from "./deleteUserPopup.jsx";
import { useNavigate } from "react-router-dom";

export default function DashboardProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [temporaryImageUrl, setTemporaryImageUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [passwordChange, setPasswordChange] = useState(false);
  const [pass, setPass] = useState("");

  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);

  const [data, setData] = useState({
    username: currentUser ? currentUser.username : "",
    email: currentUser ? currentUser.email : "",
  });

  const dispatch = useDispatch();

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
          updateUserImageDatabase(downloadUrl);
          toast("Image successfully changed");
          setImage("");
        });
      }
    );
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/user/updatePassword/${currentUser.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          password: pass,
        },
        withCredentials: true,
      });
      toast(response.data.message);
      setPass("");
      setPasswordChange(false);
    } catch (error) {
      toast("Password Update Failed");
      setPass("");
      setPasswordChange(false);
      console.log(error);
    }
  };

  // UPDATING USER IMAGE IN DATABASE
  const updateUserImageDatabase = async (imageUrl) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/user/updateImage/${currentUser.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          image: imageUrl,
        },
        withCredentials: true,
      });
      dispatch(updateUserImage(response.data.newImageUrl));
    } catch (error) {
      toast("User Update Failed");
      console.log(error);
    }
  };

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
                : currentUser
                ? currentUser.image
                : null
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
      <div className="flex flex-col items-center">
        {passwordChange && (
          <form
            className="flex flex-col items-center"
            onSubmit={handlePasswordChange}
          >
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter New Password"
              className="border-2 border-gray-500 px-2"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button className="bg-green-400 px-2 py-1 mt-2 rounded-md">
              Confirm
            </button>
            <button
              type="button"
              className="bg-red-400 px-2 py-1 mt-2 rounded-md"
              onClick={() => {
                setPasswordChange(false);
                setPass("");
              }}
            >
              Cancel
            </button>
          </form>
        )}

        {!passwordChange && (
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-md mt-2 md:hover:shadow-custom-logo md:hover:shadow-pink-300"
            onClick={() => setPasswordChange(true)}
          >
            Change Password
          </button>
        )}
      </div>

      {/* DELETE ACCOUNT POPUP */}
      <div
        className={`fixed transition-all ${
          deleteAccountPopup ? "top-[40vh]" : "top-[-150px]"
        } `}
      >
        <DeleteUserPopup cancel={() => setDeleteAccountPopup(false)} />
      </div>

      <div className="mt-1 flex flex-col gap-2 justify-center items-center">
        {/* DELETE ACCOUNT BUTTON */}
        <button
          className="border-2 border-red-400 px-2 py-[2px] rounded-md md:hover:bg-red-400 md:hover:text-white"
          onClick={() => setDeleteAccountPopup(true)}
        >
          Delete Account
        </button>
        {/* SIGNOUT BUTTON */}
        <button
          className="border-2 border-red-400 px-2 py-[2px] rounded-md md:hover:bg-red-400 md:hover:text-white"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
