import nc from 'next-connect'
import { getAllCategories } from '../../../controller/category/category'
const handler = nc()
handler.get(getAllCategories)

export default handler