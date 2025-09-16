import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaPenFancy } from "react-icons/fa6";
import { GiWatch } from "react-icons/gi";
import { ImStopwatch } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const LifeStyleNews = () => {
  return (
    <motion.div
      className="bg-red-100 mt-10 shadow-2xl px-5 pt-5 pb-10 rounded-xl"
      initial={{ opacity: 0, y: -50 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
      transition={{ duration: 0.5 }} // Animation duration
    >
      <motion.div
        className="text-left pl-4"
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
        transition={{ duration: 0.5 }} // Animation duration
      >
        <h1 className="font-bold text-3xl pt-4 mb-2">LifeStyle News</h1>
        <p className="mb-10 font-semibold">
          This is an optional subtitle for post section
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-4 grid-cols-2">
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0, y: -50 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
          transition={{ duration: 0.5 }} // Animation duration
        >
          <div className="w-full bg-base-100 shadow-xl h-full rounded-xl">
            <figure className="relative rounded-xl">
              <img
                src="https://i.ibb.co/jwVgWhD/meditation.jpg"
                className="rounded-xl"
                alt="Shoes"
              />
              <button className="text-white absolute top-2 left-2 text-black flex mb-2 bg-[#83b4c5] shadow-2xl px-2 pb-2 pt-1 rounded-lg">
                Serenity Seeker
              </button>
            </figure>
            <div className="card-body">
              <p className="font-bold lg:text-4xl text-black lg:w-[600px] w-[310px] text-left mb-5">
                Finding Inner Peace Through Mindfulness, Meditation, and
                Tranquil Living Inspiration.
              </p>
              <div className="flex gap-6">
                <div className="flex gap-2">
                  <IoPersonOutline className="mt-1" />
                  <p>Spraya</p>
                </div>
                <div className="flex gap-2">
                  <FaPenFancy className="mt-1" />
                  <p>July 24, 2019</p>
                </div>
                <div className="flex gap-2">
                  <GiWatch className="mt-1" />
                  <p>2 Mins read</p>
                </div>
              </div>
              <p className="text-left mt-4">
                Dive into the world of mindfulness, meditation, and minimalist
                living with our expert tips on how to create a serene and
                balanced lifestyle amidst the chaos of modern life. From
                decluttering your space to nourishing your soul, find your inner
                peace here
              </p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-1 col-span-2">
        <motion.div
    className="flex flex-col gap-4"
    initial={{ opacity: 0, y: -50 }} // Initial animation state
    animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
    transition={{ duration: 0.5 }} // Animation duration
  >
            <div className="lg:w-[255px] w-full bg-white shadow-xl rounded-xl">
              <figure className="relative rounded-xl">
                <img
                  src="https://i.ibb.co/mSWtt1k/Jeanne-Gang-architect-Studio-Gang.webp"
                  className="rounded-xl"
                  alt="Shoes"
                />
                <button className=" absolute top-2 left-2 text-white flex px-1 py-[2px] mb-2 bg-[#125b73]  shadow-2xl rounded-md text-sm">
                  Inspiration
                </button>
              </figure>
              <div className="card-body">
                <p className="font-bold text-lg text-black  text-left mb-2 ">
                  Society's Reflection: Insightful Narratives on Community
                  Dynamics, Challenges, and Transformations.
                </p>
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <IoPersonOutline className="mt-1 text-sm" />
                    <p className="text-sm">Spraya</p>
                  </div>
                  <div className="flex gap-1">
                    <FaPenFancy className="mt-1 text-sm" />
                    <p className="text-sm">July 24, 2019</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[255px] w-full bg-white shadow-xl rounded-xl">
              <figure className="relative z-1 rounded-xl">
                <img
                  src="https://i.ibb.co/89kGp7x/pexels-helena-lopes-693268-500x350.jpg"
                  className="rounded-xl"
                  alt="Shoes"
                />
                <button className=" absolute top-2 left-2 text-white flex px-1 py-[2px] mb-2 bg-[#e23591]  shadow-2xl rounded-md text-sm">
                  Fit & Fabulous
                </button>
              </figure>
              <div className="card-body">
                <p className="font-bold text-lg text-black  text-left mb-2 ">
                  Transforming Lives with Fitness, Nutrition, and Self-Care
                  Strategies for Busy Individuals.
                </p>
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <IoPersonOutline className="mt-1 text-sm" />
                    <p className="text-sm">Spraya</p>
                  </div>
                  <div className="flex gap-1">
                    <FaPenFancy className="mt-1 text-sm" />
                    <p className="text-sm">July 24, 2019</p>
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
        </div>
        <div className="lg:col-span-1 col-span-2">
        <motion.div
    className="flex flex-col gap-4"
    initial={{ opacity: 0, y: -50 }} // Initial animation state
    animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
    transition={{ duration: 0.5 }} // Animation duration
  >
            <div className="lg:w-[255px] w-full bg-white shadow-xl rounded-xl">
              <figure className="relative z-1 rounded-xl">
                <img
                  src="https://i.ibb.co/P5QPqwJ/images-5.jpg"
                  className="rounded-xl w-full"
                  alt="Shoes"
                />
                <button className=" absolute top-2 left-2 text-white flex px-1 py-[2px] mb-2 bg-[#e1631f]  shadow-2xl rounded-md text-sm">
                  Chic & Trendy
                </button>
              </figure>
              <div className="card-body">
                <p className="font-bold text-lg text-black  text-left mb-2 ">
                  Unveiling the Latest in Fashion, Beauty, and Home Décor Trends
                  for Stylish Living.
                </p>
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <IoPersonOutline className="mt-1 text-sm" />
                    <p className="text-sm">Spraya</p>
                  </div>
                  <div className="flex gap-1">
                    <FaPenFancy className="mt-1 text-sm" />
                    <p className="text-sm">July 24, 2019</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[255px] w-full bg-white shadow-xl rounded-xl">
              <figure className="relative z-1 rounded-xl">
                <img
                  src="https://i.ibb.co/JsvLVhr/andre-ouellet-l-GUJOz-DBTJk-unsplash-1000x650.jpg"
                  className="rounded-xl"
                  alt="Shoes"
                />
                <button className=" absolute top-2 left-2 text-white flex px-1 py-[2px] mb-2 bg-[#c0eb7b] shadow-2xl rounded-md text-sm">
                  Wanderlust Diaries
                </button>
              </figure>
              <div className="card-body">
                <p className="font-bold text-lg text-black  text-left mb-2 ">
                  Exploring the Globe One Adventure at a Time with Travel Tips
                  and Inspiration.
                </p>
                <div className="flex gap-4">
                  <div className="flex gap-1">
                    <IoPersonOutline className="mt-1 text-sm" />
                    <p className="text-sm">Spraya</p>
                  </div>
                  <div className="flex gap-1">
                    <FaPenFancy className="mt-1 text-sm" />
                    <p className="text-sm">July 24, 2019</p>
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LifeStyleNews;
