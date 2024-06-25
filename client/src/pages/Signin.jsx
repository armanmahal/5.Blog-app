import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState({ state: false, message: "" });

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

    try {
      
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/auth/signin`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: formData.email,
          password: formData.password,
        },
        withCredentials: true,
      })

      navigate('/');

      setFormData({
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
      <h1 className="text-3xl font-semibold mb-4">SignIn Yourself</h1>

      <form
        className="flex flex-col items-center gap-2 w-[21rem]"
        onSubmit={handleSubmit}
      >

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
            Enter Password
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


        <button
          className={`bg-gradient-to-r  w-full mt-4 py-2 px-3 rounded-md font-medium text-lg text-white ${
            loading
              ? "from-purple-400 to-pink-400 cursor-not-allowed"
              : "from-purple-500 to-pink-500"
          }`}
        >
          {loading ? <>Loading...</> : <>Sign In</>}
        </button>

        <div className="flex gap-1 w-full pl-[1px] ">
          <p className="text-sm text-gray-900">Don't have an account?</p>
          <Link to={"/signup"} className="text-sm text-blue-500">
            SignUp Now.
          </Link>
        </div>
      </form>
    </div>
  );
}
