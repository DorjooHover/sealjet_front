import { executeQuery } from '../../config/db'
const getAllInfos = async (req, res) => {
     let id = req.query.id
     try {
          let infoData = await executeQuery(`
          select * from infos 
          `, [])
          res.send(infoData)
     }
     catch (err) {
          res.status(500).json(err)
     }
}
const getInfoById = async (req, res) => {
     let id = req.query.id
     console.log(id)
     try {
          let infoData = await executeQuery(`select * from infos where info_id=${id}`, [])
          res.status(200).json(infoData)
     } catch (error) {
          res.status(500).json(error)
     }
}


export { getAllInfos, getInfoById }