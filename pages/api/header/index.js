import nc from 'next-connect'
import { getAllHeaders, createHeader } from '../../../controller/header/header'
const handler = nc()

handler.get(getAllHeaders)
handler.post(createHeader)
export default handler