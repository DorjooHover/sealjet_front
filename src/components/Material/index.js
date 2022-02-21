import { useRouter } from "next/router";
import { useState } from "react";
export default function Material(data) {
  const router = useRouter(1);

  return (
    <div className="flex mb-12">
      <div className="rounded-md overflow-hidden  px-2 section_img">
        <img src="/img/product/product_1.jpg" alt="" />
      </div>
      <div className="ml-12 relative h-full">
        <div className="flex justify-between items-center ">
          <h2 className="section_title font-medium mb-3 uppercase text-3xl ">
            {data.data.name}
          </h2>
          <p className="section_text text-base flex-1">{data.data.date}</p>
        </div>
        <p className="text-base section_text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          nisi cupiditate eius! Similique, cum debitis.
        </p>
        <button
          className="absolute bottom-0 right-0 z-10 mt-6 py-2 rounded-full bg text-white font-bold w-48"
          onClick={() =>
            router.push({
              pathname: "/product",
              query: { material_id: data.data.material_id, ismain: false },
            })
          }
        >
          Сонгох
        </button>
      </div>
    </div>
  );
}
