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

const getHeaderById = async (req, res) => {
     let id = req.query.id
     console.log(id)
     try {
          let headerData = await executeQuery(`select * from headers where header_id=${id}`, [])
          res.status(200).json(headerData)
     } catch (error) {
          res.status(500).json(error)
     }
}
const deleteHeaderById = async (req, res) => {
     let id = req.query.id
     try {
          let headerData = await executeQuery(`delete from headers where header_id=${id}`, [])
          headerData = await executeQuery(`select * from headers where header_id=${headerData.insertId}`)
          res.status(200).json(headerData)
     } catch (error) {
          res.status(500).json(error)
     }
}
const createHeader = async (req, res) => {
     console.log(req.query)
     let title = req.query.title
     try {
          let headerData = await executeQuery(`insert into headers( title) values(?)`, [title])
          res.status(201).json(headerData)

     } catch (error) {
          res.status(500).json(error)
     }
}
const updateHeaderById = async (req, res) => {
     let id = req.query.id
     const { title } = req.query
     console.log(title)
     try {
          let headerData = await executeQuery(`select * from headers where header_id=?`, [id])

          if (headerData.length > 0) {
               headerData = await executeQuery('update headers set title=? ', [title])
               res.status(200).json(headerData)
          } else {
               res.status(400).json(`header not found on id=${id}`)
          }
     } catch (error) {
          res.status(500).json(error)
     }
}
export { getAllHeaders, getHeaderById, deleteHeaderById, createHeader, updateHeaderById }