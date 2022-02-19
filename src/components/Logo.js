import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
// import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export default function Logo() {
  return (
    <Splide
      options={{
        rewind: true,
        type: "loop",
        gap: "2rem",
        perPage: 7,
        autoScroll: {
          speed: 2,
        },
      }}
    >
      <SplideSlide>
        <div className="rounded-xl overflow-hidden flex justify-center w-24">
          <img src="/img/logos/apu.png" alt="" />
        </div>
      </SplideSlide>
    </Splide>
  );
}
