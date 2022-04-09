import SideBar from "../../../../src/components/Sidebar";
import axios from "axios";
import { Container, Box, Grid, Pagination } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Head from "next/head";
function Date(props) {
  let date = props.date.substr(0, 10);
  return <p className="section_text text-base flex-1 text-right">{date}</p>;
}
export default function Info() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [infos, setInfos] = useState([]);
  const [perPage, setPerPage] = useState();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(5);
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
    console.log(image);
    setImage(data.secure_url);
    let res = await axios.post(`/api/info`, {
      params: {
        title,
        description,
        image,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setTitle("");
    setDescription("");
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    let id = e.target.id;
    let res = await axios.delete(`/api/info/${id}`);
  };
  const loadInfos = async () => {
    let info = await axios({
      method: "get",
      url: `/api/info/${page}`,

      params: {
        per: pages,
      },
    });
    setInfos(info.data.infoData);
    setPerPage(info.data.page);
  };
  useEffect(() => {
    loadInfos();
  }, [infos, perPage]);

  return (
    <div className="absolute top-0 h-screen w-screen">
      <Head>
        <title>Мэдээ</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard ">
          <div className="flex ">
            <div className="mr-32">
              <h2 className="font-bold text-xl">Мэдээ</h2>
              <div className="flex mt-4">
                <form onSubmit={handleSubmit} method="post">
                  <div className="flex flex-col">
                    <label htmlFor="title" className="mb-3">
                      Мэдээний гарчиг
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description" className="mb-3">
                      Мэдээний дэлгэрэнгүй
                    </label>
                    <textarea
                      id="description"
                      type="text"
                      name="description"
                      className="w-96 rounded-md border-gray-300 border-solid border py-2 px-3 mb-4"
                      height="300"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="file" className="mb-3">
                      Зураг оруулах
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleOnChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Нийтлэх"
                    className="mt-10 py-2 rounded-full bg text-white font-bold w-48"
                  />
                </form>
              </div>
            </div>
            <div className="mt-12">
              <h4>Сүүлд оруулсан мэдээнүүд</h4>
              <Container component={Box} py={3} className="mt-8 px-0">
                <div className="grid grid-cols-1">
                  {infos.map((info) => {
                    return (
                      <div
                        key={info.info_id}
                        className="flex items-center my-3 justify-between"
                      >
                        <div className="rounded-md overflow-hidden w-16 h-auto flex items-center">
                          <img src={info.img} alt='img'/>
                        </div>
                        <div className="ml-6">
                          <h4 className="font-semibold text-xl">
                            {info.title}
                          </h4>
                          <Date date={info.date} />
                        </div>
                        <button className="bg rounded-md ml-8 ">
                          <Edit className="text-white text-xs w-5 h-5 m-2" />
                        </button>
                        <button className="bg rounded-md ml-2">
                          <Delete
                            className="text-white text-xs w-5 h-5 m-2"
                            id={info.info_id}
                            onClick={handleDelete}
                          />
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
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
