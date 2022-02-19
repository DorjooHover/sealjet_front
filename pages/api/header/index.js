import nc from 'next-connect'
import { getAllHeaders, createHeader } from '../../../controller/header/header'
const handler = nc()

handler.get(getAllHeaders)
handler.post(createHeader)
export default handler

// import nc from 'next-connect'

// import { getHeaderById, deleteHeaderById, updateHeaderById } from '../../../controller/header/header'

// const handler = nc()
// handler.get(getHeaderById)
// handler.delete(deleteHeaderById)
// handler.put(updateHeaderById)
// export default handler