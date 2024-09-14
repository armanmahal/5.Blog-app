import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import axios from "axios";

export default function PostComment(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/user/getUser/${props.userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setUser(response.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 my-2 rounded-md p-2 py-3">
      <p>{props.content}</p>

      <div className="text-gray-700">~ {user}</div>

      <div className="flex gap-2 mt-2">
        <button onClick={()=>props.handleLike(props.id)}>
          {props.likedByYou ? <AiFillLike /> : <AiOutlineLike />}
        </button>
        <p>{props.likes}</p>
      </div>
    </div>
  );
}
