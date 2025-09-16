import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvide";
const AddDataPage = () => {
  const { user } = useContext(AuthContext);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const timestamp = new Date().toISOString();
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
      user_photoURL: user.photoURL,
      timestamp: timestamp,
    };
    try {
      await axios.post(
        "https://blog-website-server-self.vercel.app/post",
        updatedFormData,
        { withCredentials: true }
      );
      Swal.fire({
        title: "Success!",
        text: "Data added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setFormData({
        title: "",
        image_url: "",
        category: "",
        short_description: "",
        long_description: "",
        userEmail: "",
        userName: "",
      });
    } catch (error) {
      console.error("Error adding data:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding data. Please try again.",
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
                Add Blog Information
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

                <div class="lg:col-span-2 col-span-2">
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

                <div class="col-span-3">
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

                <div class="col-span-3">
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

export default AddDataPage;
