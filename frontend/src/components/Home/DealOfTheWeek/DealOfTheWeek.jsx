import React, { useState, useEffect } from "react";

const DealOfTheWeek = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 37,
    hours: 7,
    minutes: 52,
    seconds: 41,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          ...timeLeft,
          minutes: timeLeft.minutes - 1,
          seconds: 59,
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({
          ...timeLeft,
          hours: timeLeft.hours - 1,
          minutes: 59,
          seconds: 59,
        });
      } else if (timeLeft.days > 0) {
        setTimeLeft({
          ...timeLeft,
          days: timeLeft.days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="w-full bg-gray-100 min-h-screen bg-cover" style={{backgroundImage:"url(https://klbtheme.com/clotya/wp-content/uploads/2022/04/banner-04.jpg)" , backgroundPosition: "40% center"}}>
      <div className="container mx-auto flex flex-col md:flex-row">
        {/* Product Image - Takes up more vertical space */}
        <div className="w-full md:w-3/5 h-[80vh] overflow-hidden">
          
        </div>

        {/* Product Details - Right side with proper spacing */}
        <div className="w-full md:w-2/5 px-8 py-16 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-sm uppercase tracking-wider text-gray-700 font-medium">
              DEAL OF THE WEEK
            </h3>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Roland Grand White
            <br />
            short checkered T-shirt
          </h1>

          <p className="text-gray-600 mb-10 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna.
          </p>

          {/* Countdown Timer - Matching the spacing and style */}
          <div className="flex items-center space-x-2 mb-10">
            <div className="text-center">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">{timeLeft.days}</span>
              <span className="text-sm text-gray-500 ml-1">d</span>
            </div>
            <span className="text-2xl text-gray-400">:</span>
            <div className="text-center">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-sm text-gray-500 ml-1">h</span>
            </div>
            <span className="text-2xl text-gray-400">:</span>
            <div className="text-center">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="text-sm text-gray-500 ml-1">m</span>
            </div>
            <span className="text-2xl text-gray-400">:</span>
            <div className="text-center">
              <span className="text-3xl md:text-4xl font-bold text-gray-900">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="text-sm text-gray-500 ml-1">s</span>
            </div>
          </div>

          {/* Shop Now Button - Matching the style */}
          <div className="mb-10">
            <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-8 border border-gray-300 transition duration-300">
              Shop Now
            </button>
          </div>

          {/* Limited Time Offer - Matching the style */}
          <div className="flex items-center text-sm">
            <span className="text-gray-700 mr-2">Limited time offer. The deal will expires on</span>
            <span className="bg-yellow-100  font-medium">June 11, 2025</span>
            <span className="ml-2 font-bold text-gray-900">HURRY UP!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealOfTheWeek;