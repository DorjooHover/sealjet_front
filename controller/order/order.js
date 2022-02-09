import { executeQuery } from '../../config/db'
const createOrder = async (req, res) => {
     console.log(req.query)
     let {name, phone, email, product_names} = req.query
     try {
          let orderData = await executeQuery(`insert into orders(name , phone, email , product_names ) values(?, ?, ?, ?)`, [name, phone, email, product_names])
          res.status(201).json(orderData)

     } catch (error) {
          res.status(500).json(error)
     }
}
export {createOrder}