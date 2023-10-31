import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },

  price: { type: Number, required: true },
  stock: { type: Number },
});

const Book = mongoose.model("Book", bookSchema);

export  {Book};
