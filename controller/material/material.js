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
const getMaterialById = async (req, res) => {
     const id = req.query.id
     try {
          let materialData = await executeQuery(`
          select * from materials 
          where material_id = ${id}
          `, [])
          res.send(materialData)
     } catch (error) {
          res.status(500).json(error)
     }
}


export { getAllMaterials, getMaterialById }