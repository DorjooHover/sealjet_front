import { executeQuery } from '../../config/db'
const getAllCategories = async (req, res) => {
     try {
          let categoryData = await executeQuery('select * from categories', [])
          res.send(categoryData)
     }
     catch (err) {
          res.status(500).json(err)
     }
}

const getCategoryById = async (req, res) => {
     let id = req.query.id
     console.log(id)
     try {
          let headerData = await executeQuery(`select * from headers where header_id=${id}`, [])
          res.status(200).json(headerData)
     } catch (error) {
          res.status(500).json(error)
     }
}

export { getAllCategories  }