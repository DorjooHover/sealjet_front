import nc from "next-connect";
import { updateAdmin } from "../../../controller/admin/admin";

const handler = nc();

handler.put(updateAdmin);

export default handler;
