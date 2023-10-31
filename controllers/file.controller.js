import { fileService } from "../services/file.service.js";

const fileController = {
  create: async (req, res) => {
    try {
      //console.log(req.file);
      const data = await fileService.create(req);

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  get: async (req, res) => {
    try {
      const files = await fileService.get(req.query);
      res.json(files);
    } catch ({ error }) {
      res.json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const file = await fileService.delete(req.params.id);
      if (!file) {
        return res.status(404).json({ error: "file not found." });
      }
      res.json({ message: "file deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete file." });
    }
  },
  update: async (req, res) => {
    try {
      console.log(req.file);
      const fileId = req.params.id;
      const file = req.file;
      const data = {
        file,
        fileId,
        protocol: req.protocol,
        host: req.get("host"),
      };
      const updatedFile = await fileService.update(data);

      if (!updatedFile) {
        return res.status(500).json({
          error: "file not updated.",
        });
      }

      res
        .status(200)
        .json({ file: updatedFile, message: "file update successfully." });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

export { fileController };
