import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Star } from "lucide-react";
import ReusableSlider from "../../ReusableSlider/ReusableSlider";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      text: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan facilisis.",
      author: "Teresa Holland",
      rating: 5,
    },
    {
      id: 2,
      text: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan facilisis.",
      author: "Scarlett Edwards",
      rating: 3,
    },
    {
      id: 3,
      text: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan facilisis.",
      author: "Teresa Holland",
      rating: 4,
    },
  ];

  const brands = [
    { id: 1, name: "MARNI", logo: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo-1.png" },
    { id: 2, name: "AWAKEN", logo: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo-5.png" },
    { id: 3, name: "GENITH", logo: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo-8.png" },
    { id: 4, name: "FRAME", logo: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo-2.png" },
    { id: 5, name: "HAYDEN", logo: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo-4.png" },
    {id: 6, name: "PHILLIP LIM", logo: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo-3.png"},
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Latest Buyers Reviews</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
        </div>

        <div className="px-10">
          <ReusableSlider slidesToShow={3} yPosition="top-15" leftPosition="-left-10" rightPosition="-right-10">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="text-center p-6 border-l-1 border-gray-100 rounded-lg mx-4"
              >
                <div className="flex justify-center mb-4 text-red-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="mb-6">{review.text}</p>
                <p className="text-gray-400">{review.author}</p>
              </div>
            ))}
          </ReusableSlider>
        </div>
      </div>

      
      <div className="py-10 border-t border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand) => (
            <div key={brand.id} className="flex justify-center">
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="h-20 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
