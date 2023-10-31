import { FileModel } from "../models/file.model.js";

const fileService = {
  create: async (req) => {
    if (req.file) {
      req.file.path = req.file.path.replace(/\\/g, "/");

      const newFile = {
        link: `${req.protocol}://${req.get("host")}/${req.file.path}`,
        name: req.file.filename,
        original_name: req.file.originalname,
        type: req.file.mimetype,
        path: req.file.path,
      };
      const data = await FileModel.create(newFile);
      return data;
    } else {
      throw new Error("No file found");
    }
  },
  get: async (query) => {
    const data = await FileModel.find(query);
    return data;
  },
  delete: async (id) => {
    const data = await FileModel.findByIdAndDelete(id);
    return data;
  },
  update: async (data) => {
    //const {fileId, file, protocol, host} = data;
    if (data.file) {
      data.file.path = data.file.path.replace(/\\/g, "/");
      const newfile = {
        link: `${data.protocol}://${data.host}/${data.file.path}`,
        name: data.file.filename,
        original_name: data.fileoriginalname,
        type: data.file.mimetype,
        path: data.file.path,
      };

      return FileModel.findByIdAndUpdate(data.fileId, newfile, {
        new: true,
      });
    }
  },
};

export { fileService };
