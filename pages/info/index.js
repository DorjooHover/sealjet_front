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
      <div className="flex flex-col " key={props.info.info_id}>
        <div className="rounded-md overflow-hidden mb-12 px-2  section_img_1">
          <img src="/img/product/product_1.jpg" alt="" />
        </div>
        <div key={props.info.info_id}>
          <div className="flex justify-between mr-12">
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
    data == 3 ? setPages(3) : setPages(5), loadInfos();
  }, [infos]);

  return (
    <Container componet={Box} className="mt-6 ">
      <div className="grid section_grid gap-3">
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
        <Grid
          container
          spacing={2}
          justifyContent="center"
          className="grid grid-cols-3"
        >
          {infos.map((info) => {
            return <Main ismain={pages} info={info} key={info.info_id}/>;
          })}
        </Grid>
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
  );
}
