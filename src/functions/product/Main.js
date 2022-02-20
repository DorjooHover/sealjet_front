import ProductDetail from '../../components/Product'
export default function Main(props) {
    const isMain = props.ismain;
    const product = props.product;
    if (isMain) {
      return <></>;
    } else {
      return <ProductDetail product={product} />;
    }
  }