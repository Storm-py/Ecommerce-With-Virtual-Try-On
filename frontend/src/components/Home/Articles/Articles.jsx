import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const LatestNewsSection = () => {
  const newsArticles = [
    {
      id: 1,
      image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/blog-4-700x517.jpg", 
      category: "COLLECTION",
      date: "25 Apr 2022",
      title: "The Best Products That Shape Fashion",
      description:
        "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
      url: "#"
    },
    {
      id: 2,
      image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/blog-5-700x517.jpg", 
      category: "FASHION",
      date: "25 Apr 2022",
      title: "New Finds From Tuckernuck",
      description:
        "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
      url: "#"
    },
    {
      id: 3,
      image: "https://klbtheme.com/clotya/wp-content/uploads/2022/04/blog-6-700x517.jpg", 
      category: "CLOTHING",
      date: "25 Apr 2022",
      title: "Sunset Sets From Saks",
      description:
        "Donec rhoncus quis diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros",
      url: "#"
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Latest News</h2>
        <p className="text-gray-500 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra vel facilisis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsArticles.map((article) => (
          <article key={article.id} className="group">
            <a href={article.url} className="block">
              <div className="mb-5 overflow-hidden">
                <img
                  src={article.image || "https://via.placeholder.com/500x300"}
                  alt={article.title}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mb-3 flex items-center text-sm text-gray-500 uppercase">
                <span className="font-medium">{article.category}</span>
                <span className="mx-2">—</span>
                <span>{article.date}</span>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-gray-700 transition-colors">{article.title}</h3>

              <p className="text-gray-600">{article.description}</p>
              
              <div className="mt-4 flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Read More <FiArrowRight className="ml-2" />
              </div>
            </a>
          </article>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a 
          href="/blog" 
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          View All Articles <FiArrowRight className="ml-2" />
        </a>
      </div>
    </section>
  );
};

export default LatestNewsSection;