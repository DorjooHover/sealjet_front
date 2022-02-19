import nc from "next-connect";
import { getInfoById, deleteInfoById } from "../../../controller/info/info";

const handler = nc();

handler.get(getInfoById);
handler.delete(deleteInfoById);
export default handler;
