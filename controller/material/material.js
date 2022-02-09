import { executeQuery } from '../../config/db'
const getAllMaterials = async (req, res) => {
     try {
          let materialData = await executeQuery(`
          select * from materials
          `, [])
          res.send(materialData)
     }
     catch (err) {
          res.status(500).json(err)
     }
}



export { getAllMaterials }