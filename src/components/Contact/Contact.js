import Maps from "./Maps";
export default function Contact() {
  return (
    <div className="contact relative">
      <div className="flex py-16 contact_container justify-between">
        <div className="px-28 py-14 address">
          <h2 className="text-3xl text-white font-semibold mb-4">
            Хаяг байршил:
          </h2>
          <p className="text-xl text-white">
            109-2, 13th microregion, Narnii zam, 25th khoroo, Улаанбаатар 13374
          </p>
        </div>
        <div className="flex justify-between px-28 img">
          <div className="h-96">
            <img src="/img/sealjet.png" className="h-full" />
          </div>
          {/* <Maps /> */}
        </div>
      </div>
      <span className="contact_ceil absolute top-0 w-full h-6 z-10"></span>
      <span className="contact_box_1 absolute left-0 z-20"></span>
      <span className="contact_box_2 absolute z-20"></span>
      <span className="contact_box_3 absolute "></span>
      <span className="contact_box_4 absolute "></span>
      <span className="contact_box_5 absolute z-20"></span>
      <span className="contact_box_6 absolute "></span>
    </div>
  );
}
