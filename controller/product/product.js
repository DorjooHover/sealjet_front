import { executeQuery } from '../../config/db'
const getAllProducts = async (req, res) => {
     let id = req.query.id
     try {
          let productData = await executeQuery(`
          select * from products p 
          inner join categories c on c.category_id = p.category_id 
          where c.category_id = ${id} 
          group by c.category_id`, [])
          res.send(productData)
     }
     catch (err) {
          res.status(500).json(err)
     }
}

const getProductById = async (req, res) => {
     let id = req.query.id
     console.log(id)
     try {
          let productData = await executeQuery(`select * from products where product_id=${id}`, [])
          res.status(200).json(productData)
     } catch (error) {
          res.status(500).json(error)
     }
}

export { getAllProducts, getProductById }