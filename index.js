import express from "express";
import mongoose from "mongoose";
//import authorRouter from "./routes/authorRoutes.js";
//import bookRouter from "./routes/bookRoutes.js";
//import userRouter from "./routes/userRoutes.js";
import { privateRouter, publicRouter } from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/Populate", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected mongo");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(publicRouter);
app.use(privateRouter);

//app.use("/books", bookRouter);
//app.use(userRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is live on port 3000");
});
