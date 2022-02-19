import SideBar from "../../../../src/components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import Head from "next/head";
export default function Order() {
  const [orders, setOrders] = useState([]);
  const loadOrder = async () => {
    let res = await axios.get(`http://localhost:3000/api/order`, []);
    setOrders(res.data);
  };
  useEffect(() => {
    loadOrder();
  });
  const deleteOrder = async (e) => {
    e.preventDefault();
    let id = e.target.id;
    let res = await axios.delete(`http://localhost:3000/api/order/${id}`, []);
  };
  return (
    <div className="absolute top-0 w-screen h-screen">
      <Head>
        <title>Захиалга</title>
        <link rel="shortcut icon" href="/img/sealjet-logo.png"></link>
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-6">Захиалга</h2>
            <table>
              <tr>
                <td className="font-semibold">Овог, нэр</td>
                <td className="font-semibold">Холбогдох утас</td>
                <td className="font-semibold">И-мэйл</td>
                <td className="font-semibold">Бүтээгдэхүүний хүсэлт</td>
                <td className="font-semibold">Огноо</td>
                <td></td>
              </tr>
              {orders.map((order) => {
                return (
                  <tr key={order.order_id}>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{order.email}</td>
                    <td>{order.product_names}</td>
                    <td>{order.created_at}</td>
                    <td
                      className="bg text-white text-sm mb-4 rounded-xl text-center cursor-pointer"
                      id={order.order_id}
                      onClick={deleteOrder}
                    >
                      Устгах
                      <Delete className="text-white rounded-xl m-2 w-8 h-8" />
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
