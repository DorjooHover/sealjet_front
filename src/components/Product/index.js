export default function ProductDetail({product}) {
    return (
        <div className="pt-12 width m-auto px-20">
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
    )
}