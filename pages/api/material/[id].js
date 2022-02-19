import nc from 'next-connect'

import { getMaterialById } from '../../../controller/material/material'

const handler = nc()
handler.get(getMaterialById)

export default handler