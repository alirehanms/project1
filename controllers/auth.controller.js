//import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
//import {User} from "../models/index.js";
import { Userservice } from "../services/user.service.js";
const userController = {
  signup: async (req, res) => {
    try {
      const user = await Userservice.signup(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const authData = await Userservice.signin(email, password);
      res.status(200).json(authData);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const user = await Userservice.get(req.query);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const user = await Userservice.delete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "user not found." });
      }
      res.json({ message: "user deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "please enter correct id." });
    }
  },
};

export { userController };
