import nc from "next-connect";
import { getAllMaterials } from "../../../controller/material/material";
import { executeQuery } from "../../../config/db";
import multer from "multer";
import path from "path";

const handler = nc();
handler.get(getAllMaterials);
export const config = {
  api: {
    bodyParser: false,
  },
};
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/material");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "_" + date + "_" + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req, res) => {
  console.log(req);
  let url = "http://" + req.headers.host;
  let filename =
    file.originalname + "_" + date + "_" + path.extname(file.originalname);
  let name = req.body.name;
  let description = req.body.description;
  console.log(filename, name, description);
  let result = await executeQuery(
    "insert into materials(img, name, description) values(?, ?, ?)",
    [filename, name, description]
  );
  res.status(200).send({
    result: result,
    url:
      url +
      "/public/img/material" +
      file.originalname +
      "_" +
      date +
      "_" +
      path.extname(file.originalname),
  });
});

export default handler;
