import SideBar from "../../../../src/components/Sidebar";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Product() {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const loadCategory = async () => {
    let res = await axios.get(`http://localhost:3000/api/category`, []);
    setCategories(res.data);
  };
  useEffect(() => {
    loadCategory();
  });
  const handleProduct = async (e) => {
    e.preventDefault();
    const categoryId = e.target[1].selectedOptions[0].id;
    const formData = new FormData();
    formData.append("file", file);
    let res = await axios.post(`http://localhost:3000/api/material`, formData, {
      params: {
        title,
        description,
        categoryId,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setFile(null);
    setTitle("");
    setDescription("");
  };
  return (
    <div className="absolute top-0 h-screen w-screen">
      <Head>
        <title>Бүтээгдэхүүн</title>
        <link rel="shortcut icon" href="/img/sealjet-logo.png"></link>
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard">
          <div className="flex justify-evenly">
            <div>
              <h2 className="font-bold text-xl mb-3">Бүтээгдэхүүн</h2>
              <form action="" className="w-full" onSubmit={handleProduct}>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Бүтээгдэхүүний нэр
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Ангилал
                  </label>
                  <select
                    name=""
                    id=""
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  >
                    {categories.map((category) => {
                      return (
                        <option id={category.category_id} key={category.catergoy_id}>
                          {category.type}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Бүтээгдэхүүний дэлгэрэнгүй
                  </label>
                  <textarea
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4 h-32"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Зураг оруулах
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <input
                  type="submit"
                  value="Нийтлэх"
                  className="mt-6 py-2 rounded-full bg text-white font-bold w-48"
                />
              </form>
            </div>
            <div>
              <h2 className="font-bold text-xl mb-3">
                Бүтээгдэхүүн дэлгэрэнгүй
              </h2>
              <form action="" className="justify-between w-full">
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Температур
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Шилжилтийн хурд
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Даралт
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Үндсэн сальник
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Гогцоо резин
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Тулах цагираг
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Эрчимжүүлэгч
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="" className="mb-3">
                    Захын тулах
                  </label>
                  <input
                    type="text"
                    className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                  />
                </div>

                <input
                  type="submit"
                  value="Нийтлэх"
                  className="mt-6 py-2 rounded-full bg text-white font-bold w-48"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
