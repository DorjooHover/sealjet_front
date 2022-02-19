export default function Info(data) {
  return (
    <div className="flex flex-1 col-span-3" key={data.data.info_key}>
      <div className="rounded-md overflow-hidden mb-12 px-2 section_img ">
        <img src="/img/product/product_1.jpg" alt="" />
      </div>
      <div className="section_info">
        <div className="flex justify-between items-center ">
          <h2 className="section_title font-medium mb-3 uppercase text-3xl ">
            {data.data.title}
          </h2>
          <p className="section_text text-base flex-1">{data.data.date} </p>
        </div>
        <p className="text-base section_text">
          {data.data.description}
        </p>
      </div>
    </div>
  );
}
