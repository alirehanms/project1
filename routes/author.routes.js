import express from "express";

import {
AuthorController
} from "../controllers/index.js";
import { validate } from "../middlewares/index.js";
import { authorsValidator } from "../validatores/index.js";
import { IdValidator } from "../validatores/id.validator.js";
const router = express.Router();
router.post("/", validate(authorsValidator, "body"),AuthorController.create);
router.get("/", AuthorController.get);
router.put("/:id", validate(IdValidator, "params"), AuthorController.updateAuthor);
router.delete("/:id", validate(IdValidator, "params"), AuthorController.delete);
//router.get("/get-authors", AuthorController.booksAuthor);

export default router;
