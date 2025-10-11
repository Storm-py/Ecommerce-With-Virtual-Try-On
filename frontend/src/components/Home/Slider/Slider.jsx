import React,{ useState } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"

const Slider = () => {
  const [index, setIndex] = useState(0)
  const slides = [
    {
      url: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/slider-01.jpg",
    },
    {
      url: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/slider-02.jpg",
    },
    {
      url: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/slider-03.jpg",
    },
  ]

  const nextSlide = () => {
    const isLastSlide = index === slides.length - 1
    const newIndex = isLastSlide ? 0 : index + 1
    setIndex(newIndex)
  }

  const prevSlide = () => {
    const isFirstSlide = index === 0
    const newIndex = isFirstSlide ? slides.length - 1 : index - 1
    setIndex(newIndex)
  }

  return (
    <div className="w-full max-w-[95vw] sm:max-w-[85vw] lg:max-w-[65vw] aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/9] flex justify-center items-center relative group m-auto px-2 sm:px-0">
      <div
        style={{ backgroundImage: `url(${slides[index].url})` }}
        className="w-full h-full rounded-lg sm:rounded-xl lg:rounded-2xl bg-center bg-cover duration-500"
      ></div>

      {/* Navigation Buttons */}
      <div
        className="absolute group-hover:block top-[50%] -translate-x-0 -translate-y-[50%] left-2 sm:left-3 lg:left-5 rounded-full p-1.5 sm:p-2 bg-black/70 hover:bg-black text-white cursor-pointer transition-all duration-200"
        onClick={prevSlide}
      >
        <FaAngleLeft size={16} className="sm:w-5 sm:h-5" />
      </div>

      <div
        className="absolute group-hover:block top-[50%] -translate-x-0 -translate-y-[50%] right-2 sm:right-3 lg:right-5 rounded-full p-1.5 sm:p-2 bg-black/70 hover:bg-black text-white cursor-pointer transition-all duration-200"
        onClick={nextSlide}
      >
        <FaAngleRight size={16} className="sm:w-5 sm:h-5" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
              index === slideIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
