import nc from 'next-connect'
import { createLogo,getAllLogos} from '../../../controller/logo/logo'

const handler = nc()

handler.post(createLogo)
handler.get(getAllLogos)

export default handler