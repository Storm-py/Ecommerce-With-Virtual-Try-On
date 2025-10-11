
import React from 'react';
import ProductFilters from '../components/ProductFilters/ProductFilters';
import Card from '../components/Card/Card';

const Shop = () => {
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
    {
      id: "5",
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
      id: "6",
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
      id: "7",
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
      id: "8",
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
    {
      id: "9",
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
      id: "10",
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
      id: "11",
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
      id: "12",
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        {/* Filters Sidebar */}
        <ProductFilters />
        
        {/* Product Grid */}
        <div className="flex-1 pl-8 relative">
          {/* Your product grid content here */}
          <h1 className='absolute left-20 top-16 text-4xl '>Plus-Size Styles for <br /> Every Season</h1>
          <p className='absolute left-20 top-40 text-md text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing <br /> Velit quaerat ratione adipisci.</p>
          <img src="https://klbtheme.com/clotya/wp-content/uploads/2022/05/banner-26.jpg" alt="" />
          <div className="grid grid-cols-4 gap-4">
            {products.map((product)=>(
              <div key={product.id} className="px-3 py-4">
                <Card {...product} height='27' width='52' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;



