import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import blogPostRoute from "./routes/blogPostRoute.js";

dotenv.config();

//DATA BASE CONNECTION:
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "5-Blogapp",
  })
  .then(() => console.log("DATABASE SUCCESSFULLY connected "))
  .catch((err) => console.log(err));

const app = express();

//MIDDLEWARE:
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.listen(4000, () => {
  console.log("Server is Running on port 4000");
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", blogPostRoute);
