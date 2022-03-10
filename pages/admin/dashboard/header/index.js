import Head from "next/head";
import SideBar from "../../../../src/components/Sidebar";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
function Date(props) {
  let date = props.date.substr(0, 10);
  return <p className="section_text text-base flex-1 text-right">{date}</p>;
}
export default function Header() {
  const [header, setHeader] = useState({
    title: "",
    description: "",
  });
  const [imageSrc, setImageSrc] = useState();
  const [uploadImgData, setUploadImgData] = useState();
  const [image, setImage] = useState();
  const [bgSrc, setBgSrc] = useState();
  const [uploadBgData, setUploadBgData] = useState();
  const [bgImg, setBgImg] = useState();
  const [alert, setAlert] = useState("");
  function handleOnChangeBg(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setBgSrc(onLoadEvent.target.result);
      setUploadBgData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  function handleOnChangeImg(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadImgData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const handleHeader = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInputImg = Array.from(form.elements).find(
      ({ name }) => name === "img"
    );
    const formDataImg = new FormData();
    const fileInputBg = Array.from(form.elements).find(
      ({ name }) => name === "bg"
    );
    const formDataBg = new FormData();
    for (const file of fileInputImg.files) {
      formDataImg.append("file", file);
    }
    for (const file of fileInputBg.files) {
      formDataBg.append("file", file);
    }
    formDataImg.append("upload_preset", "sealjet");
    formDataBg.append("upload_preset", "sealjet");

    const imgData = await fetch(
      "https://api.cloudinary.com/v1_1/monex-solution/image/upload",
      {
        method: "POST",
        body: formDataImg,
      }
    ).then((r) => r.json());
    setImage(imgData.secure_url);
    const bgdata = await fetch(
      "https://api.cloudinary.com/v1_1/monex-solution/image/upload",
      {
        method: "POST",
        body: formDataBg,
      }
    ).then((r) => r.json());
    setBgImg(bgdata.secure_url);

    let res = await axios.put(`/api/header`, {
      params: {
        image: image,
        bgImg: bgImg,
        title: header.title,
        description: header.description,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setAlert(res.status);
    setHeader((header) => ({ ...header, ...{ title: "", description: "" } }));
  };
  return (
    <div className="h-screen w-screen absolute top-0">
      <Head>
        <title>Нүүр</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard">
          <h2 className="font-bold text-xl mb-3 ">Лого</h2>
          {alert && (
            <Alert variant="outlined" severity="success" className="mb-3 w-96">
              Амжилттай
            </Alert>
          )}
          <form action="" onSubmit={handleHeader}>
            <div className="flex flex-col w-96 mb-4">
              <label htmlFor="name" className="mb-3 font-medium">
                Гарчиг
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                value={header.title}
                onChange={(e) =>
                  setHeader((header) => ({
                    ...header,
                    ...{ title: e.target.value },
                  }))
                }
              />
            </div>
            <div className="flex flex-col w-96 mb-4">
              <label htmlFor="description" className="mb-3 font-medium">
                Тайлбар
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="h-32 rounded-md border-gray-300 border-solid border py-2 px-3"
                value={header.description}
                onChange={(e) =>
                  setHeader((header) => ({
                    ...header,
                    ...{ description: e.target.value },
                  }))
                }
              />
            </div>
            <div className="flex flex-col w-96 mb-4">
              <label htmlFor="file" className="mb-3 font-medium">
                Фон оруулах
              </label>
              <input
                type="file"
                name="bg"
                id="file"
                className="cursor-pointer"
                onChange={handleOnChangeBg}
              />
            </div>
            <div className="flex flex-col w-96 ">
              <label htmlFor="file" className="mb-3 font-medium">
                Зураг оруулах
              </label>
              <input
                type="file"
                name="img"
                id="file"
                className="cursor-pointer"
                onChange={handleOnChangeImg}
              />
            </div>
            <input
              type="submit"
              value="Солих"
              className="mt-6 py-2 rounded-full bg text-white font-bold w-48 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
