export default function HeaderDetail(data) {
  return (
    <div className="section_grid_index">
      <div className="rounded-md relative overflow-hidden h-full">
        <span className="bg-black opacity-50 inset-0 absolute z-20"></span>
        <div>
          <img src={data.data.img} alt="" />
        </div>
        <div className="absolute bottom-8 z-20">
          <p className="text-white text-xl  px-12 font-semibold uppercase">
            {data.data.title}
          </p>
        </div>
      </div>
    </div>
  );
}
