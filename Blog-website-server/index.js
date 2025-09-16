const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
//app.use(
//  cors({
//    origin: ["http://localhost:5173", "https://blog-website-19aef.web.app"],
//    credentials: true,
//})
//);
app.use(
  cors({
    origin: [
      "http://localhost:5173",       // Vite dev
      "http://localhost:3000",       // Docker frontend
      "https://blog-website-19aef.web.app" // Firebase hosting
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  console.log("token in the middleware", token);
  // no token available
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};
async function run() {
  try {
    await client.connect();
    // Connect the client to the server	(optional starting in v4.7)
    const blogPostCollection = client.db("blogDB").collection("posts");
    const commentCollection = client.db("blogDB").collection("comments");
    const wishCollection = client.db("blogDB").collection("wish");

    //auth related API

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, cookieOptions);
      res.send({ success: true });
    });

    app.post("/jwt/logout", async (req, res) => {
      const user = req.body;
      console.log("logging out", user);
      res
        .clearCookie("token", { ...cookieOptions, maxAge: 0 })
        .send({ success: true });
    });

    app.get("/posts", async (req, res) => {
      const cursor = blogPostCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/posts/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      console.log("token owner info", req.user);
      if (email !== req.user.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      let query = {};
      if (email) {
        query = { userEmail: email };
      }

      try {
        const result = await blogPostCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    app.post("/wishlist/add", async (req, res) => {
      const {
        postId,
        userEmail,
        title,
        category,
        image_url,
        short_description,
      } = req.body;

      const existingWish = await wishCollection.findOne({ postId, userEmail });
      if (existingWish) {
        return res.status(200).json({ message: "Wish already exists" });
      }

      const newWish = {
        postId,
        userEmail,
        title,
        category,
        image_url,
        short_description,
      };

      const result = await wishCollection.insertOne(newWish);
      res.send(result);
    });

    app.get("/wishlist/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      // Verify token owner
      if (email !== req.user.email) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      const query = { userEmail: email };
      const result = await wishCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/wishlist/:email/:id", async (req, res) => {
      const { email, id } = req.params;
      const query = { userEmail: email, _id: id };
      const result = await wishCollection.deleteOne(query);
      res.json(result);
    });

    app.post("/posts/:blogId/comments", async (req, res) => {
      const { text, userName, userProfilePicture } = req.body;
      const blogId = req.params.blogId;

      const comment = {
        text,
        blogId,
        userName,
        userProfilePicture,
      };

      const result = await commentCollection.insertOne(comment);
      res.send(result);
    });
    // Route to get comments for a specific blog
    app.get("/posts/:blogId/comments", async (req, res) => {
      const { blogId } = req.params;
      const comments = await commentCollection
        .find({ blogId: blogId })
        .toArray();
      res.send(comments);
    });

    app.get("/post/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await blogPostCollection.findOne(query);

        if (!result) {
          return res.status(404).json({ error: "Blog post not found" });
        }

        res.json(result);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching blog post" });
      }
    });

    app.post("/post", verifyToken, async (req, res) => {
      const newTouristsSpot = req.body;
      const result = await blogPostCollection.insertOne(newTouristsSpot);
      res.send(result);
    });

    app.get("/postData/:id/:email", verifyToken, async (req, res) => {
      try {
        const email = req.params.email;

        if (email !== req.user.email) {
          return res.status(403).send({ message: "Forbidden access" });
        }

        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await blogPostCollection.findOne(query);

        if (!result) {
          return res.status(404).json({ error: "Blog post not found" });
        }

        res.json(result);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching blog post" });
      }
    });

    app.put("/post/:id/:email", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const email = req.params.email;

        // Verify token owner
        if (email !== req.user.email) {
          return res.status(403).send({ message: "Forbidden access" });
        }

        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedBlogPostCollection = req.body;

        const blogPost = {
          $set: {
            title: updatedBlogPostCollection.title,
            image_url: updatedBlogPostCollection.image_url,
            category: updatedBlogPostCollection.category,
            short_description: updatedBlogPostCollection.short_description,
            long_description: updatedBlogPostCollection.long_description,
          },
        };

        const result = await blogPostCollection.updateOne(
          filter,
          blogPost,
          options
        );
        res.send(result);
      } catch (error) {
        console.error("Error updating blog post:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating blog post" });
      }
    });

    app.delete("/post/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await blogPostCollection.deleteOne(query);
      res.send(result);
    });

    // app.get("/countries", async (req, res) => {
    //   const cursor = countryCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });
    // app.post("/country", async (req, res) => {
    //   const newCountry = req.body;
    //   console.log(newCountry);
    //   const result = await countryCollection.insertOne(newCountry);
    //   res.send(result);
    // });
    // app.get("/country/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await countryCollection.findOne(query);
    //   res.send(result);
    // });

    // Send a ping to confirm a successful  connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Blog spot is Running");
});

app.get("/_dbhealth", async (req, res) => {
  try {
    await client.db("admin").command({ ping: 1 });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});


app.listen(port, () => {
  console.log("Blog server is running ....");
});
