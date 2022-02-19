import { executeQuery } from "../../config/db";

const getAllProducts = async (req, res) => {
  let c_id = req.query.id;
  let id = req.query.per;
  try {
    let productData = await executeQuery(
      ` 
        select * from products
        where category_id = ${c_id} and product_id >= ${id} and product_id <= ${id} + 5
      `,
      []
    );
    res.send(productData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductId = async (req, res) => {
  let id = req.query.id;
  try {
    let productData = await executeQuery(
      `select count(product_id) as counts from products where category_id=${id} `,
      []
    );
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllProducts, getProductId };
