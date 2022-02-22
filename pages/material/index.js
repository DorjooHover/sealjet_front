import Material from "../../src/components/Material";
import { Container, Box, Grid } from "@mui/material";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";


export default function Materials() {

  const [data, setData] = useState([]);
  const loadData = async () => {
    const res = await axios.get("http://localhost:3000/api/material");
    setData(res.data);
  };
  useEffect(() => {
    loadData();
  }, [data]);
  return (
    <div>
      <Head>
        <title>Материал</title>
        <link rel="icon" href="/img/logo.jpg" />
      </Head>
      <Container component={Box} py={3} className="mt-8">
        <Grid container spacing={2} justifyContent="center">
          {data.map((d) => {
            return (
              <Material
                data={d}
                key={d.material_id}
              />
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
