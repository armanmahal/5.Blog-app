import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState({state: false, message: ""})

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError({state: false, message: "" });
    setSuccess({state: false, message: ""});

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/auth/signup`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });

      setSuccess({state: response.data.success , message : response.data.message});

      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setLoading(false);
    } 
    catch (error) {
      setError({state: true, message: error.response.data.message});
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-[20vh]">
      <h1 className="text-3xl font-semibold mb-4">SignUp Yourself</h1>

      <form
        className="flex flex-col items-center gap-2 w-[21rem]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <label htmlFor="username" className="ml-1 text-[15px]">
            Create Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleFormData}
            className="border-2 border-gray-400 rounded-md text-xl p-1 focus:outline-pink-500"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="email" className="ml-1 text-[15px]">
            Enter Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormData}
            className="border-2 border-gray-400 rounded-md text-xl p-1 focus:outline-pink-500"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="password" className="ml-1 text-[15px]">
            Create Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
            className="border-2 border-gray-400 rounded-md text-xl p-1 focus:outline-pink-500"
            required
          />
        </div>

        {error.state && (
          <div>
            <p className="w-full text-sm text-red-500 relative top-2 px-1 ">{error.message} !</p>
          </div>
        )}

        {success.state && (
          <div>
            <p className="w-full text-sm text-green-500 relative top-2 px-1">{success.message} !</p>
          </div>
        )}

        <button
          className={`bg-gradient-to-r  w-full mt-4 py-2 px-3 rounded-md font-medium text-lg text-white ${
            loading
              ? "from-purple-400 to-pink-400 cursor-not-allowed"
              : "from-purple-500 to-pink-500"
          }`}
        >
          {loading ? <>Loading...</> : <>Sign Up</>}
        </button>

        <div className="flex gap-1 w-full pl-[1px] ">
          <p className="text-sm text-gray-900">Have an account?</p>
          <Link to={"/signin"} className="text-sm text-blue-500">
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  );
}
