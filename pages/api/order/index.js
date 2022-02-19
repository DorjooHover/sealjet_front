import nc from "next-connect";
import { getAllOrders } from "../../../controller/order/order";

const handler = nc();
handler.get(getAllOrders);

export default handler;
