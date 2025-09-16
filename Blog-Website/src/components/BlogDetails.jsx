import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useContext } from "react";

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
 // console.log(id);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [canComment, setCanComment] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `https://blog-website-server-self.vercel.app/blogs/${id}`
        );
        setBlog(response.data);
        if (response.data.userEmail === user.email) {
          setCanComment(false); // User cannot comment on their own blog
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://blog-website-server-self.vercel.app/comments/${id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchBlogDetails();
    fetchComments();
  }, [match.params.id, user.email]);

  const handleCommentSubmit = async () => {
    // Send comment data to backend and update the comments state
  };

  const handleUpdateButtonClick = () => {
    // Navigate to the update route for the current blog
  };

  return (
    <div>
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <img src={blog.imageUrl} alt={blog.title} />
          <p>{blog.short_description}</p>
          <p>{blog.long_description}</p>

          {canComment ? (
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add your comment..."
            ></textarea>
          ) : (
            <p>Cannot comment on own blog</p>
          )}

          <button onClick={handleCommentSubmit}>Submit Comment</button>

          {user.email === blog.userEmail && (
            <button onClick={handleUpdateButtonClick}>Update Blog</button>
          )}

          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <p>{comment.text}</p>
                <p>Comment by: {comment.userName}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
