import React from 'react'
import HeroSlider from '../components/Home/Slider/Slider'
import Categories from '../components/Home/Categories/Categories'
import FashionBannerGrid from '../components/Home/FashionBannerGrid/FashionBannerGrid'
import BestSellerProducts from '../components/Home/BestSellerProducts/BestSellerProducts'
import DealOfTheWeek from '../components/Home/DealOfTheWeek/DealOfTheWeek'
import FeaturedProducts from '../components/Home/FeaturedProducts/FeaturedProducts'
import FashionSection from '../components/Home/FashioSection/FashionSection'
import Testomonials from '../components/Home/Testomonials/Testomonials'
import Articles from '../components/Home/Articles/Articles'

function Home() {
  return (
  <>
    <div className='flex justify-between py-8'>
     <div className='hidden lg:block'>
    <Categories/>
     </div>
    <HeroSlider/>
    </div>
    <FashionBannerGrid/>
    <BestSellerProducts/>
    <DealOfTheWeek/>
    <FeaturedProducts/>
    <FashionSection/>
    <Testomonials/>
    <Articles/>
  </>
  )
}

export default Home