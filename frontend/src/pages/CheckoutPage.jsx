import React,{ useState } from "react"

export default function PaymentDetails() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith("billing.")) {
      const field = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }))
  }

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value)
    setFormData((prev) => ({
      ...prev,
      expiryDate: formatted,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (paymentMethod === "credit-card") {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number"
      }

      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Please enter expiry date in MM/YY format"
      }

      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = "Please enter a valid CVV"
      }

      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = "Please enter cardholder name"
      }

      // Billing address validation
      if (!formData.billingAddress.street.trim()) {
        newErrors["billing.street"] = "Street address is required"
      }
      if (!formData.billingAddress.city.trim()) {
        newErrors["billing.city"] = "City is required"
      }
      if (!formData.billingAddress.state.trim()) {
        newErrors["billing.state"] = "State is required"
      }
      if (!formData.billingAddress.zipCode.trim()) {
        newErrors["billing.zipCode"] = "ZIP code is required"
      }
      if (!formData.billingAddress.country.trim()) {
        newErrors["billing.country"] = "Country is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      const paymentData = {
        paymentMethod,
        ...(paymentMethod === "credit-card" && {
          cardDetails: {
            cardNumber: formData.cardNumber.replace(/\s/g, ""),
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            cardholderName: formData.cardholderName,
            billingAddress: formData.billingAddress,
          },
        }),
      }

      // Here you would typically send the data to your backend
      console.log("Payment data:", paymentData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Payment details saved successfully!")
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Error processing payment. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-scree ">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border">
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold text-center">Payment Details</h1>
            <p className="text-gray-600 text-center mt-2">Choose your payment method and enter your details</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-4">
                <label className="text-base font-semibold block">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                    <input
                      type="radio"
                      id="credit-card"
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                        <span>Credit Card</span>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">₹</span>
                        </div>
                        <span>Cash on Delivery</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Credit Card Details */}
              {paymentMethod === "credit-card" && (
                <div className="space-y-6">
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Card Information</h3>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            value={formData.expiryDate}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryDate ? "border-red-500" : "border-gray-300"}`}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
                          />
                          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          id="cardholderName"
                          name="cardholderName"
                          type="text"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardholderName ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Billing Address</h3>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="billing.street" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          id="billing.street"
                          name="billing.street"
                          type="text"
                          value={formData.billingAddress.street}
                          onChange={handleInputChange}
                          placeholder="123 Main Street"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors["billing.street"] ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors["billing.street"] && (
                          <p className="text-red-500 text-sm mt-1">{errors["billing.street"]}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="billing.city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            id="billing.city"
                            name="billing.city"
                            type="text"
                            value={formData.billingAddress.city}
                            onChange={handleInputChange}
                            placeholder="New York"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors["billing.city"] ? "border-red-500" : "border-gray-300"}`}
                          />
                          {errors["billing.city"] && (
                            <p className="text-red-500 text-sm mt-1">{errors["billing.city"]}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="billing.state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            id="billing.state"
                            name="billing.state"
                            type="text"
                            value={formData.billingAddress.state}
                            onChange={handleInputChange}
                            placeholder="NY"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors["billing.state"] ? "border-red-500" : "border-gray-300"}`}
                          />
                          {errors["billing.state"] && (
                            <p className="text-red-500 text-sm mt-1">{errors["billing.state"]}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="billing.zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            id="billing.zipCode"
                            name="billing.zipCode"
                            type="text"
                            value={formData.billingAddress.zipCode}
                            onChange={handleInputChange}
                            placeholder="10001"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors["billing.zipCode"] ? "border-red-500" : "border-gray-300"}`}
                          />
                          {errors["billing.zipCode"] && (
                            <p className="text-red-500 text-sm mt-1">{errors["billing.zipCode"]}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="billing.country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <input
                            id="billing.country"
                            name="billing.country"
                            type="text"
                            value={formData.billingAddress.country}
                            onChange={handleInputChange}
                            placeholder="United States"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors["billing.country"] ? "border-red-500" : "border-gray-300"}`}
                          />
                          {errors["billing.country"] && (
                            <p className="text-red-500 text-sm mt-1">{errors["billing.country"]}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* COD Information */}
              {paymentMethod === "cod" && (
                <div className="border-t pt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800">Cash on Delivery Selected</h3>
                        <p className="text-green-700 text-sm">
                          You will pay in cash when your order is delivered to your address.
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-green-700">
                      <p>• Please keep the exact amount ready</p>
                      <p>• Additional COD charges may apply</p>
                      <p>• Payment must be made to the delivery person</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="border-t pt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-lg font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : paymentMethod === "credit-card" ? (
                    "Save Payment Details"
                  ) : (
                    "Confirm Cash on Delivery"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
