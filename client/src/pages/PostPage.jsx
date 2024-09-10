import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function PostPage() {
  const { id } = useParams();

  const currentUser = useSelector((state) => state.user.currentUser);

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

  const [userComment, setUserComment] = useState({ content: "", length: 0 });

  const handleCommentChange = (e) => {
    const length = e.target.value.length;

    if (length > 400) {
      return;
    }

    setUserComment({
      content: e.target.value,
      length,
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (userComment.length <= 0) {
      return;
    }

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/comments/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          content: userComment.content,
          userId: currentUser.id,
          postId: id,
        },
        withCredentials: true,
      });
      setUserComment({ content: "", length: 0 });
      toast("Comment Added");
    } catch (error) {
      toast("error occured");
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col items-center mt-4 px-2">
      <ToastContainer />
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

      {/* COMMENT SECTION */}
      <h1 className="text-xl font-semibold">Comments</h1>
      {currentUser && currentUser !== null ? (
        <div className="w-[94%] max-w-[800px]">
          <div className="flex items-center gap-1">
            <p className="mr-2">Signed In as : </p>
            <img
              src={currentUser.image}
              alt="Img"
              className="w-7 h-7 object-cover rounded-full"
            />
            <p>{currentUser.username}</p>
          </div>
          <div className="w-full border-2 border-purple-500 rounded-lg mt-3 p-3">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                name="comment"
                id="comment"
                className="border-2 border-pink-200 w-full min-h-32 px-1 focus:outline-pink-600"
                onChange={handleCommentChange}
                value={userComment.content}
              ></textarea>
              <div className="flex items-center justify-between px-4">
                <p className="text-md text-gray-500">
                  {400 - userComment.length} chars remaining
                </p>
                <button className="border-2 border-purple-500 px-2 py-1 rounded-md font-semibold">
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="border-2 border-purple-500 rounded-lg mt-3 p-3">
          Not Signed In! Sign in to Comment.
        </div>
      )}
    </div>
  );
}
