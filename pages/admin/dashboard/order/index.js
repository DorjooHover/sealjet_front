import SideBar from "../../../../src/components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Delete, ExpandMore } from "@mui/icons-material";
import Head from "next/head";
export default function Order() {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
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
  const moreDetail = async (e) => {
    e.preventDefault();
    let id = e.target.id;
    let res = await axios.get(`http://localhost:3000/api/order/${id}`, []);
    setOrderDetail(res.data);
  };
  return (
    <div className="absolute top-0 w-screen h-screen z-40">
      <Head>
        <title>Захиалга</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
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
                <td className="font-semibold">Огноо</td>
                <td></td>
                <td></td>
              </tr>
              {orders.map((order) => {
                return (
                  <>
                    <tr key={order.order_id}>
                      <td>{order.name}</td>
                      <td>{order.phone}</td>
                      <td>{order.email}</td>
                      <td>{order.created_at}</td>
                      <td className="bg text-white text-sm inline-flex items-center rounded-xl z-20 text-center cursor-pointer relative px-3 my-2 mr-3">
                        <h5>Дэлгэрэнгүй</h5>
                        <ExpandMore
                          className="text-white z-20 rounded-xl m-2 w-8 h-8 my-2"
                          id={order.order_id}
                        />
                        <span
                          className="absolute z-30 w-full h-full inset-0"
                          id={order.order_id}
                          onClick={moreDetail}
                        ></span>
                      </td>
                      <td className="bg text-white text-sm inline-flex items-center rounded-xl z-20 text-center cursor-pointer relative px-3">
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
                    {!orderDetail &&
                      orderDetail.map((data) => {
                        return (
                          <div className="bg relative" key={data.order_id}>
                            <div>
                              <div>
                                <div>
                                  <div>
                                    <img src="" alt="" />
                                  </div>
                                  <div>
                                    <h3>Овог, нэр: {data.order_name}</h3>
                                    <h3>Холбогдох: {data.phone}</h3>
                                    <h3>И-мэйл: {data.email}</h3>
                                    <h3>Бүтээгдэхүүний төрөл</h3>
                                    <div>
                                      <div>
                                        <img src="" alt="" />
                                      </div>
                                      <h3>{data.product_name}</h3>
                                    </div>
                                    <h3>Огноо: {data.order_date}</h3>
                                  </div>
                                </div>
                                <div>
                                  <h3>Өндөр: {data.height} мм</h3>
                                  <h3>
                                    Гадна диаметр: {data.gadna_diametr} см
                                  </h3>
                                  <h3>
                                    Дотор диаметр: {data.dotor_diametr} см
                                  </h3>
                                </div>
                              </div>
                              <div>
                                <h3>Сэтгэгдэл:</h3>
                                <p>{data.comment}</p>
                              </div>
                            </div>
                            <span className="absolute top-0 right-0">X</span>
                          </div>
                        );
                      })}
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
