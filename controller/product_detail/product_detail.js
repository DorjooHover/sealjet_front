import { executeQuery } from '../../config/db'
const getAllProductDetails = async (req, res) => {
     let id = req.query.id
     try {
          let productDetailData = await executeQuery(`
          select * from product_details pd
          inner join products p on p.product_id = pd.product_id 
          inner join material_details md on md.product_detail_id = pd.product_detail_id
          where p.product_id = ${id}
          group by p.product_id 
          `, [])
          res.send(productDetailData)
     }
     catch (err) {
          res.status(500).json(err)
     }
}



export { getAllProductDetails }