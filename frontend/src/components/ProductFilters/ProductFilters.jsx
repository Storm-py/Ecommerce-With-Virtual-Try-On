import React,{ useState } from "react"
import { HiChevronUp, HiChevronDown, HiAdjustments } from "react-icons/hi"

const ProductFilters = ({ selectedCategories, onCategoryChange }) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    size: true,
    color: true,
    sale: true,
    brand: true,
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)


  const categories = ["Men", "Women", "Kids", "Shoes", "Accessories", "Bags"]

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((cat) => cat !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  return (
    <>
      <div className="lg:hidden flex justify-end p-2 sm:p-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-black text-white rounded text-sm sm:text-base"
        >
          <HiAdjustments className="text-lg sm:text-xl" />
          Filters
        </button>
      </div>

      <div
        className={`${
          showMobileFilters ? "block" : "hidden"
        } lg:block w-full lg:w-72 lg:pr-4 border-r border-gray-200 p-2 sm:p-4 lg:p-0`}
      >
        {[
          {
            title: "CATEGORIES",
            key: "categories",
            content: categories,
          },
          { title: "PRICE", key: "price", content: null },
        ].map((section) => (
          <div key={section.key} className="border-b border-gray-200 py-4 sm:py-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(section.key)}
            >
              <h3 className="font-semibold text-sm sm:text-base">{section.title}</h3>
              <div className="text-lg sm:text-xl">
                {openSections[section.key] ? <HiChevronUp /> : <HiChevronDown />}
              </div>
            </div>

            {/* Section Content */}
            {openSections[section.key] && (
              <div className="mt-3 sm:mt-4">
                {section.key === "categories" && (
                  <div className="space-y-2">
                    {section.content.map((category) => (
                      <div
                        key={category}
                        className={`flex justify-between items-center cursor-pointer p-2 rounded transition-colors ${
                          selectedCategories.includes(category) ? "bg-black text-white" : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        <span className="text-xs sm:text-sm">{category}</span>
                        <span
                          className={`text-xs ${selectedCategories.includes(category) ? "text-gray-300" : "text-gray-400"}`}
                        >
                          {selectedCategories.includes(category) ? "✓" : "(0)"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {section.key === "price" && (
                  <>
                    <input type="range" min="0" max="1000" className="w-full accent-black" />
                    <div className="flex justify-between text-xs sm:text-sm mt-2">
                      <span>$0</span>
                      <span>$1000</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductFilters
