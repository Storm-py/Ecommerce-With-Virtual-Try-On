import React from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const ReusableSlider = ({
  children,
  yPosition = "top-1/2",
  leftPosition = "left-2",
  rightPosition = "right-2",
  slidesToShow = 4,
}) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true, 
    slides: {
      perView: slidesToShow,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: Math.min(3, slidesToShow), spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: Math.min(2, slidesToShow), spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 8 },
      },
    },
  });

  const NextArrow = () => (
    <div
      className={`absolute ${yPosition} ${rightPosition} z-10 cursor-pointer bg-white rounded-full p-1 shadow-md`}
      onClick={() => instanceRef.current?.next()}
    >
      <MdArrowForwardIos className="text-xl text-gray-600 hover:text-black" />
    </div>
  );

  const PrevArrow = () => (
    <div
      className={`absolute ${yPosition} ${leftPosition} z-10 cursor-pointer bg-white rounded-full p-1 shadow-md`}
      onClick={() => instanceRef.current?.prev()}
    >
      <MdArrowBackIosNew className="text-xl text-gray-600 hover:text-black" />
    </div>
  );

  return (
    <div className="relative px-8">
      <div ref={sliderRef} className="keen-slider">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="keen-slider__slide px-2">
            {child}
          </div>
        ))}
      </div>
      <PrevArrow />
      <NextArrow />
    </div>
  );
};

export default ReusableSlider;
