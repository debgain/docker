import "./App.css";
import React, { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaPenFancy } from "react-icons/fa6";
import { GiWatch } from "react-icons/gi";
import { motion } from "framer-motion";
import Newsletter from "./components/Newsletter/Newsletter";
import LifeStyleNews from "./components/LifeStyleNews/LifeStyleNews";
import { AiOutlinePicture } from "react-icons/ai";
import BlogCard from "./components/BlogCard";
import { useContext } from "react";
import { AuthContext } from "./Provider/AuthProvide";
import PopularPost from "./components/PopularPost";
import Auther from "./Auther/Auther";
function App() {
  const { user, loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("https://blog-website-server-self.vercel.app/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBlogs(data.slice(0, 6)); // Set the latest 6 blog posts to state
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Optionally, handle the error (e.g., display an error message to the user)
      }
    };
  
    fetchData();
  
    // Optional cleanup function

  }, []);
  
console.log(blogs);
  const backgroundStyle = {
    backgroundImage:
      "url('https://i.ibb.co/yY9qP3P/pexels-daria-shevtsova-1071162-scaled-1000x0.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%", // Adjust height as needed
    borderRadius: "10px",
  };
  if (loading) {
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
    <main id="main">
      <div className="container mx-auto ">
        <div className="grid  lg:grid-cols-3 grid-cols-2 gap-6">
          <div className="col-span-2 relative">
            <motion.div
              className="hero min-h-[500px] relative"
              style={backgroundStyle}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <button className=" text-white flex p-3 mb-2 bg-[#15151580] shadow-2xl rounded-sm text-xl absolute top-4 right-4">
                <AiOutlinePicture />
              </button>
              <div className="absolute left-4 bottom-10">
                <div className="max-w-md">
                  <button className="text-white flex mb-2 bg-[#52ece7] shadow-2xl px-2 pb-2 pt-1 rounded-lg">
                    Life Style
                  </button>
                  <p className="font-bold lg:text-4xl text-xl text-white lg:w-[600px] text-left mb-5">
                    Have a Lovely Weekend.
                  </p>
                  <div className="flex lg:gap-6 gap-4">
                    <div className="flex gap-2">
                      <IoPersonOutline className="mt-1" />
                      <p>Spraya</p>
                    </div>
                    <div className="flex gap-2">
                      <FaPenFancy className="mt-1" />
                      <p>July 24, 2024</p>
                    </div>
                    <div className="flex gap-2">
                      <GiWatch className="mt-1" />
                      <p>2 Mins read</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1 col-span-2">
            <motion.div className="flex flex-col gap-2">
              <motion.div
                className="flex shadow-xl gap-4 rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <figure>
                  <motion.img
                    src="https://i.ibb.co/Dksdmdc/have-fun-do-good-Myhb-Xgx2-DTk-unsplash-500x350.jpg"
                    alt="Movie"
                    className="rounded-xl mt-2 h-[120px] w-[200px]"
                    whileHover={{ scale: 1.05 }}
                  />
                </figure>
                <div className="my-4">
                  <button className=" text-white flex px-1 py-[2px] mb-2 bg-amber-500 shadow-2xl rounded-md text-sm">
                    Inspiration
                  </button>
                  <p className="font-bold lg:text-lg text-black  text-left mb-2 ">
                    It’s Time To Look At The Best Of Our Society
                  </p>
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <IoPersonOutline className="mt-1 text-sm" />
                      <p className="text-sm">Spraya</p>
                    </div>
                    <div className="flex gap-1">
                      <FaPenFancy className="mt-1 text-sm" />
                      <p className="text-sm">July 24, 2024</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex shadow-xl gap-4 rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <figure>
                  <motion.img
                    src="https://i.ibb.co/89kGp7x/pexels-helena-lopes-693268-500x350.jpg"
                    alt="Movie"
                    className="rounded-xl mt-2 h-[120px] w-[200px]"
                    whileHover={{ scale: 1.05 }}
                  />
                </figure>
                <div className="my-4">
                  <button className=" text-white flex  px-1 py-[2px]  mb-2 bg-[#265361] shadow-2xl rounded-md text-sm">
                    Life Style
                  </button>
                  <p className="font-bold lg:text-lg text-black  text-left mb-2 ">
                    Culinary Adventures and Gastronomic Escapades
                  </p>
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <IoPersonOutline className="mt-1 text-sm" />
                      <p className="text-sm">Spraya</p>
                    </div>
                    <div className="flex gap-1">
                      <FaPenFancy className="mt-1 text-sm" />
                      <p className="text-sm">July 24, 2024</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex shadow-xl gap-4 rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <figure>
                  <motion.img
                    src="https://i.ibb.co/YRtHw4k/bradley-dunn-9-SGGun3i-Iig-unsplash-500x350.jpg"
                    alt="Movie"
                    className="rounded-xl mt-2 h-[120px] w-[200px]"
                    whileHover={{ scale: 1.05 }}
                  />
                </figure>
                <div className="my-4">
                  <button className=" text-white flex  px-1 py-[2px]  mb-2 bg-[#431672] shadow-2xl rounded-md text-sm">
                    Unveiling Treasures
                  </button>
                  <p className="font-bold lg:text-lg text-black  text-left mb-2 ">
                    Journeys Through Enchanting Cultural
                  </p>
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <IoPersonOutline className="mt-1 text-sm" />
                      <p className="text-sm">Spraya</p>
                    </div>
                    <div className="flex gap-1">
                      <FaPenFancy className="mt-1 text-sm" />
                      <p className="text-sm">July 24, 2024</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex shadow-xl gap-4 rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <figure>
                  <motion.img
                    src="https://i.ibb.co/JsvLVhr/andre-ouellet-l-GUJOz-DBTJk-unsplash-1000x650.jpg"
                    alt="Movie"
                    className="rounded-xl mt-2 h-[120px] w-[200px]"
                    whileHover={{ scale: 1.05 }}
                  />
                </figure>
                <div className="my-4">
                  <button className=" text-white flex  px-1 py-[2px]  mb-2 bg-[#df7274] shadow-2xl rounded-md text-sm">
                    Inspiration
                  </button>
                  <p className="font-bold lg:text-lg text-black  text-left mb-2 ">
                    It’s Time To Look At The Best Of Our Society
                  </p>
                  <div className="flex gap-4">
                    <div className="flex gap-1">
                      <IoPersonOutline className="mt-1 text-sm" />
                      <p className="text-sm">Spraya</p>
                    </div>
                    <div className="flex gap-1">
                      <FaPenFancy className="mt-1 text-sm" />
                      <p className="text-sm">July 24, 2024</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Recent POST */}
        <div className="grid  lg:grid-cols-3 grid-cols-2 gap-6">
          <div className="col-span-2">
            <motion.div
              className="text-left my-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-bold text-5xl">Recent posts</h1>
              <p className="text-lg my-3">Don't miss the latest trends</p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} user={user ? user : ""} />
              ))}
            </motion.div>
          </div>
          {/* Popular Posts */}
          <motion.div
            className="lg:block hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PopularPost></PopularPost>
          </motion.div>
        </div>
        <LifeStyleNews></LifeStyleNews>
        <Auther></Auther>
        <Newsletter></Newsletter>
      </div>
    </main>
  );
}

export default App;
