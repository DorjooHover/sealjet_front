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
  }, [orders]);
  const deleteOrder = async (e) => {
    e.preventDefault();
    let id = e.target.id;
    console.log(e.target);
    let res = await axios.delete(`http://localhost:3000/api/order/${id}`, []);
  };
  return (
    <div className="absolute top-0 w-screen h-screen z-40">
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
                <td className="font-semibold">Гадна, дотор диамерт өндөр</td>
                <td className="font-semibold">Бүтээгдэхүүний хүсэлт</td>
                <td className="font-semibold">Материал</td>
                <td className="font-semibold">Төрөл</td>
                <td className="font-semibold">Огноо</td>
                <td></td>
              </tr>
              {orders.map((order) => {
                return (
                  <tr key={order.order_id}>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{order.email}</td>
                    <td>
                      {order.gadna_diametr}см, {order.dotor_diametr}см,{" "}
                      {order.height}см
                    </td>
                    <td>{order.comment}</td>
                    <td>{order.name}</td>
                    <td>{order.title}</td>
                    <td>{order.created_at}</td>
                    <td className="bg text-white text-sm mb-4 block rounded-xl z-20 text-center cursor-pointer relative">
                      <h5>Устгах</h5>
                      <Delete
                        className="text-white z-20 rounded-xl m-2 w-8 h-8"
                        id={order.order_id}
                      />
                      <span
                        className="absolute z-30 w-full h-full inset-0"
                        id={order.order_id}
                        onClick={deleteOrder}
                      ></span>
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
