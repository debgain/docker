import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
const BlogCard = ({ blog, user }) => {
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

      // Add the blog to the user's wishlist if the user is logged in
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
      //console.log(response);
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
      // Show an error toast message if there's an error
      console.error("Error adding to wishlist:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding data. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <motion.div
      className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] lg:flex-row  flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative lg:w-2/5 w-full m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
        <motion.img
          src={blog.image_url}
          alt="card-image"
          className="object-cover lg:w-[300px] lg:h-[400px]  "
          whileHover={{ scale: 1.15 }}
        />
      </div>
      <div className="px-6 text-left">
        <motion.button
          className="m-4 font-sans text-base bg-neutral text-white px-4 pb-[2px] rounded-full shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          {blog.category}
        </motion.button>
        <motion.h4
          className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
          whileHover={{ scale: 1.05 }}
        >
          {blog.title}
        </motion.h4>
        <motion.p
          className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700"
          whileHover={{ scale: 1.05 }}
        >
          {blog.short_description}
        </motion.p>
        <motion.p
          className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700"
          whileHover={{ scale: 1.05 }}
        >
          {blog.long_description}
        </motion.p>
        <motion.div
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 "
          whileHover={{ scale: 1.05 }}
        >
          <Link to={`/blogs/${blog._id}`}>
            <motion.button
              className="btn btn-success rounded-3xl"
              type="button"
              whileHover={{ scale: 1.05 }}
            >
              Details
            </motion.button>
          </Link>
          <motion.button
            className="btn btn-accent rounded-3xl"
            onClick={() =>
              handleAddToWishlist(
                blog._id,
                user?.email,
                blog.title,
                blog.short_description,
                blog.image_url,
                blog.category
              )
            }
            whileHover={{ scale: 1.05 }}
          >
            Add to WishList
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
