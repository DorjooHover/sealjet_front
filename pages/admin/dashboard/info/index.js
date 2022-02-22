import SideBar from "../../../../src/components/Sidebar";
import axios from "axios";
import { Container, Box, Grid, Pagination } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Head from "next/head";
export default function Info() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [infos, setInfos] = useState([]);
  const [perPage, setPerPage] = useState();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(5);
  const loadInfos = async () => {
    let info = await axios({
      method: "get",
      url: `http://localhost:3000/api/info/${page}`,
      params: {
        per: pages,
      },
    });
    setInfos(info.data.infoData);
    setPerPage(info.data.page);
  };
  useEffect(() => {
    loadInfos();
  }, [infos]);
  const handleDelete = async (e) => {
    e.preventDefault();
    let id = e.target.id;
    let res = await axios.delete(`http://localhost:3000/api/info/${id}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file, title, description);
    const formData = new FormData();
    formData.append("file", file);
    let res = await axios.post(`http://localhost:3000/api/info`, formData, {
      params: {
        title,
        description,
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
    <div className='absolute top-0 h-screen w-screen'>
      <Head>
        <title>Мэдээ</title>
        <link rel="shortcut icon" href="/img/sealjet-logo.png"></link>
      </Head>
      <div className="flex">
        <SideBar />
        <div className="dashboard ">
          <div className="flex ">
            <div className="mr-32">
              <h2 className="font-bold text-xl">Мэдээ</h2>
              <div className="flex mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label htmlFor="title" className="mb-3">
                      Мэдээний гарчиг
                    </label>
                    <input
                      type="text"
                      name="title"
                      id='title'
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
                      id='description'
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
                      onChange={(e) => setFile(e.target.files[0])}
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
                        <div className="rounded-md overflow-hidden w-10 h-10">
                          <img src={"img/" + info.img} />
                        </div>
                        <div className="ml-6">
                          <h4 className="font-semibold text-xl">
                            {info.title}
                          </h4>
                          <p>{info.date}</p>
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
