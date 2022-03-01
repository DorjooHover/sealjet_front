import { executeQuery } from "../../config/db";

const getAllOrders = async (req, res) => {
  try {
    let orderData = await executeQuery(
      `
    select * from orders o
    inner join materials m on o.material_id = m.material_id
    inner join products p on o.product_id = p.product_id
    `,
      []
    );
    res.send(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrderById = async (req, res) => {
  let id = req.query.id;
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
const getOrderById = async (req, res) => {
  let id = req.query.id;
  try {
    let orderData = await executeQuery(
      `
      select order_id, orders.name as order_name, orders.email, orders.phone, orders.comment, orders.img as order_img, dotor_diametr, gadna_diametr, height,p.img as product_img, p.title, m.name as material_name, orders.created_at as order_date from orders 
inner join products p on p.product_id = orders.product_id 
inner join materials m on m.material_id = orders.material_id
where order_id = ${id}
    `,
      []
    );
    res.send(orderData);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
export { getAllOrders, deleteOrderById, getOrderById };
