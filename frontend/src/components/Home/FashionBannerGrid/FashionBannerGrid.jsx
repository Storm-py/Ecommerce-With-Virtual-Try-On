import { FaAngleRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import React from "react"

export default function FashionBannerGrid() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
        {/* Left Banner - Full Height */}
        <div className="relative bg-stone-100 rounded-lg overflow-hidden h-[400px] sm:h-[500px] lg:h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col h-full">
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">NEW SEASON</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 sm:mt-4 mb-2 max-w-[250px] sm:max-w-[300px] leading-tight">
              Big patterns are back in fashion
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 max-w-[250px] sm:max-w-[300px] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </p>
            <div className="">
              <Link href="#" className="inline-flex items-center text-xs sm:text-sm font-medium hover:underline">
                Shop Now <FaAngleRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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
        <div className="flex flex-col gap-2 sm:gap-4">
          {/* Top Right Banner */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-[190px] sm:h-[240px] lg:h-[290px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 flex flex-col h-full">
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">NEW SEASON</span>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mt-2 sm:mt-4 mb-2 max-w-[200px] sm:max-w-[300px] leading-tight">
                The latest men's trends this season
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 mb-2">Don't miss the opportunity.</p>
              <div className="">
                <Link href="#" className="inline-flex items-center text-xs sm:text-sm font-medium hover:underline">
                  Shop Now <FaAngleRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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
          <div className="relative bg-rose-100 rounded-lg overflow-hidden h-[190px] sm:h-[240px] lg:h-[290px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 flex flex-col h-full">
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">NEW SEASON</span>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mt-2 sm:mt-4 mb-2 max-w-[200px] sm:max-w-[300px] leading-tight">
                Show your fashion with summer shoes
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 mb-2">Don't miss the opportunity.</p>
              <div className="">
                <Link href="#" className="inline-flex items-center text-xs sm:text-sm font-medium hover:underline">
                  Shop Now <FaAngleRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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
