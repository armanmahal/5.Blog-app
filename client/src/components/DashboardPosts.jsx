import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardPostCard from "./DashboardPostCard";
import { ToastContainer, toast } from "react-toastify";

export default function DashboardPosts() {
  const [startIndex, setStartIndex] = useState(0);
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);

  const [moreButton, setMoreButton] = useState(true);

  useEffect(() => {
    getPosts();
  }, [startIndex]);

  const showMore = () => {
    setStartIndex(startIndex + 1);
  };

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/posts/getPosts`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          limit,
          startIndex,
        },
        withCredentials: true,
      });

      setPosts([...posts, ...response.data.posts]);

      if ((startIndex + 1) * limit >= response.data.total) {
        setMoreButton(false);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

   const handleDelete = async (id) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/posts/deletePost`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id
        },
        withCredentials: true,
      });

      setPosts((prevPosts)=>{
        return(
          prevPosts.filter((post) => post._id !== id)
        )
      })

      toast("Post Deleted!");

    } catch (error) {
      toast("Error Occured While Deleting.")
      console.log(error);
    }
  }

  const postcards = posts.map((post) => {
    return (
      <DashboardPostCard
        key={post._id}
        id={post._id}
        image={post.image}
        title={post.title}
        category = {post.category}
        delete = {handleDelete}
      />
    );
  });

 

  return (
    <div className="mb-20">
      <ToastContainer/>
      <div className="min-[50%] m-1 flex-col mt-4 ml-10 ">
        <center><h1 className="mb-2 text-2xl font-bold">All Posts</h1></center>
        {postcards}
      </div>

      {moreButton && (
        <>
         <center>
            <button
          className="text-pink-500 text-lg cursor-pointer underline"
          onClick={showMore}
        >
            {/* More */}
            {loading ? <>Loading...</> : <>More</>}
        </button>
         </center>
        </>
        
      )}
    </div>
  );
}
