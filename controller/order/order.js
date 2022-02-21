import { executeQuery } from "../../config/db";

const getAllOrders = async (req, res) => {
  try {
    let orderData = await executeQuery(`
    select * from orders o
    inner join materials m on o.material_id = m.material_id
    inner join products p on o.product_id = p.product_id
    `, []);
    res.send(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrderById = async (req, res) => {
  let id = req.query.id;
  console.log(id)
  try {
    let orderData = await executeQuery(
      `
         delete from orders where order_id = ${id}
         `,
      []
    );
    orderData = await executeQuery(
      `select * from orders where order_id=${orderData.insertId}`
    );
    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json(error);
  }
};
export { getAllOrders, deleteOrderById };
