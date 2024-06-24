import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

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


app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
