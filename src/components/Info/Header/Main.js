export default function Main(data) {

  return (
    <div className="section_grid_main">
      <div className="rounded-md relative overflow-hidden h-full">
        <span className="bg-black opacity-50 inset-0 absolute z-20"></span>
        <img src="./img/product/product_1.jpg" alt="" />
        <div className="absolute bottom-4 z-20">
          <p className="text-white text-base px-8 font-semibold uppercase">
            {data.data.title}
          </p>
        </div>
      </div>
    </div>
  );
}
