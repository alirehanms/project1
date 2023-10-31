import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: { type: String, required: true },
  original_name: { type: String, required: true },
  path: { type: String, required: true },
  type: { type: String, required: true },
  link: { type: String , required: true },
});

const FileModel = mongoose.model("FileModel", schema);

export { FileModel };
