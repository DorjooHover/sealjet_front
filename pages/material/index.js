import Material from "../../src/components/Material";
import { Container, Box, Grid } from "@mui/material";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import Contact from "../../src/components/Contact/Contact";
import Footer from "../../src/components/Contact/Footer";
export default function Materials() {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const res = await axios.get("http://localhost:3000/api/material");
    setData(res.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <Head>
        <title>Материал</title>
        <link rel="icon" href="/img/logo.png" />
      </Head>
      <div className="width mx-auto my-10 px-6 material_main">
        <h2 className="text-2xl font-bold">Материал</h2>
      </div>
      <Container component={Box} py={3} className="mt-8 material_detail">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          className="grid grid-cols-2 width mx-auto gap-10 material"
        >
          {data.map((d) => {
            return <Material data={d} key={d.material_id} />;
          })}
        </Grid>
      </Container>
      <Contact />
      <Footer />
    </div>
  );
}
