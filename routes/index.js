import express from "express";
import { verifyToken } from "../middlewares/index.js";
import authorRouter from "./author.routes.js";
import bookRouter from "./book.routes.js";
import userRouter from "./user.routes.js";
import filerouter from "./file.routes.js"
const privateRouter = express.Router();
const publicRouter = express.Router();

privateRouter.use(verifyToken);

privateRouter.use("/authors", authorRouter);
privateRouter.use("/books", bookRouter);

publicRouter.use(userRouter);
publicRouter.use("/file", filerouter);
export { privateRouter, publicRouter };
