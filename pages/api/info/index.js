import nc from 'next-connect'
import {getAllInfos } from '../../../controller/info/info'
import multer from "multer";
import path from "path";

const handler = nc()

handler.get(getAllInfos)
export const config = {
  api: {
    bodyParser: false,
  },
};
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "_" + Date.now + path.extname(file.originalname));
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req, res) => {
  let url = "http://" + req.headers.host;
  let filename = req.file.originalname;
  let title = req.query.title;
  let description = req.query.description;
  let result = await executeQuery(
    "insert into infos(img, title, description) values(?, ?, ?)",
    [filename, title, description]
  );
  res.status(200).send({
    result: result,
    url: url + "/public/img/" + req.file.originalname,
  });
});

export default handler
