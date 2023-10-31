//import {Book} from "../models/index.js";
import { Bookservice } from "../services/index.js";

const BookController = {
  create: async (req, res) => {
    try {
      const book = await Bookservice.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: "Failed to create book" });
    }
  },

  get: async (req, res) => {
    try {
      const book = await Bookservice.get(req.query);
      res.json(book);
    } catch (error) {
      res
        .status(500)
        .json({ error: + error.message });
    }
  },

  updateBook: async (req, res) => {
    try {
      const book = await Bookservice.updateBook(req.params.id, req.body);
      if (!book) {
        return res.status(404).json({ error: "Book not found." });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: "Failed to update book." });
    }
  },
  delete: async (req, res) => {
    try {
      const book = await Bookservice.delete(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found." });
      }
      res.json({ message: "Book deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete book." });
    }
  },
  /* authorsBook: async (req, res) => {
    try {
      const teachers = await Bookservice.authorsBook();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },*/
};

export { BookController };
