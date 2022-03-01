import { useState } from "react";
import SideBar from "../../../../src/components/Sidebar";
import axios from "axios";
import Head from "next/head";
export default function Material() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [image, setImage] = useState();
  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "sealjet");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/monex-solution/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setImage(data.secure_url);
    let res = await axios.post(`http://localhost:3000/api/material`, {
      params: {
        image,
        name,
        description,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setName("");
    setDescription("");
  };

  return (
    <div className="absolute top-0 h-screen w-screen">
      <Head>
        <title>Материал</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard">
          <h2 className="font-bold text-xl mb-5">Материал</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-3">
                Материалын нэр
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-3">
                Материалын дэлгэрэнгүй
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image" className="mb-3">
                Зураг оруулах
              </label>
              <input
                type="file"
                name="file"
                id="image"
                onChange={handleOnChange}
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
