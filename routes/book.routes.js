import express from "express";

import {
  BookController
} from "../controllers/index.js";
import { booksValidator } from "../validatores/index.js";
import { validate } from "../middlewares/index.js";
import { IdValidator } from "../validatores/id.validator.js";
const router = express.Router();

router.post("/", validate(booksValidator, "body"), BookController.create);
router.get("/", BookController.get);

router.put("/:id", validate(IdValidator, "params"), BookController.updateBook);
router.delete("/:id", validate(IdValidator, "params"), BookController.delete);
//router.get("/get-books", BookController.authorsBook);
export default router;
