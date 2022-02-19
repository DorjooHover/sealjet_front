import nc from "next-connect";
import { deleteOrderById } from "../../../controller/order/order";

const handler = nc();
handler.delete(deleteOrderById);

export default handler;
