import React from 'react'
import { useState } from 'react';
import { FaAngleRight,FaAngleLeft } from "react-icons/fa";

const Slider = () => {
    const [index, setIndex] = useState(0)
    const slides=[
        {
            url:"https://klbtheme.com/clotya/wp-content/uploads/2022/04/slider-01.jpg"
        },
        {
            url:"https://klbtheme.com/clotya/wp-content/uploads/2022/04/slider-02.jpg"
        },
        {
            url:"https://klbtheme.com/clotya/wp-content/uploads/2022/04/slider-03.jpg"
        },
    ]
    const nextSlide=()=>{
        const isLastSlide=index===slides.length-1
        const newIndex=isLastSlide? 0 :index+1
        setIndex(newIndex)
    }
    // const goToSlide(currentIndex){
    //     setIndex(currentIndex)

    // }
    const prevSlide=()=>{
        const isFirstSlide= index===0
        const newIndex=isFirstSlide? slides.length-1:index-1
        setIndex(newIndex)
    }
  return (

    <div className='w-[65vw] aspect-[16/9] flex justify-center items-center relative group m-auto'>
        <div style={{backgroundImage:`url(${slides[index].url})`}} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
        <div className='absolute group-hover:block top-[50%] -translate-x-0 -translate-y-[50%] left-5 rounded-full p-2 bg-black text-white cursor-pointer'onClick={prevSlide}><FaAngleLeft size={20} /></div>
        <div className='absolute group-hover:block top-[50%] -translate-x-0 -translate-y-[50%] right-5 rounded-full p-2 bg-black text-white cursor-pointer' onClick={nextSlide}><FaAngleRight size={20} /></div>

    </div>
  )
}

export default Slider