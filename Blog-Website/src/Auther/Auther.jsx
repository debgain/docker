import React from "react";
import AuthorSlider from "./AuthorSlider";



function Auther() {
  const authors = 
    [
        {
          "name": "John Doe",
          "bio": "A passionate writer and tech enthusiast.",
          "photo": "https://i.ibb.co/PrPwgb4/pexels-olly-785667.jpg"
        },
        {
          "name": "Jane Smith",
          "bio": "Loves to write about lifestyle and health.",
          "photo": "https://i.ibb.co/r3LbDdn/pexels-hannah-nelson-390257-1065084.jpg"
        },
        {
          "name": "Alice Johnson",
          "bio": "Enthusiastic about travel and adventure writing.",
          "photo": "https://i.ibb.co/YkPLB5S/pexels-andrewpersonaltraining-733500.jpg"
        },
        {
          "name": "David Brown",
          "bio": "Experienced in finance and investment topics.",
          "photo": "https://i.ibb.co/hHxK2z9/pexels-olly-927022.jpg"
        },
        {
          "name": "Emily Davis",
          "bio": "Passionate about food, cooking, and recipe sharing.",
          "photo": "https://i.ibb.co/kDqz36M/pexels-mrreporter-865773.jpg"
        },
        {
          "name": "Michael Wilson",
          "bio": "Expert in technology trends and innovation.",
          "photo": "https://i.ibb.co/D7Kv3PD/pexels-italo-melo-881954-2379005.jpg"
        },
        {
          "name": "Sarah Thompson",
          "bio": "Focuses on self-improvement and personal development.",
          "photo": "https://i.ibb.co/HhGww0p/pexels-vinicius-wiesehofer-289347-1130626.jpg"
        }
      
   
  ];
  return (
    <div className="">
      <h1 className="text-3xl font-bold my-10">Meet Our Authors</h1>
      <AuthorSlider authors={authors} />
    </div>
  );
}

export default Auther;
