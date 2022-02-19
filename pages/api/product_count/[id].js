import { getProductId } from "../../../controller/product/product";
import nc from "next-connect";

const handler = nc();
handler.get(getProductId);

export default handler;
