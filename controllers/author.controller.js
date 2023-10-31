//import {Author} from "../models/index.js";
import { Authorservice } from "../services/index.js";
const AuthorController = {
  create: async (req, res) => {
    try {
      const author = await Authorservice.create(req.body);
      res.status(201).json(author);
    } catch (error) {
      res.status(500).json({ error: "Failed" });
    }
  },
  get: async (req, res) => {
    try {
      const author = await Authorservice.get(req.query);
      res.json(author);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
  updateAuthor: async (req, res) => {
    try {
      const author = await Authorservice.updateAuthor(req.params.id, req.body, {
        new: true,
      });
      if (!author) {
        return res.status(404).json({ error: "Author not found." });
      }
      res.json(author);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update author: " + error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const author = await Authorservice.delete(req.params.id);
      if (!author) {
        return res.status(404).json({ error: "Author not found." });
      }
      res.json({ message: "Author  deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "please enter correct id." });
    }
  },
  /* booksAuthor: async (req, res) => {
    try {
      const teachers = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
        },
      ]);
      res.status(200).json(teachers);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
*/
};

export { AuthorController };
