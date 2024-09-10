import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/posts/getPost`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id,
        },
        withCredentials: true,
      });

      setPost(response.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col items-center mt-4 px-2">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-gray-600 border-[2px] border-gray-500 rounded-md px-2 my-2">
        {post.category}
      </div>
      <img
        src={post.image}
        alt="Image"
        className="w-[94%] max-w-[728px] rounded-lg my-3"
      />

      <div
        className="w-[94%] max-w-[800px] border-2 border-gray-300 rounded-lg p-2 mt-2 mb-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
