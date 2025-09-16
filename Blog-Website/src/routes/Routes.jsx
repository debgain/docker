import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddDataPage from "../components/AddDataPage";
import AllBlogsPage from "../components/AllBlogsPage";
import BlogDetailsPage from "../components/BlogDetailsPage";
import FeaturedBlogsPage from "../components/FeaturedBlogsPage";
import Feature from "../components/FeaturePage/Feature";
import UpdateBlogPage from "../components/UpdateBlogPage";
import WishList from "../components/WishList";
import ErrorPage from "../ErrorPage/ErrorPage";
import Root from "../Layouts/Root";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App></App>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allBlogs",
        element: <AllBlogsPage></AllBlogsPage>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetailsPage></BlogDetailsPage>,
      },
      {
        path: "/wishlist",
        element: <PrivateRoute><WishList></WishList></PrivateRoute>,
      },
      {
        path: "/addBlog",
        element: <PrivateRoute><AddDataPage></AddDataPage></PrivateRoute>,
      },
      {
        path: "updateBlog/:id",
        element: <PrivateRoute><UpdateBlogPage></UpdateBlogPage></PrivateRoute>,
      },
      {
        path: "/featureBlogs",
        element: <FeaturedBlogsPage></FeaturedBlogsPage>,
      },
    ],
  },
]);

export default router;
