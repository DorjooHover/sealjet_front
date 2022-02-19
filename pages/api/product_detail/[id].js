import nc from "next-connect";
import { getProductDetailById, createProductDetail } from "../../../controller/product_detail/product_detail";

const handler = nc();
handler.get(getProductDetailById);
handler.post(createProductDetail);

export default handler;
