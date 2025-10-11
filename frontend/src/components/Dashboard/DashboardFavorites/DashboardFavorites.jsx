import React,{ useState, useEffect } from "react"
import parse from 'html-react-parser'

const DashboardFavorites = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

 useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/favorites`,
          {
            method: "GET",
            credentials: "include"
          }
        );
        
        const result = await response.json();
        
        if (response.ok) {
          setFavorites(result.data || []);
        } else {
          console.error("Error fetching favorites:", result.message);
          setFavorites([]);
        }
      } catch (error) {
        console.error("Network error:", error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/remove-favorite/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setFavorites(favorites.filter((item) => item._id !== id))
      } else {
        const errorData = await response.json()
        console.error("Error removing favorite:", errorData.message)
      }
    } catch (error) {
      console.error("Network error:", error)
    }
  }

  return (
    <div className="min-h-screen w-full max-w-[60vw] p-2 sm:p-4 lg:p-6 overflow-y-auto">
      <h1 className="text-[#ff491f] text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-4 sm:mb-6 lg:mb-8">
        Your Favorite Items
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-[50vh] sm:h-[60vh] lg:h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-[#ff491f]"></div>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-10 sm:py-16 lg:py-20">
          <h3 className="text-xl sm:text-2xl text-gray-600 font-semibold">No favorites yet</h3>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Start adding items to your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {favorites.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-40 sm:h-48 overflow-hidden">
                <img
                  src={item.images[0].url || "https://via.placeholder.com/300"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{item.name}</h3>
                  <button
                    onClick={() => handleRemoveFavorite(item._id)}
                    className="text-[#ff491f] hover:text-red-700 transition-colors flex-shrink-0 ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-2">
                  {parse(item.description) || "No description available"}
                </p>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <button className="bg-[#ff491f] text-white px-3 sm:px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-sm sm:text-base w-full sm:w-auto">
                    Order Again
                  </button>
                  <span className="text-lg sm:text-xl font-bold text-[#ff491f] self-end sm:self-auto">
                    ${item.price?.toFixed(2) || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardFavorites
