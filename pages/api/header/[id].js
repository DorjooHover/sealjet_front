import nc from 'next-connect'

import { getHeaderById, deleteHeaderById, updateEmployeeById } from '../../../controller/header/header'

const handler = nc()
handler.get(getHeaderById)
handler.delete(deleteHeaderById)
handler.put(updateEmployeeById)
export default handler