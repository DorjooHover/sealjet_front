import nc from "next-connect";
import { getAllOrders } from "../../../controller/order/order";
import { executeQuery } from "../../../config/db";
const handler = nc();
handler.get(getAllOrders);

handler.post(async (req, res) => {
  let image = req.body.params.image
  let name = req.body.params.name;
  let comment = req.body.params.comment;
  let dotorD = req.body.params.dotorD;
  let gadnaD = req.body.params.gadnaD;
  let height = req.body.params.height;
  let email = req.body.params.email;
  let phone = req.body.params.phone;
  let materialId = req.body.params.material_id;
  let productId = req.body.params.product_id;
  let result = await executeQuery(
    `
    insert into orders(img, name, comment, dotor_diametr, gadna_diametr, height, phone, email, material_id, product_id) 
    values(?, ?, ?, ?, ?, ? ,? ,? ,? ,? )
    `,
    [
      image,
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
    result: result
  });
});
export default handler;
