import nc from "next-connect";
import multer from "multer";
import path from "path";
import { getAllOrders } from "../../../controller/order/order";
import { executeQuery } from "../../../config/db";
const handler = nc();
handler.get(getAllOrders);
export const config = {
  api: {
    bodyParser: false,
  },
};
let date = Date.now();
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/order");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + +"_" + date);
  },
});
let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(async (req, res) => {
  let url = "http://" + req.headers.host;
  let filename = req.file.originalname + "_" + date;
  let name = req.query.name;
  let comment = req.query.comment;
  let dotorD = req.query.dotorD;
  let gadnaD = req.query.gadnaD;
  let height = req.query.height;
  let email = req.query.email;
  let phone = req.query.phone;
  let materialId = req.query.material_id;
  let productId = req.query.product_id;
  let result = await executeQuery(
    `
    insert into orders(img, name, comment, dotor_diametr, gadna_diametr, height, phone, email, material_id, product_id) 
    values(?, ?, ?, ?, ?, ? ,? ,? ,? ,? )
    `,
    [
      filename,
      name,
      comment,
      dotorD,
      gadnaD,
      height,
      phone,
      email,
      materialId,
      productId,
    ]
  );
  res.status(200).send({
    result: result,
    url: url + "/public/img/order/" + req.file.originalname + "_" + date,
  });
});
export default handler;
