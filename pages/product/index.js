import { useState, useEffect } from "react";
import { Container, Box, Grid, Pagination } from "@mui/material";
import ProductDetail from "../../src/components/Product";
import axios from "axios";
import { useRouter } from "next/router";
import Contact from "../../src/components/Contact/Contact";
import Footer from "../../src/components/Contact/Footer";
import Head from "next/head";
import Image from "next/image";
import getConfig from "next/config";
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

  if (product[0] == undefined) {
    return <></>;
  } else {
    return <ProductDetail product={product} materialId={materialId} />;
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
function getWindowWidth() {
  if (window !== "undefined") {
    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
      return 3;
    } else if (window.innerWidth <= 768) {
      return 2;
    } else {
      return 5;
    }
  } else {
    return 5;
  }
}

export default function Product({ ismain }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [productId, setProductId] = useState(1);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState("Бүлүүрийн сальник");
  const [materialId, setMaterialId] = useState();
  const [per, setPer] = useState(3);
  const [windowWidth, setWindowWidth] = useState();
  const router = useRouter();
  // const {process.env} = getConfig()
  const loadProduct = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/category"`);
    setData(response.data);

    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_URL}/api/product/${page}`,
      params: {
        per: pages,
        perPage: per,
      },
    });
    setProducts(res.data.productData);
    setCount(Math.ceil(res.data.productCount[0].counts / per));

    const product = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_URL}/api/product_detail/${productId}`,
    });
    setProduct(product.data);
    setMaterialId(router.query.material_id);
  };

  const handlerSubmit = (id) => {
    setPage(id);
    setCategoryTitle(data[id - 1].type);
  };
  const handleProduct = (id) => {
    setProductId(id);
  };

  useEffect(() => {
    let abortController = new AbortController();
    abortController.abort();
    loadProduct();
    setPer(getWindowWidth());
  }, [products]);
  return (
    <>
      <Head>
        <title>Бүтээгдэхүүн</title>
        <link rel="icon" href="/img/logo.png" sizes="100x100" />
      </Head>
      <div className="bg-zinc-100 ">
        <div className="flex justify-between px-32 bg-emerald-800 category">
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
        <Main ismain={ismain} product={product} materialId={materialId} />
        <Container component={Box} className="py-12 width">
          <div className="mb-12">
            <h2 className="text-2xl font-bold">{categoryTitle}</h2>
          </div>
          <div className={`grid product_grid grid-cols-${per} gap-5`}>
            {products.map((p) => {
              return (
                <div key={p.product_id}>
                  <div
                    className="text-center rounded-md overflow-hidden bg-white cursor-pointer"
                    onClick={() => handleProduct(p.product_id)}
                  >
                    <div>
                      <img src={p.img} alt="product" />
                    </div>
                    <p className="text-zinc-300 py-4 border-t rounded-md overflow-hidden bg-white border-solid">
                      {p.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
      <MainContact ismain={ismain} />
    </>
  );
}
