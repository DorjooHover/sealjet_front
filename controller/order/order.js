import { executeQuery } from "../../config/db";

const getAllOrders = async (req, res) => {
  try {
    let orderData = await executeQuery("select * from orders", []);
    res.send(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
};
const createOrder = async (req, res) => {
  console.log(req.query);
  let { name, phone, email, product_names } = req.query;
  try {
    let orderData = await executeQuery(
      `insert into orders(name , phone, email , product_names ) values(?, ?, ?, ?)`,
      [name, phone, email, product_names]
    );
    res.status(201).json(orderData);
  } catch (error) {
    res.status(500).json(error);
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
export { createOrder, getAllOrders, deleteOrderById };
