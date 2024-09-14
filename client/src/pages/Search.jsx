import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "all",
    limit: 1000,
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    const urlQuery = new URLSearchParams(location.search);
    urlQuery.set("searchTerm", searchData.searchTerm);
    urlQuery.set("sort", searchData.sort);
    urlQuery.set("category", searchData.category);

    navigate(`/search?${urlQuery.toString()}`);
  };

  const getPosts = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams(location.search);
    const urlSearchTerm = queryParams.get("searchTerm");
    const urlSort = queryParams.get("sort") || "desc";
    const urlCategory = queryParams.get("category") || "all";

    setSearchData({
      ...searchData,
      searchTerm: urlSearchTerm,
    });

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_APIBASEURL}/api/posts/searchPosts?searchTerm=${urlSearchTerm}&sort=${urlSort}&category=${urlCategory}&limit=${searchData.limit}`,
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
  }, [location.search]);

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
    <div className="flex flex-col my-3 overflow-x-hidden items-center">
      <form className="flex md:mt-4 flex-col md:flex-row gap-2 md:gap-6 md:items-center">
        <div>
          <label
            htmlFor="sort"
            className="mr-[59px] md:mr-3 text-xl font-semibold"
          >
            Sort:
          </label>
          <select
            name="sort"
            id="sort"
            className="p-2 border-2 border-gray-400 rounded-md bg-gray-50"
            value={searchData.sort}
            onChange={(e) =>
              setSearchData({ ...searchData, sort: e.target.value })
            }
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="mr-3 text-xl font-semibold">
            Category:
          </label>
          <select
            id="category"
            name="category"
            className="p-2 border-2 border-gray-400 rounded-md bg-gray-50"
            value={searchData.category}
            onChange={(e) =>
              setSearchData({ ...searchData, category: e.target.value })
            }
          >
            <option value="all">All</option>
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

        <button
          onClick={handleSearch}
          className="border-2 w-fit p-2 mt-2 self-center text-lg rounded-md border-purple-600 shadow-post-card shadow-purple-300 font-semibold md:hover:text-white md:hover:bg-purple-600 md:mt-0"
        >
          Apply Filters
        </button>
      </form>

      <div className="w-screen border-t-2 border-black md:border-none md:w-[650px] xl:w-[1000px] max-w-[1000px] mt-6 md:mt-10 flex flex-col mb-14 items-center">
        <h2 className="text-2xl font-semibold text-center mt-4 md:mt-0">
          Search Results for "{searchData.searchTerm === "" ? "Everything" : searchData.searchTerm}" :
        </h2>
        {loading ? (
          "Loading..."
        ) : posts && posts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 place-items-center">
            {displayPosts}
          </div>
        ) : (
          "No Posts Found."
        )}
      </div>
    </div>
  );
}
