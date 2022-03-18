import { useState, useEffect } from "react";
import Info from "../../src/components/Info";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Header from "../../src/components/Info/Header";
import Contact from "../../src/components/Contact/Contact";
import Footer from "../../src/components/Contact/Footer";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
function MainContact(props) {
  const isMain = props.ismain;
  if (isMain != 5) {
    return <></>;
  } else {
    return (
      <>
        <Contact />
        <Footer />
      </>
    );
  }
}
function Title(props) {
  const isReturn = props.isreturn;
  const isMain = props.ismain;
  if (isReturn == 1 && isMain == 5) {
    // console.log(props)
    return <Header data={props.data} perPage={props.perPage} />;
  } else {
    return <></>;
  }
}

function Main(props) {
  const isMain = props.ismain;
  if (isMain == 5) {
    return <Info data={props.info} key={props.info.info_id} />;
  } else {
    return (
      <div
        className="flex flex-col info_detail"
        key={props.info.info_id}
        onClick={() => handleInfo}
      >
        <div className=" mb-12 section_img_1 rounded-md overflow-hidden section_img flex items-center">
          {/* <img src={props.info.img} alt="info" /> */}
          <img src={props.info.img} alt="info" />
        </div>
        <div key={props.info.info_id}>
          <div className="flex justify-between ">
            <h2 className="section_title font-medium mb-3 uppercase text-3xl ">
              {props.info.title}
            </h2>
          </div>
          <p className="text-base section_text">{props.info.description}</p>
        </div>
      </div>
    );
  }
}

export default function Infos({ data }) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(5);
  const [perPage, setPerPage] = useState();
  const [infos, setInfos] = useState([]);
  const loadInfos = async () => {
    const res = await axios({
      method: "get",
      url: `http://localhost:3000/api/info/${page}`,
      params: {
        per: pages,
      },
    });
    setInfos(res.data.infoData);
    setPerPage(res.data.page);
  };
  useEffect(() => {
    let abortController = new AbortController();
    abortController.abort();
    data == 3 ? setPages(3) : setPages(5);
    loadInfos();
  }, [infos]);

  return (
    <div className="info">
      <Head>
        <title>Мэдээ</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <Container component={Box} className="mt-6 info_container">
        <div className="grid section_grid gap-6">
          {infos.map((info) => {
            return (
              <Title
                isreturn={page}
                ismain={pages}
                perPage={infos[0].info_id}
                data={info}
                key={info.info_id}
              />
            );
          })}
        </div>
        <Container component={Box} py={3} className="mt-8 px-0">
          <div className="grid grid-cols-3 gap-4 w-full mx-auto">
            {infos.map((info) => {
              return <Main ismain={pages} info={info} key={info.info_id} />;
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
      </Container>
      <MainContact ismain={pages} />
    </div>
  );
}
