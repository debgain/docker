import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the email
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Show a success toast message
    toast.success('Thank you for subscribing to our newsletter!');
    // Clear the email and error state after successful submission
    setEmail('');
    setError('');
  };

  const isValidEmail = (email) => {
    // Simple email validation, you can replace it with your own validation logic
    return /\S+@\S+\.\S+/.test(email);
  };

  return (

      <motion.div className="bg-[#2e2eebe6] relative h-[340px] flex lg:flex-row flex-col justify-between rounded-md my-10"
      whileHover={{ scale: 1.05 }}>
      {/* Newsletter content */}
      <motion.div
        className="absolute lg:top-[40%] lg:left-[5%] top-[20%] left-3 text-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="lg:text-4xl text-xl font-bold text-white lg:block ">
          Want product news and updates?
          <br />
          Sign up for our newsletter.
        </h2>
      </motion.div>
      <motion.div
        className="absolute lg:top-[40%] lg:left-[60%] top-[45%] left-[1%]   text-white text-left"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-white flex gap-2 lg:flex-row flex-col">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[40px] lg:w-[325px]  bg-[#FFFFFF1A] rounded-xl pl-2 border-2"
            />
            <button type="submit" className="bg-white text-[#2e2eebe6] rounded-xl px-2 font-bold py-2">Subscribe</button>
          </div>
          {/* Error message for email validation */}
          {error && <p className="text-red-500">{error}</p>}
        </motion.form>
        <motion.p
          className="mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We care about your data. Read our <span className="font-bold">Privacy policy.</span>
        </motion.p>
      </motion.div>
  
      <ToastContainer />
    </motion.div>
   
  );
};

export default Newsletter;
