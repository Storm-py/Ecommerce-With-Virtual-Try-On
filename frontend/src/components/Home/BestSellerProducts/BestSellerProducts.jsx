import React from "react";
import Card from "../../Card/Card";
import ReusableSlider from "../../ReusableSlider/ReusableSlider";


const BestSellerProducts = () => {
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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Best Seller Products</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <ReusableSlider yPosition="top-56" leftPosition="-left-8" rightPosition="-right-8">
        
        {products.map((product) => (
          <div key={product.id} className="px-3">
            <Card {...product} />
          </div>
        ))}
        
      </ReusableSlider>
    </div>
  );
};

export default BestSellerProducts;
