import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvide";

const WishList = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  // Check if the user is logged in before accessing the email
  const email = user ? user.email : null;

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (email) {
      const fetchWishlist = async () => {
        try {
          const response = await axios.get(
            `https://blog-website-server-self.vercel.app/wishlist/${email}`,
            { withCredentials: true }
          );

          setWishlist(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };

      fetchWishlist();
    }
  }, [email]);

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(
        `https://blog-website-server-self.vercel.app/wishlist/${email}/${id}`
      );
      setWishlist(wishlist.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
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
  return (
    <div>
      <h2 className="text-3xl font-bold text-center m-7">My Wishlist</h2>
      <div className="flex flex-wrap gap-8 mx-[100px] my-10">
        {wishlist.map((item) => (
          <>
            <div
              key={item._id}
              class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  class="rounded-t-lg h-[400px] w-full"
                  src={item.image_url}
                  alt={item.title}
                />
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Blog Title:{item.title}
                  </h5>
                </a>{" "}
                <p className="my-3">Category : {item.category}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.short_description}
                </p>
                <div className="flex gap-3 my-3">
                  <button
                    href="#"
                    onClick={() =>
                      (window.location.href = `/blog/${item.postId}`)
                    }
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Details
                    <svg
                      class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                  <button
                    href="#"
                    onClick={() => removeFromWishlist(item._id)}
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-600 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Remove From Wishlist
                    <svg
                      class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default WishList;
