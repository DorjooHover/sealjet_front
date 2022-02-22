import { executeQuery } from '../../config/db'
const getAllHeaders = async (req, res) => {
     try {
          let headerData = await executeQuery('select * from headers', [])
          res.send(headerData)
     }
     catch (err) {
          res.status(500).json(err)
     }
}

// const createHeader = async (req, res) => {
//      let title = req.query.title
//      try {
//           let headerData = await executeQuery(`insert into headers( title) values(?)`, [title])
//           res.status(201).json(headerData)

//      } catch (error) {
//           res.status(500).json(error)
//      }
// }

export { getAllHeaders }