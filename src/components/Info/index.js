function Date(props) {
  let date = props.date.substr(0, 10);
  return <p className="section_text text-base flex-1 text-right">{date}</p>;
}
export default function Info(data) {
  return (
    <div className="flex flex-1 col-span-3" key={data.data.info_key}>
      <div className="rounded-md overflow-hidden mb-12 px-2 section_img flex items-center">
        <img src={data.data.img} alt="" className="h-full w-auto" />
      </div>
      <div className="section_info ml-6">
        <div className="flex justify-between items-center ">
          <h2 className="section_title font-medium mb-3 uppercase text-3xl ">
            {data.data.title}
          </h2>
          <Date date={data.data.date} />
        </div>
        <p className="text-base section_text">{data.data.description}</p>
      </div>
    </div>
  );
}
