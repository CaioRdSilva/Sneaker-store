import multer from "multer";
//const parser = multer({ dest: "public/uploads/" });

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/upload/users");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
});
