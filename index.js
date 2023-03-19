const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./dbConnection");
const errorHandler = require("./errorHandler/errorHandler");
const userRoute = require("./routes/users");
require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 3500;

const app = express();

const server = require("http").createServer(app);

// inbuilt middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes middleware
app.use("/users", userRoute);
app.use(errorHandler);

// db connection
mongoose.connection.once("connected", () => {
  console.log("Connected to mongo db");
  server.listen(PORT, () => console.log("Application running on port", PORT));
});
