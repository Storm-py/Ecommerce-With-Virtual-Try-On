import React,{ useState } from "react"
import { FaApple, FaGooglePlay, FaClock, FaPhone, FaEnvelope } from "react-icons/fa"
import { SiVisa, SiMastercard, SiPaypal, SiStripe, SiAmericanexpress } from "react-icons/si"

const Footer = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Subscribed with:", email)
    setEmail("")
  }

  return (
    <footer className="w-full">
     
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between">
          
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Get our emails for info on new items, sales and more.</h2>
            <p className="text-gray-300 mb-6">We'll email you a voucher worth £10 off your first order over £50.</p>
            <form onSubmit={handleSubmit} className="flex mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow p-3 text-black outline-none"
                required
              />
              <button type="submit" className="bg-white text-black px-6 py-3 font-medium">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-400">
              By subscribing you agree to our Terms & Conditions and Privacy & Cookies Policy.
            </p>
          </div>

          
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold mb-2">Need help?</h2>
            <div className="flex items-center mb-2">
              <p className="text-3xl font-bold">(+800) 1234 5678 90</p>
            </div>
            <div className="flex items-center mb-6">
              <FaClock className="mr-2" />
              <p>We are available 8:00am — 7:00pm</p>
            </div>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="border border-gray-600 rounded-md p-2 inline-flex items-center">
                <FaApple className="h-6 w-6 mr-2" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="border border-gray-600 rounded-md p-2 inline-flex items-center">
                <FaGooglePlay className="h-6 w-6 mr-2" />
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Shopping App: Try our View in Your Room feature, manage registries and save payment info.
            </p>
          </div>
        </div>
      </div>

      
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            <div className="lg:col-span-1">
              <img className="w-40 m-2" src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo.png" alt="" />
              <p className="text-gray-600 mb-4">
                Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis in
                termapol.
              </p>
              <div className="flex items-center text-gray-600">
                <FaPhone className="mr-2" />
                <span>(+800) 1234 5678 90</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="mr-2" />
                <span>info@example.com</span>
              </div>
            </div>

            
            <div>
              <h3 className="text-lg font-bold mb-4">Information</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Returns Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Dropshipping
                  </a>
                </li>
              </ul>
            </div>

            
            <div>
              <h3 className="text-lg font-bold mb-4">Account</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    My Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    My Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Account details
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Track My Orders
                  </a>
                </li>
              </ul>
            </div>

            
            <div>
              <h3 className="text-lg font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Affiliate
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Bestsellers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Discount
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Latest Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Sale Products
                  </a>
                </li>
              </ul>
            </div>

            
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Bags
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Outerwear
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Shoes
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                Copyright 2025 © Clotya WordPress Theme. All right reserved. Powered by KLBTheme.
              </p>
            </div>
            <div className="flex space-x-6">
              <SiVisa className="h-6 w-10 text-blue-600" />
              <SiMastercard className="h-6 w-10 text-red-500" />
              <SiAmericanexpress className="h-6 w-10 text-blue-400" />
              <SiPaypal className="h-6 w-10 text-blue-800" />
              <SiStripe className="h-6 w-10 text-purple-600" />
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-black text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-black text-sm">
                Terms and Conditions
              </a>
              <a href="#" className="text-gray-600 hover:text-black text-sm">
                Returns Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
