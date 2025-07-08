import React from 'react'
import Card from '../../Card/Card';
import ReusableSlider from '../../ReusableSlider/ReusableSlider';

const FeaturedProducts = () => {
  const products = [
    {
      id: "1",
      title: "World Wide Cup Print T-Shirt",
      price: 23.99,
      originalPrice: 29.99,
      discount: 24,
      images: [
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/cup1.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/cup2.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/cup3.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/cup4.jpeg",
      ],
      rating: 4,
      reviews: 2,
    },
    {
      id: "2",
      title: "Sleeveless Ribbed Short Dress Black",
      originalPrice: 19.99,
      price: 14.99,
      isTrending: true,
      images: [
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/dressblack1-1.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/dressblack2.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/dressblack3.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/dressblack4.jpeg",
      ],
      rating: 5,
      reviews: 1,
    },
    {
      id: "3",
      title: "Slogan Hoodie With Label Detail",
      price: 11.99,
      originalPrice: 18.99,
      discount: 17,
      images: [
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/slogan1.jpg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/slogan2.jpg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/slogan3.jpg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/slogan4.jpg",
      ],
      rating: 5,
      reviews: 1,
    },
    {
      id: "4",
      title: "Basic Colored Sweatpants With Hems",
      price: 19.9,
      originalPrice: 25.9,
      discount: 14,
      images: [
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/pants1.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/pants2.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/pants3.jpeg",
        "https://klbtheme.com/clotya/wp-content/uploads/2022/04/pants4.jpeg",
      ],
      rating: 5,
      reviews: 1,
    },
  ];
  return (
    <div>
        <div className='flex items-center justify-between my-20'>
            <h1 className='w-1/3 text-3xl font-medium'>Featured Products</h1>
            <p className='text-[#9087ae] mx-auto w-2/3 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis pariatur cupiditate labore dolorem quia modi porro, vel, voluptatum veniam iusto voluptates? Veniam, sed officiis. Unde repellat magni doloribus</p>
        </div>
        
          <ReusableSlider yPosition="top-56" leftPosition="-left-8" rightPosition="-right-8">
            {products.map((product)=>(
              <div key={product.id} className="px-3">
                <Card {...product}/>
              </div>
            ))}
          </ReusableSlider>
        
    </div>
  )
}

export default FeaturedProducts