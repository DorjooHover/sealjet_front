import nc from 'next-connect'
import { getAllAdmins } from '../../../controller/admin/admin'

const handler = nc()
handler.get(getAllAdmins)

export default handler