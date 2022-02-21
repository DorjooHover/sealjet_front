import { useRouter } from "next/router";
import Link from "next/link";
function Order(props) {
  const id = props.materialId;
  const product = props.product;
  if (id !== undefined) {
    return (
      <div className="pt-12 width m-auto px-20" key={product[0].product_id}>
        <div className="flex mb-10">
          <div className="rounded-lg overflow-hidden bg-white border-zinc-300 border-solid border ">
            <img src="/img/product/product_1.png" />
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

        <table>
          <thead>
            <tr>
              <td className="uppercase">Температур</td>
              <td className="uppercase">Шилжилтийн хурд</td>
              <td className="uppercase">даралт</td>
              <td className="uppercase">материал</td>
            </tr>
          </thead>
          <tbody>
            {product.map((data) => {
              return (
                <tr key={data.product_detail_id}>
                  <td className="">{data.temperature}</td>
                  <td className="">{data.speed}</td>
                  <td className="">{data.pressure}</td>
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
        <div className="flex mb-10">
          <div className="rounded-lg overflow-hidden bg-white border-zinc-300 border-solid border ">
            <img src="/img/product/product_1.png" />
          </div>
          <div className="ml-10">
            <h2 className="font-semibold text-3xl mb-3">{product[0].title}</h2>
            <p className="">{product[0].description}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <td className="uppercase">Температур</td>
              <td className="uppercase">Шилжилтийн хурд</td>
              <td className="uppercase">даралт</td>
              <td className="uppercase">материал</td>
            </tr>
          </thead>
          <tbody>
            {product.map((data) => {
              return (
                <tr key={data.product_detail_id}>
                  <td className="">{data.temperature}</td>
                  <td className="">{data.speed}</td>
                  <td className="">{data.pressure}</td>
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
