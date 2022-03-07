import { useState, useEffect } from "react";
import { Container, Box, Grid, Pagination } from "@mui/material";
import ProductDetail from "../../src/components/Product";
import axios from "axios";
import { useRouter } from "next/router";
import Contact from "../../src/components/Contact/Contact";
import Footer from "../../src/components/Contact/Footer";
import Head from "next/head";
import Image from "next/image";
function MainContact(props) {
  const isMain = props.ismain;
  if (isMain) {
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
function Main(props) {
  const isMain = props.ismain;
  const product = props.product;
  const materialId = props.materialId;

  if (isMain) {
    return <></>;
  } else {
    if (product[0] == undefined) {
      return <></>;
    } else {
      return <ProductDetail product={product} materialId={materialId} />;
    }
  }
}
function Current_btn(props) {
  let id = props.id;
  let page = props.page;
  let d = props.d;
  if (id == page) {
    return (
      <button className="text-white font-bold py-2 px-4 bg">{d.type}</button>
    );
  } else {
    return (
      <button className="text-white font-bold py-2 px-4 ">{d.type}</button>
    );
  }
}
export default function Product() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [productId, setProductId] = useState(1);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState("Бүлүүрийн сальник");
  const [materialId, setMaterialId] = useState();

  const router = useRouter();
  const loadProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/category`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:3000/api/product/${page}`,
        params: {
          per: pages,
        },
      });
      setProducts(res.data.productData);
      setCount(Math.ceil(res.data.productCount[0].counts / 5));
    } catch (err) {
      console.log(err);
    }
    try {
      const product = await axios({
        method: "get",
        url: `http://localhost:3000/api/product_detail/${productId}`,
      });
      setProduct(product.data);
    } catch (err) {
      console.log(err);
    }
    setMaterialId(router.query.material_id);
  };

  const handlerSubmit = (id) => {
    // console.log(id);
    setPage(id);
    setCategoryTitle(data[id - 1].type);
  };
  const handleProduct = (id) => {
    setProductId(id);
    console.log(id);
  };

  useEffect(() => {
    loadProduct();
  }, [product, products]);
  return (
    <>
      <Head>
        <title>Бүтээгдэхүүн</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="bg-zinc-100 ">
        <div className="flex justify-between px-32 bg-emerald-800">
          {data.map((d) => {
            return (
              <div
                className="flex"
                key={d.category_id}
                onClick={() => handlerSubmit(d.category_id)}
              >
                <Current_btn id={d.category_id} page={page} d={d} />
              </div>
            );
          })}
        </div>
        <Main ismain={false} product={product} materialId={materialId} />
        <Container component={Box} className="py-12">
          <div className="mb-12">
            <h2 className="text-2xl font-bold">{categoryTitle}</h2>
          </div>
          <Grid container className="grid grid-cols-5 gap-5">
            {products.map((p) => {
              return (
                <div key={p.product_id}>
                  <div
                    className="text-center rounded-md overflow-hidden bg-white cursor-pointer"
                    onClick={() => handleProduct(p.product_id)}
                  >
                    <div>
                      <img src="/img/product/product_1.png" alt="product" />
                    </div>
                    <p className="text-zinc-300 py-4 border-t rounded-md overflow-hidden bg-white border-solid">
                      {p.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </Grid>
          <Box className="flex justify-center mt-12">
            <Pagination
              count={count}
              color="secondary"
              variant="outline"
              onChange={(event, value) => setPages(value)}
            />
          </Box>
        </Container>
      </div>
      <MainContact ismain={false} />
    </>
  );
}
