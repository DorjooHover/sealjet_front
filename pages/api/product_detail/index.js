import nc from "next-connect";
import { createProductDetail } from "../../../controller/product_detail/product_detail";
const handler = nc();
handler.post(createProductDetail);

export default handler;
