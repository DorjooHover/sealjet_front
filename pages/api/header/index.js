import nc from "next-connect";
import { getAllHeaders, updateHeader } from "../../../controller/header/header";
const handler = nc();

handler.get(getAllHeaders);
handler.put(updateHeader);
// handler.post(createHeader)

export default handler;
