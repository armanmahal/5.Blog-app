import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [data, setData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
  });

  const [image, setImage] = useState("");
  const [temporaryImageUrl, setTemporaryImageUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setTemporaryImageUrl(URL.createObjectURL(file));
    }
    console.log(image);
    console.log(temporaryImageUrl);
  };
  const cancelImageUpload = () => {
    setImage("");
    setTemporaryImageUrl("");
  };
  const handleImageUpload = async (e) => {
    e.preventDefault();
    setUploadingImage(true);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast("Image should be less than 2MB");
        setUploadingImage(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setTemporaryImageUrl(downloadUrl);
          setUploadedImageUrl(downloadUrl);
          toast("Image Successfully Uploaded");
          setImage("");
          setUploadingImage(false);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.title === "") {
      toast("Enter a Valid Title");
      return;
    }

    if (data.content === "" || data.content === "<p><br></p>") {
      toast("No Content Written");
      return;
    }

    //data to backend :
    setLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/posts/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          title: data.title,
          content: data.content,
          category: data.category,
          image: uploadedImageUrl,
        },
        withCredentials: true,
      });

      setLoading(false);
      setData({
        title: "",
        category: "uncategorized",
        content: "",
      });
      setImage("");
      setUploadedImageUrl("");
      setTemporaryImageUrl("");
      toast(response.data.message);

      // redirecting after 500ms:
      setTimeout(() => {
        navigate(`/post/${response.data.post._id}`);
      }, 500);
    } catch (error) {
      toast(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-[50vh] flex flex-col items-center pt-3">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Create Post</h1>
      <form
        className="flex flex-col gap-4 mt-5 w-[90%] md:w-[700px]"
        onSubmit={handleSubmit}
      >
        {/* TITLE */}
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="p-2 border-2 border-gray-400 rounded-md bg-gray-50"
        />

        {/* CATEGORY */}
        <div className="flex flex-col">
          <label htmlFor="category" className=" ml-1 text-gray-500">
            Select a Category:
          </label>
          <select
            id="category"
            name="category"
            className="p-2 border-2 border-gray-400 rounded-md bg-gray-50"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="uncategorized">Uncategorized</option>
            <option value="personal">Personal Blogs</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="technology">Technology</option>
            <option value="business">Business & Finance</option>
            <option value="food-drink">Food & Drink</option>
            <option value="travel">Travel</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="health-fitness">Health & Fitness</option>
            <option value="parenting">Parenting</option>
            <option value="politics">Politics</option>
            <option value="science">Science</option>
            <option value="career">Career</option>
            <option value="reviews">Reviews</option>
          </select>
        </div>

        {/* IMAGE */}
        <div className="flex flex-col border-2 border-pink-600 border-dotted p-4 items-center">
          {temporaryImageUrl === "" ? (
            <>
              <div className="flex">
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-purple-500 text-white w-fit py-2 px-3 rounded-l-md"
                >
                  Upload Image
                </label>
                <div className="border-2 border-gray-300 border-l-0 w-fit py-2 px-3 rounded-r-md">
                  No File Chosen
                </div>
              </div>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </>
          ) : (
            <>
              <div className="border-4 border-black shadow-sm shadow-black">
                <img src={temporaryImageUrl} alt="Error" />
              </div>

              {uploadedImageUrl === "" && !uploadingImage && (
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={handleImageUpload}
                    type="button"
                    className="border-2 border-purple-500 w-[100px] rounded-sm px-2 py-1 cursor-pointer md:hover:text-white md:hover:bg-purple-500"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={cancelImageUpload}
                    className="border-2 border-red-500 w-[100px] rounded-sm px-2 py-1 cursor-pointer md:hover:text-white md:hover:bg-red-500"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {uploadingImage && (
                <div className="border-2 border-purple-500 w-[100px] rounded-sm mt-4 px-2 py-1  text-white bg-purple-500">
                  Uploading...
                </div>
              )}
            </>
          )}
        </div>

        {/* POST TEXT AREA */}
        <ReactQuill
          theme="snow"
          placeholder="Start Writing..."
          className="mt-4 h-80"
          onChange={(value) => setData({ ...data, content: value })}
          required
        />

        {/* SUBMIT BUTTON */}
        <center>
          <button
            type="submit"
            className={`mt-16 mb-16 border-2  w-[200px] rounded-md px-2 py-2    font-medium text-xl shadow-md shadow-pink-300 ${
              loading
                ? "cursor-not-allowed border-pink-300"
                : "cursor-pointer md:hover:bg-pink-500 md:hover:text-white border-pink-500"
            }`}
          >
            {loading ? "Uploading..." : "Create Post"}
          </button>
        </center>
      </form>
    </div>
  );
}
