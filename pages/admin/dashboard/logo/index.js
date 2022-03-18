import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import SideBar from "../../../../src/components/Sidebar";
import { Delete } from "@mui/icons-material";
import { Box, Pagination, Container } from "@mui/material";
function Date(props) {
  let date = props.date.substr(0, 10);
  return <p className="section_text text-base flex-1 text-right">{date}</p>;
}

export default function Logos() {
  const [logos, setLogos] = useState({
    name: "",
    description: "",
  });
  const [data, setData] = useState([]);
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [image, setImage] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const loadLogo = async () => {
    try {
      let res = await axios.get(`/api/logo/${page}`, []);
      setData(res.data.logoData);
      setPerPage(Math.ceil(res.data.counts / 6));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadLogo();
  }, [data, perPage]);
  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const handleLogo = async (e) => {
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
    let res = await axios.post(`/api/logo`, {
      params: {
        image: image,
        name: logos.name,
        description: logos.description,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLogos((logos) => ({ ...logos, ...{ name: "", description: "" } }));
  };
  const handleDelete = async (e) => {
    try {
      let res = await axios.delete(`/api/logo/${e.target.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="absolute top-0 h-screen w-screen">
      <Head>
        <title>Лого</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard">
          <div className="flex">
            <div>
              <h2 className="font-bold text-xl mb-3 ">Лого</h2>
              <form action="" onSubmit={handleLogo}>
                <div className="flex flex-col w-96 mb-4">
                  <label htmlFor="name" className="mb-3 font-medium">
                    Нэр
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                    value={logos.name}
                    onChange={(e) =>
                      setLogos((logos) => ({
                        ...logos,
                        ...{ name: e.target.value },
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
                    value={logos.description}
                    onChange={(e) =>
                      setLogos((logos) => ({
                        ...logos,
                        ...{ description: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col w-96 ">
                  <label htmlFor="" className="mb-3 font-medium">
                    Зураг оруулах
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="cursor-pointer"
                    onChange={handleOnChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Нийтлэх"
                  className="mt-6 py-2 rounded-full bg text-white font-bold w-48 cursor-pointer"
                />
              </form>
            </div>
            <div className="mt-10 px-0 flex flex-col items-center">
              <div className="w-96">
                {data.map((d) => {
                  return (
                    <div
                      key={d.logo_id}
                      className="flex items-center my-3 justify-between"
                    >
                      <div className="flex">
                        <div className="rounded-md overflow-hidden w-10 h-10">
                          <img src={d.img} alt="logo" />
                        </div>
                        <div className="ml-6">
                          <h4 className="font-semibold text-xl">{d.name}</h4>
                          <Date date={d.created_at} />
                        </div>
                      </div>
                      <button className="bg rounded-md ml-2 relative">
                        <Delete className="text-white text-xs w-5 h-5 m-2" />
                        <span
                          className="absolute inset-0 w-full h-full z-10"
                          id={d.logo_id}
                          onClick={handleDelete}
                        ></span>
                      </button>
                    </div>
                  );
                })}
              </div>
              <Box py={3} display="flex" justifyContent="center">
                <Pagination
                  count={perPage}
                  color="secondary"
                  variant="outline"
                  onChange={(event, value) => setPage(value)}
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
