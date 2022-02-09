import nc from 'next-connect'
import { getInfoById } from '../../../controller/info/info'

const handler = nc()

handler.get(getInfoById)
export default handler