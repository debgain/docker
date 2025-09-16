import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvide";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import Comment from "./Comment";
const BlogDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const email = user ? user.email : null;
  //console.log(id);
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blog details
    axios
      .get(`https://blog-website-server-self.vercel.app/post/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        setError(error);
      });

    // Fetch comments related to the blog
    axios
      .get(`https://blog-website-server-self.vercel.app/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
       // console.log(response.data);
      })
      .catch((error) => {
        setError(error);
      //  console.log(error);
      });

    // Fetch current user (if authenticated)
    // Replace with your authentication logic
    // Example: setCurrentUser(authService.getCurrentUser());
  }, [id]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in to post a comment.",
      });
      return;
    }

    axios
      .post(
        `https://blog-website-server-self.vercel.app/posts/${id}/comments`,
        {
          text: commentText,
          postId: id ? id : null,
          userName: user.displayName ? user.displayName : null,
          userProfilePicture: user.photoURL ? user.photoURL : null,
        }
      )
      .then((response) => {
       // console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Comment posted!",
          text: "Your comment has been posted successfully.",
        });
        axios
          .get(
            `https://blog-website-server-self.vercel.app/posts/${id}/comments`
          )
          .then((response) => {
            setComments(response.data);
            setCommentText("");
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };

  //   const handleUpdateClick = () => {
  //     // Navigate to the update page for the current blog
  //     // Example: history.push(`/blogs/${blogId}/update`);
  //   };

  if (!blog) {
    return <div>Loading...</div>;
  }
  //console.log(comments);
  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   }

  return (
    <>
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    class="mr-4 w-16 h-16 rounded-full"
                    src={blog.user_photoURL}
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      class="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {blog.userName}
                    </a>
                    <p class="text-base text-gray-500 dark:text-gray-400"></p>
                    <p class="text-base text-gray-500 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        <div>
                          {new Date(blog.timestamp).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {blog.title}
              </h1>
            </header>
            <p class="lead mb-5">{blog.short_description}</p>
            <p class="lead mb-5">{blog.long_description}</p>

            <figure>
              <img
                src={blog.image_url}
                alt=""
                className="w-[500px] h-[600px]"
              />
            </figure>

            <section class="not-format">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mt-4">
                  Discussion ({comments.length} )
                </h2>
              </div>

              {blog.userEmail === email ? (
                <Link to={`/updateBlog/${blog._id}`}>
                  <button className="btn btn-primary m-4 text-center">
                    Update Blog
                  </button>
                </Link>
              ) : (
                <form class="mb-6">
                  <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label for="comment" class="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows="6"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    onClick={handleCommentSubmit}
                    class="btn btn-outline"
                  >
                    Post comment
                  </button>
                </form>
              )}

              {comments.map((comment) => (
                <Comment key={comment._id} comment={comment}></Comment>
              ))}
            </section>
          </article>
        </div>
      </main>

      <aside
        aria-label="Related articles"
        class="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div class="px-4 mx-auto max-w-screen-xl">
          <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related articles
          </h2>
          <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <article class="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png"
                  class="mb-5 rounded-lg"
                  alt="Image 1"
                />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first office</a>
              </h2>
              <p class="mb-4 text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 2 minutes
              </a>
            </article>
            <article class="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png"
                  class="mb-5 rounded-lg"
                  alt="Image 2"
                />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Enterprise design tips</a>
              </h2>
              <p class="mb-4  text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 12 minutes
              </a>
            </article>
            <article class="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png"
                  class="mb-5 rounded-lg"
                  alt="Image 3"
                />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">We partnered with Google</a>
              </h2>
              <p class="mb-4  text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 8 minutes
              </a>
            </article>
            <article class="max-w-xs">
              <a href="#">
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png"
                  class="mb-5 rounded-lg"
                  alt="Image 4"
                />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first project with React</a>
              </h2>
              <p class="mb-4  text-gray-500 dark:text-gray-400">
                Over the past year, Volosoft has undergone many changes! After
                months of preparation.
              </p>
              <a
                href="#"
                class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
              >
                Read in 4 minutes
              </a>
            </article>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BlogDetailsPage;
