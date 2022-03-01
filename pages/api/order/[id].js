import nc from "next-connect";
import { deleteOrderById, getOrderById } from "../../../controller/order/order";

const handler = nc();
handler.delete(deleteOrderById);
handler.get(getOrderById);
export default handler;
