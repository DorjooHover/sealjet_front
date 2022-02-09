import nc from 'next-connect'
import {getAllInfos } from '../../../controller/info/info'
const handler = nc()

handler.get(getAllInfos)
export default handler