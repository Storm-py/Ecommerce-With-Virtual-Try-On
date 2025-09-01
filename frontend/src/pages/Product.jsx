
import React,{ useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Star, Heart, ShoppingCart, Minus, Plus, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import parse from 'html-react-parser'

export default function ProductPage({ apiBaseUrl = "http://localhost:4000" }) {
  const { id: productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", name: "" })
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("Product ID is required")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/v1/admin/get-product/${productId}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`)
        }

        const productData = await response.json()
        setProduct(productData.data.product)
        setError(null)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError(err instanceof Error ? err.message : "Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, apiBaseUrl])

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) return

      try {
        setReviewsLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/products/${productId}/reviews`)

        if (response.ok) {
          const reviewsData = await response.json()
          setReviews(reviewsData)
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
      } finally {
        setReviewsLoading(false)
      }
    }

    if (productId) {
      fetchReviews()
    }
  }, [productId, apiBaseUrl])

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + change)))
  }

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add to cart")
      }

      const result = await response.json()
      console.log("Product added to cart successfully:", result.message)
    } catch (err) {
      console.error("Error adding to cart:", err)
    }
  }

  const handleWishlistToggle = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/wishlist`, {
        method: isWishlisted ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update wishlist")
      }

      setIsWishlisted(!isWishlisted)
      const result = await response.json()
      console.log("Wishlist updated:", result.message)
    } catch (err) {
      console.error("Error updating wishlist:", err)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert("Please fill in all fields")
      return
    }

    try {
      setSubmittingReview(true)
      const response = await fetch(`${apiBaseUrl}/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newReview,
          productId: productId,
          createdAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      const result = await response.json()
      setReviews((prev) => [result, ...prev])
      setNewReview({ rating: 5, comment: "", name: "" })
      console.log("Review submitted successfully")
    } catch (err) {
      console.error("Error submitting review:", err)
      alert("Failed to submit review. Please try again.")
    } finally {
      setSubmittingReview(false)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const renderInteractiveStars = (rating, onRatingChange) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onRatingChange(i + 1)}
        className={`w-6 h-6 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
      >
        <Star className="w-full h-full" />
      </button>
    ))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-4">
            
            <div className="aspect-auto bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={
                  product.images[selectedImageIndex]?.url ||
                  `https://via.placeholder.com/600x600/f3f4f6/6b7280?text=${encodeURIComponent(product.name) || "/placeholder.svg"}`
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image.publicId || index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-auto bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? "border-emerald-600" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image.url || `https://via.placeholder.com/150x150/f3f4f6/6b7280?text=${index + 1}`}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          
          <div className="space-y-6">
            
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
              {product.category}
            </span>

            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>

            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">{renderStars(product.ratings.average)}</div>
              <span className="text-sm text-gray-600">
                {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
              </span>
            </div>

            
            <div className="text-3xl font-bold text-emerald-600">{formatPrice(product.price)}</div>

            
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm">
                {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
              </span>
            </div>

            
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 leading-relaxed">{parse(product.description)}</p>
            </div>

           
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

           
            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <button
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>

    
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-xs text-gray-600">100% protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-sm">Easy Returns</p>
                    <p className="text-xs text-gray-600">30-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="mt-16 max-w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  {renderInteractiveStars(newReview.rating, (rating) => setNewReview((prev) => ({ ...prev, rating })))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({newReview.rating} star{newReview.rating !== 1 ? "s" : ""})
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Share your thoughts about this product..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          
          <div className="space-y-6">
            {reviewsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={review._id || index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
