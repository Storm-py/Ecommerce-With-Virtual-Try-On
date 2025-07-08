// components/ProductFilters.js
import React, { useState } from 'react';
import { HiChevronUp, HiChevronDown, HiAdjustments } from 'react-icons/hi';

const ProductFilters = () => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    size: true,
    color: true,
    sale: true,
    brand: true,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#FFFF00'];
  const brands = ['Adidas', 'Nike', 'Puma', 'Gucci', 'Louis Vuitton', 'Balenciaga'];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded"
        >
          <HiAdjustments className="text-xl" />
          Filters
        </button>
      </div>

      
      <div
        className={`${
          showMobileFilters ? 'block' : 'hidden'
        } lg:block w-full lg:w-72 lg:pr-4 border-r border-gray-200 p-4 lg:p-0`}
      >
        {[
          { title: 'CATEGORIES', key: 'categories', content: ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Bags', 'Accessories'] },
          { title: 'PRICE', key: 'price', content: null },
          { title: 'SIZE', key: 'size', content: sizes },
          { title: 'COLOR', key: 'color', content: colors },
          { title: 'SALE', key: 'sale', content: null },
          { title: 'BRAND', key: 'brand', content: brands },
        ].map((section) => (
          <div key={section.key} className="border-b border-gray-200 py-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(section.key)}
            >
              <h3 className="font-semibold">{section.title}</h3>
              {openSections[section.key] ? <HiChevronUp /> : <HiChevronDown />}
            </div>

            {/* Section Content */}
            {openSections[section.key] && (
              <div className="mt-4">
                {section.key === 'categories' && (
                  <div className="space-y-2">
                    {section.content.map((category) => (
                      <div key={category} className="flex justify-between hover:text-primary">
                        <span className="text-sm cursor-pointer">{category}</span>
                        <span className="text-gray-400 text-xs">(0)</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.key === 'price' && (
                  <>
                    <input type="range" min="0" max="1000" className="w-full accent-black" />
                    <div className="flex justify-between text-sm mt-2">
                      <span>$0</span>
                      <span>$1000</span>
                    </div>
                  </>
                )}

                {section.key === 'size' && (
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <button key={size} className="border border-gray-200 p-2 text-sm hover:border-black">
                        {size}
                      </button>
                    ))}
                  </div>
                )}

                {section.key === 'color' && (
                  <div className="grid grid-cols-6 gap-2">
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}

                {section.key === 'sale' && (
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="sale" className="accent-black" />
                    <label htmlFor="sale" className="text-sm">
                      On Sale
                    </label>
                  </div>
                )}

                {section.key === 'brand' && (
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="accent-black" />
                          <span className="text-sm">{brand}</span>
                        </div>
                        <span className="text-gray-400 text-xs">(0)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductFilters;
