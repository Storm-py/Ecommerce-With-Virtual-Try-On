import React,{ useRef, useState } from "react"

const DashboardAccountDetails = () => {
  const imageRef = useRef()
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(
    "https://tse2.mm.bing.net/th/id/OIP.ff2Bto4-7hxRZS5FndS8bgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  )
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    email: "",
    fullName: "",
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewUrl(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const uploadImage = async () => {
    if (!image) return

    try {
      const fd = new FormData()
      fd.append("profileImage", image)

      const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/update-profile-image`, {
        method: "PATCH",
        credentials: "include",
        body: fd,
      })

      if (response.ok) {
        console.log("Image uploaded successfully")
      }
    } catch (error) {
      console.error("Image upload error:", error)
    }
  }

  const handleFormInput = (e) => {
    const { name, value } = e.target
    setAccountDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleDashboardAccountDetails = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/update-account-details`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(accountDetails),
      })

      if (response.ok) {
        console.log("Account details updated")
      }
    } catch (error) {
      console.error("Account update error:", error)
    }
  }

  return (
    <div className="min-h-screen max-w-full w-[60vw] mx-auto p-4 sm:p-6 lg:p-8 shadow-2xl">
      <h1 className="text-[#ff491f] text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-6 sm:mb-8">
        Please Update Your Details
      </h1>
      <div
        className="flex items-center justify-center cursor-pointer my-4 sm:my-6"
        onClick={() => imageRef.current.click()}
      >
        <img
          src={previewUrl || "/placeholder.svg"}
          alt=""
          className="h-24 w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36 rounded-full object-cover"
        />
        <input type="file" ref={imageRef} onChange={handleImageChange} className="hidden" />
      </div>
      {image && (
        <div className="flex items-center justify-center">
          <button onClick={uploadImage} className="bg-[#ff491f] text-white px-4 py-2 rounded mb-4 text-sm sm:text-base">
            Upload Image
          </button>
        </div>
      )}
      <form
        onSubmit={handleDashboardAccountDetails}
        className="flex items-center justify-center flex-col gap-4 sm:gap-6 w-full"
      >
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="">
            Username
          </label>
          <input
            className="bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            type="text"
            placeholder=""
            name="username"
            value={accountDetails.username}
            onChange={handleFormInput}
          />
        </div>
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="">
            Full Name
          </label>
          <input
            className="bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            type="text"
            placeholder=""
            name="fullName"
            value={accountDetails.fullName}
            onChange={handleFormInput}
          />
        </div>
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="">
            Email
          </label>
          <input
            className="bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            type="email"
            placeholder=""
            name="email"
            value={accountDetails.email}
            onChange={handleFormInput}
          />
        </div>

        <input
          className="bg-[#ff491f] h-10 sm:h-12 w-full max-w-sm sm:max-w-md lg:max-w-lg rounded text-white font-medium cursor-pointer text-sm sm:text-base mt-4"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  )
}

export default DashboardAccountDetails
