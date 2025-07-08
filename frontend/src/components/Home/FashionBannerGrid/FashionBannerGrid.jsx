import { FaAngleRight } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

export default function FashionBannerGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Banner - Full Height */}
        <div className="relative bg-stone-100 rounded-lg overflow-hidden h-[600px] md:h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-8 left-8 right-8 flex flex-col h-full">
            <span className="text-sm font-medium tracking-wider uppercase">NEW SEASON</span>
            <h2 className="text-4xl font-bold mt-4 mb-2 max-w-[300px]">Big patterns are back in fashion</h2>
            <p className="text-sm text-gray-700 max-w-[300px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </p>
            <div className="">
              <Link href="#" className="inline-flex items-center text-sm font-medium">
                Shop Now <FaAngleRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <img
            src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/banner-01.jpg"
            alt="Woman in blue beanie and plaid jacket"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Column - Two Banners */}
        <div className="flex flex-col gap-4">
          {/* Top Right Banner */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-[350px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute top-8 left-8 right-8 flex flex-col h-full">
              <span className="text-sm font-medium tracking-wider uppercase">NEW SEASON</span>
              <h2 className="text-3xl font-bold mt-4 mb-2 max-w-[300px]">The latest men's trends this season</h2>
              <p className="text-sm text-gray-700">Don't miss the opportunity.</p>
              <div className="">
                <Link href="#" className="inline-flex items-center text-sm font-medium">
                  Shop Now <FaAngleRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <img
              src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/banner-02.jpg"
              alt="Man in light hoodie"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Bottom Right Banner */}
          <div className="relative bg-rose-100 rounded-lg overflow-hidden h-[350px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute top-8 left-8 right-8 flex flex-col h-full">
              <span className="text-sm font-medium tracking-wider uppercase">NEW SEASON</span>
              <h2 className="text-3xl font-bold mt-4 mb-2 max-w-[300px]">Show your fashion with summer shoes</h2>
              <p className="text-sm text-gray-700">Don't miss the opportunity.</p>
              <div className="">
                <Link href="#" className="inline-flex items-center text-sm font-medium">
                  Shop Now <FaAngleRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <img
              src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/banner-03.jpg"
              alt="Platform summer sandals"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
