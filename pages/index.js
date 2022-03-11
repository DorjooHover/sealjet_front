import Head from "next/head";
import Header from "../src/components/Header";
import Info from "../src/components/Info";
import Product from "./product";
import Infos from "./info";
import Contact from "../src/components/Contact/Contact";
import Footer from "../src/components/Contact/Footer";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [logo, setLogo] = useState([]);
  const loadData = async () => {
    const res = await axios.get("/api/header");
    setData(res.data[0]);
    const logos = await axios.get("/api/logo");
    setLogo(logos.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="main">
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/logo.png" width={70} height={70} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <div>
        <Header data={data} />
        <Product ismain={true} />
        <div className="bg-zinc-100 pt-12">
          <h2 className="title text-2xl font-bold mx-auto px-4">
            Мэдээ, мэдээлэл
          </h2>
          <Infos data={3} />
        </div>
      </div>
      <div id="contacts">
        <Contact />
        <Footer />
      </div>
      <Head>
        <title>Sealjet</title>
      </Head>
    </div>
  );
}
