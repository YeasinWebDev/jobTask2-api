const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8400;

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://localhost:5173","https://job-task2-client.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("yeasin");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.0hkunxl.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("jobTask2");
    const menuCollection = db.collection("menu");

    app.post("/menu", async (req, res) => {
      const { category, brandName, minPrice, maxPrice,sortOption  } = req.body;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;

      const filter = {};
      let sort = {};

      if (category) filter.category = category;
      if (brandName) filter.brandName = brandName;

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = minPrice;
        if (maxPrice) filter.price.$lte = maxPrice;
      }

      // for sorting
      if (sortOption === "priceAsc") sort.price = 1;
      if (sortOption === "priceDesc") sort.price = -1;
      if (sortOption === "dateDesc") sort.creationDateTime = -1;

      const result = await menuCollection
        .find(filter)
        .sort(sort)
        .skip(startIndex)
        .limit(limit)
        .toArray();

      const totalItems = await menuCollection.countDocuments(filter);
      
      res.send({
        items: result,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      });
    });

    // get data by search
    app.post("/search", async (req, res) => {
      const { name,sortOption  } = req.body;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;

      // for sorting
      let sort = {};

      if (sortOption === "priceAsc") sort.price = 1;
      if (sortOption === "priceDesc") sort.price = -1;
      if (sortOption === "dateDesc") sort.creationDateTime = -1;

      const result = await menuCollection
        .find({ productName: { $regex: name, $options: "i" } })
        .sort(sort)
        .skip(startIndex)
        .limit(limit)
        .toArray();

      const totalItems = await menuCollection.countDocuments({
        productName: { $regex: name, $options: "i" },
      });
      res.send({
        items: result,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
      });
    });

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
