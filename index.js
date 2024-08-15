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
  origin: ["http://localhost:5173"],
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