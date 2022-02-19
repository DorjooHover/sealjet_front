import { useState, useEffect } from "react";
import { Container, Box, Grid, Pagination } from "@mui/material";
import ProductDetail from '../../../src/components/Product'
import axios from "axios";
function Main(props) {
  const isMain = props.ismain;
  const product = props.product;
  if (isMain) {
    return <></>;
  } else {
    return (
      <ProductDetail product={product} />
    )
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
  const loadProduct = async () => {
    const response = await axios.get(`http://localhost:3000/api/category`);
    setData(response.data);
    const res = await axios({
      method: "get",
      url: `http://localhost:3000/api/product/${page}`,
      params: {
        per: pages,
      },
    });
    setProducts(res.data);
    const count = await axios({
      method: "get",
      url: `http://localhost:3000/api/product_count/${page}`,
    });
    setCount(Math.ceil(count.data[0].counts / 5));
    const product = await axios({
      method: "get",
      url: `http://localhost:3000/api/product_detail/${productId}`,
    });
    setProduct(product.data);
  };

  const handlerSubmit = (id) => {
    setPage(id);
  };
  const handleProduct = (id) => {
    setProductId(id);
  };

  useEffect(() => {
    loadProduct();
  }, [products, productId]);
  return (
    <div className="bg-zinc-100 ">
      <div className="flex justify-between px-32 bg-emerald-800">
        {data.map((d) => {
          return (
            <div className="flex py-2 px-4" key={d.category_id}>
              <button
                onClick={() => handlerSubmit(d.category_id)}
                className="text-white font-bold"
              >
                {d.type}
              </button>
            </div>
          );
        })}
      </div>
      <Main ismain={ismain} product={product} />
      <Container component={Box} className="py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold">{data[page - 1].type}</h2>
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
                    <img src="/img/product/product_1.png" />
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
  );
}