import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
function Undsen_salinik(props) {
  let product = props.product[0].undsen_salinik;
  if (product !== null) {
    return (
      <td className="font-medium text-base table_text px-1">Үндсэн сальник</td>
    );
  } else {
    return <></>;
  }
}
function Tulah_tsagirag(props) {
  let product = props.product[0].tulah_tsagirag;
  if (product !== null) {
    return (
      <td className="font-medium text-lg table_text px-1">Туалах цагираг</td>
    );
  } else {
    return <></>;
  }
}
function Gogtsoo_rezin(props) {
  let product = props.product[0].gogtsoo_rezin;
  if (product !== null) {
    return (
      <td className="font-medium text-lg table_text px-1">Гогцоо резин</td>
    );
  } else {
    return <></>;
  }
}
function Erchimjuulegch(props) {
  let product = props.product[0].erchimjuulegch;
  if (product !== null) {
    return (
      <td className="font-medium text-lg table_text px-1">Эрчимжүүлэгч</td>
    );
  } else {
    return <></>;
  }
}
function Zahiin_tulah(props) {
  let product = props.product[0].zahiin_tulah;
  if (product !== null) {
    return <td className="font-medium text-lg table_text px-1">Захын тулах</td>;
  } else {
    return <></>;
  }
}
function Order(props) {
  const id = props.materialId;
  const product = props.product;
  if (id !== undefined) {
    return (
      <div
        className="pt-12 width m-auto px-20 product_detail"
        key={product[0].product_id}
      >
        <div className="flex mb-10 product_detail_main">
          <div className="rounded-lg overflow-hidden flex items-center bg-white border-zinc-300 border-solid border ">
            {/* <Image
              src="/img/product/product_1.png"
              alt="product"
              width="200"
              height="140"
              layout="responsive"
            /> */}
            <img src="/img/product/product_1.png" alt="product" />
          </div>
          <div className="ml-10 relative">
            <h2 className="font-semibold text-3xl mb-3">{product[0].title}</h2>
            <p className="">{product[0].description}</p>
            <div className="absolute bottom-0 right-0">
              <Link href="/material">
                <a className="py-2 rounded-full bg text-white font-bold px-6 mr-4">
                  Буцах
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/order/order",
                  query: { material_id: id, product_id: product[0].product_id },
                }}
              >
                <a className="py-2 rounded-full bg text-white font-bold px-6 mr-4">
                  Сонгох
                </a>
              </Link>
            </div>
          </div>
        </div>

        <table className="w-full product_detail_add">
          <thead>
            <tr>
              <td className="uppercase px-2 table_text text-xl font-semibold">
                Температур
              </td>
              <td className="uppercase px-2 table_text text-xl font-semibold">
                Шилжилтийн хурд
              </td>
              <td className="uppercase px-2 table_text text-xl font-semibold">
                даралт
              </td>
              <td
                className="uppercase px-2 text-center table_text text-xl font-semibold"
                colSpan="5"
              >
                материал
              </td>
            </tr>
            <tr>
              <td className="h-6 px-2"></td>
              <td className="h-6 px-2"></td>
              <td className="h-6 px-2"></td>
              <Undsen_salinik product={product} />
              <Tulah_tsagirag product={product} />
              <Gogtsoo_rezin product={product} />
              <Erchimjuulegch product={product} />
              <Zahiin_tulah product={product} />
            </tr>
          </thead>
          <tbody>
            {product.map((data) => {
              return (
                <tr key={data.product_detail_id}>
                  <td className="">{data.temperature}</td>
                  <td className="">{data.speed}</td>
                  <td className="">{data.pressure}</td>
                  <td className="">{data.undsen_salinik}</td>
                  <td className="">{data.tulah_tsagirag}</td>
                  <td className="">{data.gogtsoo_rezin}</td>
                  <td className="">{data.erchimjuulegch}</td>
                  <td className="">{data.zahiin_tulah}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="pt-12 width m-auto px-20" key={product[0].product_id}>
        <div className="flex mb-10 product_detail_main">
          <div className="rounded-lg overflow-hidden bg-white border-zinc-300 border-solid border ">
            {/* <Image
              src="/img/product/product_1.png"
              alt="product"
              width="200"
              height="140"
              layout="responsive"
            /> */}
            <img src="/img/product/product_1.png" alt="product" />
          </div>
          <div className="ml-10">
            <h2 className="font-semibold text-3xl mb-3">{product[0].title}</h2>
            <p className="">{product[0].description}</p>
          </div>
        </div>

        <table className="w-full product_detail_add">
          <thead>
            <tr>
              <td className="uppercase table_text text-xl font-semibold">
                Температур
              </td>
              <td className="uppercase table_text text-xl font-semibold">
                Шилжилтийн хурд
              </td>
              <td className="uppercase table_text text-xl font-semibold">
                даралт
              </td>
              <td
                className="uppercase text-center table_text text-xl font-semibold"
                colSpan="5"
              >
                материал
              </td>
            </tr>
            <tr>
              <td className="h-6"></td>
              <td className="h-6"></td>
              <td className="h-6"></td>
              <Undsen_salinik product={product} />
              <Tulah_tsagirag product={product} />
              <Gogtsoo_rezin product={product} />
              <Erchimjuulegch product={product} />
              <Zahiin_tulah product={product} />
            </tr>
          </thead>
          <tbody>
            {product.map((data) => {
              return (
                <tr key={data.product_detail_id}>
                  <td className="">{data.temperature}</td>
                  <td className="">{data.speed}</td>
                  <td className="">{data.pressure}</td>
                  <td className="">{data.undsen_salinik}</td>
                  <td className="">{data.tulah_tsagirag}</td>
                  <td className="">{data.gogtsoo_rezin}</td>
                  <td className="">{data.erchimjuulegch}</td>
                  <td className="">{data.zahiin_tulah}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default function ProductDetail({ product, materialId }) {
  return <Order product={product} materialId={materialId} />;
}
