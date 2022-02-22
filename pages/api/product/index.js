import nc from "next-connect";

import { executeQuery } from "../../../config/db";
import multer from "multer";
import path from "path";

const handler = nc();

export const config = {
  api: {
    bodyParser: false,
  },
};
let date = Date.now();
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/product");
  },
  filename: function (req, file, cb) {
    cb(null, date + "_" + path.extname(file.originalname));
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req, res) => {
  let url = "http://" + req.headers.host;
  let filename = date + "_" + path.extname(file.originalname);
  let title = req.query.title;
  let description = req.query.description;
  let categoryId = req.query.catergoryId;
  let result = await executeQuery(
    "insert into products(img, title, description, category_id) values(?, ?, ?, ?)",
    [filename, title, description, categoryId]
  );
  res.status(200).send({
    result: result,
    url:
      url +
      "/public/img/product" +
      date +
      "_" +
      path.extname(file.originalname),
  });
});

export default handler;
