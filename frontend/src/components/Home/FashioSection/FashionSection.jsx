import React from "react"
import { FiArrowRight } from "react-icons/fi"
import ReusableSlider from "../../ReusableSlider/ReusableSlider";


const FashionSection = () => {
    const categories = [
        {
          name: "Men",
          image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/tshirt.jpg",
        },
        {
          name: "Women",
          image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/jacket.jpg",
        },
        {
          name: "Bags",
          image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/bag-3.jpg",
        },
        {
          name: "Belts",
          image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/pants.jpg",
        },
        {
          name: "Shoes",
          image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/shoes-2.jpg",
        },
        {
          name: "Outerwear",
          image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/coats-2.jpg",
        },
      ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        <div className="relative overflow-hidden bg-gray-100 h-[350px]">
          <img src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/banner-05.jpg" alt="Jewelry model" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center p-8">
            <span className="text-sm font-medium tracking-wider uppercase mb-2">NEW SEASON</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
              Show your best <br /> jewellery of your life
            </h2>
            <p className="text-gray-700 mb-6">Don't miss the opportunity.</p>
            <button className="flex items-center text-sm font-medium">
              Shop Now <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>

       
        <div className="relative overflow-hidden bg-amber-50 h-[350px]">
          <img src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/banner-06.jpg" alt="Fashion model" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center p-8">
            <span className="text-sm font-medium tracking-wider uppercase mb-2">NEW SEASON</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
              Big patterns are <br /> back in fashion
            </h2>
            <p className="text-gray-700 mb-6">Don't miss the opportunity.</p>
            <button className="flex items-center text-sm font-medium">
              Shop Now <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      
      <div className="mb-16">
        <div className="flex justify-between items-end mb-10">
          <div className="flex items-center justify-start gap-6">
            <h3 className="text-2xl font-bold">Best for your categories</h3>
            <p className="text-gray-500 text-sm"> <span className="font-medium">23 categories </span>belonging to a total of <span className="font-medium"> 34,592 products</span></p>
          </div>
        </div>

        {/* Categories Carousel */}
        <div>
          <ReusableSlider yPosition="top-32" leftPosition="-left-10" rightPosition="-right-10" slidesToShow={6}>
            {categories.map((category) => (
              <div key={category.name} className="group cursor-pointer">
                <div className="bg-gray-100 aspect-square mb-3 overflow-hidden mx-1">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-center font-medium">{category.name}</h4>
              </div>
            ))}
          </ReusableSlider>
        </div>
      </div>
    </div>
  )
}

export default FashionSection
