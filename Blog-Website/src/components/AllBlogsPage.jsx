import React, { useState, useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvide";
import Swal from "sweetalert2";
import axios from "axios";
import { TbJewishStarFilled } from "react-icons/tb";
const AllBlogsPage = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user ? user.email : null;
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [originalBlogs, setOriginalBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://blog-website-server-self.vercel.app/posts`,
          { withCredentials: true }
        );
        setOriginalBlogs(response.data);
        setFilteredBlogs(response.data);
        // Extract categories from the fetched data and remove duplicates
        const uniqueCategories = [
          ...new Set(response.data.map((blog) => blog.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    //console.log(user);

    fetchData();
  }, []);

  const handleAddToWishlist = async (
    postId,
    userEmail,
    title,
    short_description,
    image_url,
    category
  ) => {
    try {
      if (!user) {
        // Show a toast message if the user is not logged in
        Swal.fire({
          title: "Login Required",
          text: "Please login first to add to wishlist.",
          icon: "info",
          confirmButtonText: "OK",
        });
        return;
      }
      const response = await axios.post(
        `https://blog-website-server-self.vercel.app/wishlist/add`,
        {
          postId,
          userEmail,
          title,
          short_description,
          image_url,
          category,
        }
      );

      if (
        response.status === 200 &&
        response.data.message === "Wish already exists"
      ) {
        // Show a toast message indicating that the wish already exists
        Swal.fire({
          title: "Already Added!",
          text: "This post is already in your wishlist.",
          icon: "info",
          confirmButtonText: "OK",
        });
      } else {
        // Show a success toast message
        Swal.fire({
          title: "Success!",
          text: "Post added to wishlist!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding data. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSearch = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchQuery(text);
    const newData = originalBlogs.filter((row) =>
      row.title.toLowerCase().includes(text)
    );
    setFilteredBlogs(newData);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    const newData = originalBlogs.filter((row) => row.category === category);
    setFilteredBlogs(newData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-10">All Blogs</h2>
      <div className="p-5 mx-10 ">
        <div className="p-6 flex gap-4 lg:flex-row flex-col">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
          >
            <option value="">Select Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex  gap-4 flex-wrap">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-[400px] h-[400px]"
                  src={blog.image_url}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {blog.short_description}
                </p>
                <div className=" flex justify-left gap-4">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Details
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() =>
                      handleAddToWishlist(
                        blog._id,
                        userEmail,
                        blog.title,
                        blog.short_description,
                        blog.image_url,
                        blog.category
                      )
                    }
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#55e431] rounded-lg hover:bg-[#3af20c] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add To WishList
                    <TbJewishStarFilled className="mx-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;
