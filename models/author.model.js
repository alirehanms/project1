import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name not provided "],
  },
});

const Author = mongoose.model("Author", authorSchema);

export  {Author};
