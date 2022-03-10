import nc from "next-connect";
import { getLogoById, deleteLogo } from "../../../controller/logo/logo";
const handler = nc();
handler.get(getLogoById);
handler.delete(deleteLogo);
export default handler;
