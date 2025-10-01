import React from 'react'
import SliderLib from 'react-slick';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReusableSlider = ({
  children,
  yPosition = "top-1/2",
  leftPosition = "left-2",
  rightPosition = "right-2",
  slidesToShow = 4
}) => {
  const NextArrow = ({ onClick }) => (
    <div className={`absolute ${yPosition} ${rightPosition} z-10 cursor-pointer bg-white rounded-full p-1 shadow-md`} onClick={onClick}>
      <MdArrowForwardIos className="text-xl text-gray-600 hover:text-black" />
    </div>
  );
  
  const PrevArrow = ({ onClick }) => (
    <div className={`absolute ${yPosition} ${leftPosition} z-10 cursor-pointer bg-white rounded-full p-1 shadow-md`} onClick={onClick}>
      <MdArrowBackIosNew className="text-xl text-gray-600 hover:text-black" />
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, slidesToShow),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToScroll: 1,
          slidesToShow: Math.min(2, slidesToShow),
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
  };
  
  return (
    <div className="relative px-8">
      <SliderLib {...sliderSettings}>
        {React.Children.map(children, (child) => (
          <div className="px-2 focus:outline-none">
            {child}
          </div>
        ))}
      </SliderLib>
    </div>
  );
}

export default ReusableSlider;