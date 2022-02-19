import nc from 'next-connect'
import {getAllProducts} from '../../../controller/product/product' 

const handler = nc()
handler.get(getAllProducts)


export default handler