import { useState } from "react";
import SideBar from "../../../../src/components/Sidebar";
import axios from "axios";
import Head from "next/head";
export default function Material() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file, name, description);
    const formData = new FormData();
    formData.append("file", file);
    let res = await axios.post(`http://localhost:3000/api/material`, formData, {
      params: {
        name,
        description,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setFile(null);
    setName("");
    setDescription("");
  };

  return (
    <div className='absolute top-0 h-screen w-screen'>
      <Head>
        <title>Материал</title>
        <link rel="shortcut icon" href="/img/sealjet-logo.png"></link>
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard">
          <h2 className="font-bold text-xl mb-5">Материал</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col">
              <label htmlFor="" className="mb-3">
                Материалын нэр
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="mb-3">
                Материалын дэлгэрэнгүй
              </label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
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
              className="mt-10 py-2 rounded-full bg text-white font-bold w-48 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
