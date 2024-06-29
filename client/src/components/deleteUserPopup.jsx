import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";

export default function DeleteUserPopup(props) {
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/user/deleteUser/${currentUser.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast(response.data.message);
        setLoading(false);
        navigate("/signin");
        dispatch(deleteUser());
      }
    } catch (error) {
      toast("Delete User Failed");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="border-[1px] border-black bg-gray-200 p-4 flex flex-col rounded-lg items-center gap-4 h-32 justify-center">
      <ToastContainer />
      <h1>Are you sure want to delete account?</h1>
      {loading ? (
        <p>Processing...</p>
      ) : (
        <div className="flex gap-7">
          <button
            className="bg-red-500 text-white px-2 rounded-md w-20"
            onClick={handleDeleteAccount}
          >
            Yes
          </button>
          <button
            className="bg-green-500 text-white px-2 rounded-md w-20 "
            onClick={props.cancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
