import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvide";
const UpdateBlogPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const email = user ? user.email : null;
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    category: "",
    short_description: "",
    long_description: "",
    userEmail: "",
    userName: "",
    user_photoURL: "",
  });

  useEffect(() => {
    // Fetch the existing data using the postId
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://blog-website-server-self.vercel.app/postData/${id}/${email}`,
          { withCredentials: true }
        );
        const postData = response.data;
        setFormData({
          title: postData.title,
          image_url: postData.image_url,
          category: postData.category,
          short_description: postData.short_description,
          long_description: postData.long_description,
          userEmail: postData.userEmail,
          userName: postData.userName,
          user_photoURL: postData.user_photoURL,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while fetching data. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchData();
  }, [id, email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://blog-website-server-self.vercel.app/post/${id}/${email}`,
        formData,
        { withCredentials: true }
      );
      Swal.fire({
        title: "Success!",
        text: "Data updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating data. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <div className="lg:m-[100px]  p-10">
        <form onSubmit={handleSubmit}>
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-xl font-bold leading-7 text-gray-900 text-center">
                Update Blog Information
              </h2>

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="lg:col-span-2 col-span-3 sm:col-start-1">
                  <label
                    for="title"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autocomplete="address-level2"
                      value={formData.title}
                      onChange={handleChange}
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="lg:col-span-2 col-span-3">
                  <label
                    for="imageUrl"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image URL:
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      id="image_url"
                      autocomplete="address-level1"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="lg:col-span-2 col-span-3">
                  <label
                    for="category"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div class="mt-2">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select Categories</option>
                      <option value="Nature">Nature</option>
                      <option value="Art">Art</option>
                      <option value="Vintage">Vintage</option>
                      <option value="Scenic">Scenic</option>
                      <option value="Urban">Urban</option>
                      <option value="Rural">Rural</option>
                      <option value="History">History</option>
                      <option value="Landscape">Landscape</option>
                      <option value="Cozy">Cozy</option>
                    </select>
                  </div>
                </div>

                <div class="lg:col-span-2 col-span-3">
                  <label
                    for="street-address"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Short Description
                  </label>
                  <div class="mt-2">
                    <textarea
                      type="text"
                      name="short_description"
                      value={formData.short_description}
                      onChange={handleChange}
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="lg:col-span-2 col-span-3">
                  <label
                    for="postal-code"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Long Description
                  </label>
                  <div class="mt-2">
                    <textarea
                      type="text"
                      name="long_description"
                      value={formData.long_description}
                      onChange={handleChange}
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
