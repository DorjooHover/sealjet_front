import nc from "next-connect";

import { executeQuery } from "../../../config/db";
import {getAllProducts} from '../../../controller/product/product' 

const handler = nc();
handler.get(getAllProducts)
handler.post(async (req, res) => {
  let image = req.body.params.image;
  let title = req.body.params.title;
  let description = req.body.params.description;
  let categoryId = req.body.params.categoryId;
  let result = await executeQuery(
    "insert into products(img, title, description, category_id) values(?, ?, ?, ?)",
    [image, title, description, categoryId]
  );
  res.status(200).send({
    result: result,
  });
});

export default handler;
