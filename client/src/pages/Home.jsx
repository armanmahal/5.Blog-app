import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/posts/searchPosts?limit=6`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const displayPosts = posts.map((post) => {
    return (
      <PostCard
        key={post._id}
        id={post._id}
        title={post.title}
        img={post.image}
        category={post.category}
      />
    );
  });

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <div className="mt-12 md:mt-24 w-[80%] md:w-full md:max-w-[1200px] md:pl-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
          Welcome To My Blog
        </h1>
        <p className="mt-3 md:text-xl">
          Here You'll find Articles about... <br /> ah well nvm, i'll anyways
          copy paste that shit.
        </p>
      </div>

      <div className="w-screen md:w-[650px] xl:w-[1000px] max-w-[1000px] mt-16 flex flex-col mb-14 items-center">
        <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 place-items-center">
          {displayPosts}
        </div>
        <Link
          to={"/search?searchTerm="}
          className="mt-6 text-pink-600 underline cursor-pointer text-lg font-medium"
        >
          ShowAll
        </Link>
      </div>
    </div>
  );
}
