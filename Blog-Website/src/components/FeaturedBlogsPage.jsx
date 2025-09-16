// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from "react-data-table-component";

// const FeaturedBlogsPage = () => {

//     const [topPosts, setTopPosts] = useState([]);
//     useEffect(() => {
//         const fetchTopPosts = async () => {
//             try {
//                 const response = await axios.get('https://blog-website-server-self.vercel.app/posts');
//                 const posts = response.data;

//                 // Sort posts based on word count of long description in descending order
//                 posts.sort((a, b) => {
//                     const wordCountA = a.long_description.split(' ').length;
//                     const wordCountB = b.long_description.split(' ').length;
//                     return wordCountB - wordCountA;
//                 });

//                 // Get top 10 posts
//                 const top10 = posts.slice(0, 10);
//                 setTopPosts(top10);
//             } catch (error) {
//                 console.error('Error fetching top posts:', error);
//             }
//         };

//         fetchTopPosts();
//     }, []);

//     return (
//         <div>
//             <h2>Featured Blogs</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Serial Number</th>
//                         <th>Blog Title</th>
//                         <th>Blog Owner</th>
//                         <th>Blog Owner Profile Picture</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {topPosts.map((post, index) => (
//                         <tr key={post._id}>
//                             <td>{index + 1}</td>
//                             <td>{post.title}</td>
//                             <td>{post.userName}</td>
//                             <td><img src={post.user_photoURL} alt={post.title} /></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default FeaturedBlogsPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from "react-data-table-component";

// const FeaturedBlogsPage = () => {
//     const [topPosts, setTopPosts] = useState([]);

//     useEffect(() => {
//         const fetchTopPosts = async () => {
//             try {
//                 const response = await axios.get('https://blog-website-server-self.vercel.app/posts');
//                 setTopPosts(response.data);

//                 // Sort posts based on word count of long description in descending order
//                 // posts.sort((a, b) => {
//                 //     const wordCountA = a.long_description.split(' ').length;
//                 //     const wordCountB = b.long_description.split(' ').length;
//                 //     return wordCountB - wordCountA;
//                 // });

//                 // // Get top 10 posts
//                 // const top10 = posts.slice(0, 10);
//                 // setTopPosts(top10);
//             } catch (error) {
//                 console.error('Error fetching top posts:', error);
//             }
//         };

//         fetchTopPosts();
//     }, []);
// console.log(topPosts);
//     // Define columns for DataTable
//     const columns = [
//         {
//             name: 'Serial Number',
//             selector: (_, index) => index + 1,
//             sortable: true,
//         },
//         {
//             name: 'Blog Title',
//             selector: 'title',
//             sortable: true,
//         },
//         {
//             name: 'Blog Owner',
//             selector: 'userName',
//             sortable: true,
//         },
//         {
//             name: 'Blog Owner Profile Picture',
//             cell: row => <img src={row.userProfilePicture} alt="Profile" />,
//             sortable: true,
//         },
//     ];

//     return (
//         <div>
//             <h2>Featured Blogs</h2>
//             <DataTable
//                 columns={columns}
//                 data={topPosts}
//             />
//         </div>
//     );
// };

// export default FeaturedBlogsPage;

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const FeaturedBlogsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const customStyles = {
    table: {
      style: {
        border: "1px solid #e0e0e0",
        width:"100%",
        tableLayout:"fixed",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        minHeight: "40px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#e77674",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  const columns = [
    {
      name: "Serial Number",
      width: "300px",
      selector: (_, index) => index + 1,
      sortable: true,
    },

    {
      name: "Title",
      width: "335px",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Author Name",
      width: "300px",
      selector: (row) => row.userName,
      sortable: true,
    },
    ,
    {
      name: "Author Image",
      width: "500px",
      cell: (row) => (
        <img
          src={row.user_photoURL}
          alt={row.userName}
          style={{ width: "100px", height: "auto" }}
        />
      ),
      sortable: true,
    },
  ];

  const [topPosts, setTopPosts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchTopPosts = async () => {
      try {
        const response = await axios.get(
          "https://blog-website-server-self.vercel.app/posts"
        );
        const posts = response.data;

        // Sort posts based on word count of long description in descending order
        posts.sort((a, b) => {
          const wordCountA = a.long_description.split(" ").length;
          const wordCountB = b.long_description.split(" ").length;
          return wordCountB - wordCountA;
        });

        // Get top 10 posts
        const top10 = posts.slice(0, 10);
        setTopPosts(top10);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching top posts:", error);
      }
    };

    fetchTopPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-10 bg-gray-100">
      <h2 className="mb-4 font-bold text-2xl text-center">Featured Blogs</h2>
      <div className="container my-5 mx-auto">
        <DataTable
          columns={columns}
          data={topPosts}
          progressPending={isLoading}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default FeaturedBlogsPage;
