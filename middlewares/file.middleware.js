import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationDirectory = "./public";
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory, { recursive: true });
    }

    cb(null, destinationDirectory);
  },
  filename: (req, file, cb) => {
    const fileName =
      path
        .basename(file.originalname, path.extname(file.originalname))
        .toLowerCase()
        .replace(/\s+/g, "-") +
      "-" +
      Date.now().toString() +
      path.extname(file.originalname).toLowerCase();
    cb(null, fileName);
  },
});

export default multer({ storage });
