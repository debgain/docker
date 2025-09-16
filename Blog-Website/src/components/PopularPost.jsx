import React from 'react'
import { ImStopwatch } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import { motion } from "framer-motion";
const PopularPost = () => {

  const popularPosts = [
    {
      id: 1,
      title: 'Helpful Tips For Working from Home as a Freelancer',
      image: 'https://i.ibb.co/W6gPdxR/brooke-cagle-WHWYBmtn3-0-unsplash-500x350.jpg',
      timeRead: '5 mins read',
      date: '25 April 2023'
    },
    ,
  {
    id: 2,
    title: 'Best place to visit in bangladesh',
    image: 'https://i.ibb.co/zJf5vPk/chelsea-gates-c-Ej-1sfw3h-A-unsplash-500x350.jpg',
    timeRead: '10 mins read',
    date: '10 May 2023'
  },
  {
    id: 4,
    title: 'How to Start a Successful Blog: A Step-by-Step Guide',
    image: 'https://i.ibb.co/djWYxQJ/blogging-guide-updated-featured-image-Jan-2020.jpg',
    timeRead: '8 mins read',
    date: '20 July 2023'
  },
  {
    id: 5,
    title: 'The Importance of Goal Setting and How to Do It Effectively',
    image: 'https://i.ibb.co/ykJcdMP/images.png',
    timeRead: '10 mins read',
    date: '5 August 2023'
  },
  {
    id: 6,
    title: 'Top 5 Books to Read for Personal Development',
    image: 'https://i.ibb.co/KGYRpcB/71vtja-M7-DYL-AC-UF1000-1000-QL80.jpg',
    timeRead: '4 mins read',
    date: '12 September 2023'
  },
  {
    id: 7,
    title: 'Simple and Delicious Recipes for a Quick Weeknight Dinner',
    image: 'https://i.ibb.co/Tr3KKkN/andrea-davis-2p-Joy-APvetk-unsplash-1000x650.jpg',
    timeRead: '6 mins read',
    date: '18 October 2023'
  },
  {
    id: 8,
    title: 'Tips for Maintaining a Healthy Work-Life Balance',
    image: 'https://i.ibb.co/YbFMpN7/worklife-balance.jpg',
    timeRead: '7 mins read',
    date: '25 November 2023'
  },
  {
    id: 9,
    title: 'Effective Time Management Techniques for Busy Professionals',
    image: 'https://i.ibb.co/QH4L9NX/daniel-korpai-L8y01m-Tu-DZg-unsplash-scaled-500x350.jpg',
    timeRead: '8 mins read',
    date: '3 December 2023'
  },
  {
    id: 10,
    title: 'The Impact of Social Media on Mental Health',
    image: 'https://i.ibb.co/b5Cp357/daniel-korpai-RYb-P9-O-v-TU-unsplash-500x350.jpg',
    timeRead: '5 mins read',
    date: '10 January 2024'
  },
  {
    id: 11,
    title: 'Budget-Friendly Travel Destinations for Your Next Vacation',
    image: 'https://i.ibb.co/svWDJXf/dan-smedley-TBNz-Dil-Pfzo-unsplash-120x120.jpg',
    timeRead: '9 mins read',
    date: '18 February 2024'
  },
  {
    id: 12,
    title: '10 Tips for Better Sleep and Improved Sleep Quality',
    image: 'https://i.ibb.co/b1gkxCk/daniel-korpai-Y3-LGWCsrgmg-unsplash-120x120.jpg',
    timeRead: '7 mins read',
    date: '25 March 2024'
  },
  {
    id: 13,
    title: 'How to Build Strong and Healthy Relationships',
    image: 'https://i.ibb.co/R24Yzr3/pexels-asya-cusima-3097297-1920x0.jpg',
    timeRead: '6 mins read',
    date: '5 April 2024'
  },
  {
    id: 14,
    title: 'Creative Home Office Ideas for Increased Productivity',
    image: 'https://i.ibb.co/Jp7GVYn/tianyi-ma-Wi-ONHd-z-YI4-unsplash-120x120.jpg',
    timeRead: '8 mins read',
    date: '12 May 2024'
  },
  {
    id: 15,
    title: 'The Benefits of Meditation and Mindfulness Practices',
    image: 'https://i.ibb.co/b1gkxCk/daniel-korpai-Y3-LGWCsrgmg-unsplash-120x120.jpg',
    timeRead: '10 mins read',
    date: '20 June 2024'
  },
  {
    id: 16,
    title: '10 Ways to Improve Your Productivity While Working Remotely',
    image: 'https://i.ibb.co/QH4L9NX/daniel-korpai-L8y01m-Tu-DZg-unsplash-scaled-500x350.jpg',
    timeRead: '7 mins read',
    date: '25 April 2023'
  },
  {
    id: 17,
    title: 'The Benefits of Regular Exercise for Mental Health',
    image: 'https://i.ibb.co/tDrpdtC/pexels-yankrukov-7155525.jpg',
    timeRead: '5 mins read',
    date: '10 May 2023'
  },
  {
    id: 18,
    title: 'Healthy Breakfast Ideas to Kickstart Your Day',
    image: 'https://i.ibb.co/Tr3KKkN/andrea-davis-2p-Joy-APvetk-unsplash-1000x650.jpg',
    timeRead: '6 mins read',
    date: '15 June 2023'
  },
  {
    id: 19,
    title: 'Pellentesque euismod lacus neque',
    image: 'https://i.ibb.co/YW087L4/herdian-indraputra-6k-NVJ1fr3-Ug-unsplash-380x380.jpg',
    timeRead: '6 mins read',
    date: '30 September 2023'
  }
    // Add more dummy data here...
  ];
  return (
  <div className='lg:col-span-1 col-span-2 w-full'>
      <div className="bg-slate-100 mt-6 p-5 rounded-xl border border-slate-300 border-solid shadow-2xl">
    <motion.h3
      className="text-left my-6 text-4xl font-bold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Popular Posts
      <hr className='mt-3 w-[200px] h-1 bg-black' />
    </motion.h3>
    <motion.div
      className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {popularPosts.map(post => (
        <>
        <motion.div
          key={post.id}
          className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
           <motion.img
              src={post.image}
              alt={post.title}
              className="relative inline-block h-[78px] w-[78px] !rounded-full object-cover object-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.50 }}
            />
          <div className="flex w-full flex-col gap-0.5 text-left">
            <div className="flex items-center justify-between">
              <motion.h5
                className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
                whileHover={{ scale: 1.05 }}
              >
                {post.title}
              </motion.h5>
            </div>
            <div className="flex justify-between mt-1">
              <div className="flex gap-2">
                <ImStopwatch className="mt-[5px]" />
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                  {post.timeRead}
                </p>
              </div>
              <div className="flex gap-2">
                <IoBookSharp className="mt-[6px]" />
                <p className="font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                  {post.date}
                </p>
              </div>
            </div>
          </div>
        
        </motion.div>
        <hr className=' h-[1px] bg-gray-500' /></>
      ))}
    </motion.div>
  </div>
  </div>
  )
}

export default PopularPost