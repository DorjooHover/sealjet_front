import { executeQuery } from '../../config/db'
const getAllLogos = async (req, res) => {
     
     try {
          let logoData = await executeQuery(`
          select * from logos 
          `, [])
          res.send(logoData)
     }
     catch (err) {
          res.status(500).json(err)
     }
}

const getLogoById = async (req, res ) => {
     let id = req.query.id
     try {
          let logoData = await executeQuery(`
          select * from logos
          where logo_id = ${id}
          `, [])
          res.status(200).send(logoData)
     } catch (error) {
          res.status(500).json(error)
     }
}
export { getAllLogos, getLogoById }