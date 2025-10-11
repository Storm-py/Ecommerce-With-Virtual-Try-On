import React, { useRef, useState } from "react";
import { PiStarFill } from "react-icons/pi";

const Card = ({
  name,
  height='36',
  width='72',
  price,
  originalPrice = 42,
  isTrending='true',
  discount ='12%',
  images,
  reviews,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = imageContainerRef.current;
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const sectionWidth = rect.width / images.length;

    const index = Math.min(
      images.length - 1,
      Math.floor(offsetX / sectionWidth)
    );

    setCurrentIndex(index);
  };

  const resetImage = () => {
    setCurrentIndex(0);
  };
  return (
    <div className={` h-[${height}vw] w-${width} rounded-lg overflow-hidden cursor-pointer relative shadow-2xs`}>
      {isTrending? <h1 className="text-[0.7vw] bg-white absolute m-3 py-0.5 px-1 rounded">TRENDING</h1>:<h1 className="text-green-400 font-bold bg-white absolute m-3 text-xs px-1 rounded">{discount}%</h1>}
      <img
        src={images[currentIndex]?.url}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetImage}
        ref={imageContainerRef}
        alt=""
      />
      <div className="flex items-center justify-between cursor-pointer">
        {images.map((_,idx) => (
          <div
            key={idx}
            className={`h-1 w-16 m-1 rounded-lg transition-all duration-200 ${
              currentIndex === idx ? "bg-[#b2b2b2]" : "bg-[#e5e5e5]"
            }`}
          ></div>
        ))}
      </div>

      <div className="m-2 flex items-center justify-start gap-2">
        <PiStarFill className="fill-yellow-500" />
        <h3 className="text-xs font-medium">
          {reviews > 1 ? " reviews" : " review"}
        </h3>
      </div>
      <div className="m-2 h-12">
        <h1>{name}</h1>
      </div>
      <div className="flex items-center justify-start gap-2 mx-2">
        <div>
          <h3 className="line-through text-slate-400">${originalPrice}</h3>
        </div>
        <div>
          <h3>${price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;