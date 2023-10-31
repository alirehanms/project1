import express from "express";
import {fileController} from "../controllers/file.controller.js";
import upload from "../middlewares/file.middleware.js";
import { validate } from "../middlewares/index.js";
import { IdValidator } from "../validatores/id.validator.js";
const router = express.Router();


router.post("/",upload.single("file"),fileController.create);
router.get("/", fileController.get);
router.delete("/:id", validate(IdValidator, "params"), fileController.delete);
router.patch(
  "/:id",
  validate(IdValidator, "params"),
  upload.single("file"),
  
  fileController.update
);
export default router;