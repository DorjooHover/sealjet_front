import SideBar from "../../../../src/components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Delete, ExpandMore, Clear } from "@mui/icons-material";
import Head from "next/head";
function Date(props) {
  let date = props.date.substr(0, 10);
  return <>{date}</>;
}
export default function Order() {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [detail, setDetail] = useState(false);
  const loadOrder = async () => {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/order`, []);
    setOrders(res.data);
  };
  useEffect(() => {
    loadOrder();
  }, [orders]);
  const deleteOrder = async (e) => {
    e.preventDefault();
    let id = e.target.id;
    console.log(e.target);
    let res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/api/order/${id}`,
      []
    );
  };
  const moreDetail = async (e) => {
    e.preventDefault();
    let id = e.target.id;
    console.log(id);
    let res1 = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/order/${id}`,
      []
    );
    setOrderDetail(res1.data);
    setDetail(true);
  };
  const handleDetail = () => {
    setDetail(false);
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
              {orders && orders.map((order) => {
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
                      <td className="bg text-white text-sm inline-flex  items-center rounded-xl z-20 text-center cursor-pointer relative px-3">
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
                  </>
                );
              })}
              {detail && (
                <div
                  className="bg absolute w-2/3 order_detail top-1/2 z-20 overflow-hidden "
                  key={orderDetail[0].order_id}
                >
                  <div className="inset-0 ">
                    <div className="bg_1 mx-8 my-4 px-6 py-4 text-xs font-medium">
                      <div className="flex justify-evenly">
                        <div className="flex">
                          <div className="mr-6">
                            <img src={orderDetail[0].order_img} alt="" />
                          </div>
                          <div>
                            <h3 className="mb-2">
                              Овог, нэр: {orderDetail[0].order_name}
                            </h3>
                            <h3 className="mb-2">
                              Холбогдох: {orderDetail[0].phone}
                            </h3>
                            <h3 className="mb-2">
                              И-мэйл: {orderDetail[0].email}
                            </h3>
                            <h3 className="mb-2">Бүтээгдэхүүний төрөл</h3>
                            <div className="mb-2">
                              <div>
                                <img src="" alt="" />
                              </div>
                              <h3>{orderDetail[0].title}</h3>
                            </div>
                            <h3>
                              Огноо: <Date date={orderDetail[0].order_date} />
                            </h3>
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-2">
                            Өндөр: {orderDetail[0].height} мм
                          </h3>
                          <h3 className="mb-2">
                            Гадна диаметр: {orderDetail[0].gadna_diametr} см
                          </h3>
                          <h3 className="mb-2">
                            Дотор диаметр: {orderDetail[0].dotor_diametr} см
                          </h3>
                        </div>
                      </div>

                      <div className="w-full">
                        <h3 className="mb-3">Сэтгэгдэл:</h3>
                        <p className="bg-white">{orderDetail[0].comment}</p>
                      </div>
                    </div>

                    <span
                      className="absolute top-1 right-1 z-30 text-white font-medium cursor-pointer"
                      onClick={handleDetail}
                    >
                      <Clear />
                    </span>
                  </div>
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
