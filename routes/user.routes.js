import express from "express";
import { userController} from "../controllers/index.js";
import { validate } from "../middlewares/index.js";
import { schema, signinSchema } from "../validatores/index.js";
import { IdValidator } from "../validatores/id.validator.js";

const router = express.Router();

router.post("/register", validate(schema, "body"), userController.signup);

router.post("/login", validate(signinSchema, "body"), userController.signin);
router.get("/user", userController.get)
router.delete("/user/:id",validate(IdValidator,"params"),userController.delete)
export default router;
