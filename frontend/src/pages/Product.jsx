import { useState, useEffect } from "react"

const Product = (props) => {
  const { product } = props
  const [showPopup, setShowPopup] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  

  
  const productImages = [product.image, product.image, product.image, product.image]

  const handleAddToCart = () => {
    addToCart(product.id, quantity)
    setShowPopup(true)

    setTimeout(() => {
      setShowPopup(false)
    }, 3000)
  }

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

 
  const discountPercentage = product.old_price
    ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
    : 0


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="product-display">
      <div className="product-display-container">
        <div className="product-gallery">
          <div className="product-thumbnails">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`thumbnail-item ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image || "/placeholder.svg"} alt={`${product.name} thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="product-main-image">
            <img src={productImages[selectedImage] || "/placeholder.svg"} alt={product.name} />
            {discountPercentage > 0 && <div className="discount-badge">-{discountPercentage}%</div>}
          </div>
        </div>

        <div className="product-details">
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-meta">
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={`star ${index < 4 ? "filled" : ""}`}>
                      {index < 4 ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="rating-count">(122 reviews)</span>
              </div>
              <div className="product-id">SKU: {product.id}</div>
            </div>

            <div className="product-pricing">
              <div className="price-current">Pkr {product.new_price}</div>
              {product.old_price && <div className="price-original">Pkr {product.old_price}</div>}
              {discountPercentage > 0 && <div className="price-saving">Save {discountPercentage}%</div>}
            </div>

            <div className="product-description">
              <p>
                This premium quality {product.name.toLowerCase()} is perfect for casual wear. Made with high-quality
                materials for comfort and durability, it features a modern design that complements any style.
              </p>
            </div>

            <div className="product-features">
              <h3>KEY FEATURES</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Comfortable fit for all-day wear</li>
                <li>Durable construction</li>
                <li>Easy to care for and maintain</li>
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>
                  +
                </button>
              </div>

              <div className="action-buttons">

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <span className="btn-icon">🛒</span>
                  <span>ADD TO CART</span>
                </button>
              </div>
            </div>

            <div className="product-additional-info">
              <div className="info-item">
                <span className="info-icon">🚚</span>
                <span>Free shipping on orders over Pkr 1000</span>
              </div>
              <div className="info-item">
                <span className="info-icon">↩️</span>
                <span>Easy 30-day returns</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🔒</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="cart-popup show">
          <div className="popup-content">
            <div className="popup-icon">✓</div>
            <div className="popup-message">
              <h3>ADDED TO CART!</h3>
              <p>
                {quantity} {quantity > 1 ? "items" : "item"} added to your cart
              </p>
            </div>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product