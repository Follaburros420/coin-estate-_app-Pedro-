import React from "react";
import CardSlider from "./CardSlider";
import StyledImage from "./StyedImage";

export default function Slider() {
  return (
    <div className="px-6 ">
      <div className="mt-16 max-w-[1161px] mx-auto w-full ">
        <p className="text-28 sm:text-36 font-bold text-center ">
          ¿Qué Piensan nuestros usuarios?
        </p>
        <CardSlider />
        <div className="flex items-center justify-center mt-8 gap-8 ">
          <button className="swiperButtonPrev ">
            <StyledImage
              src="/assets/svg/SliderLeftArrow.svg"
              className="w-12 h-12 "
            />
          </button>
          <button className="swiperButtonNext ">
            <StyledImage
              src="/assets/svg/SliderRightArrow.svg"
              className="w-12 h-12 "
            />
          </button>
        </div>
      </div>
    </div>
  );
}
