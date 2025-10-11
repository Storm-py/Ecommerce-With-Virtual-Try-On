import React,{ useState } from "react"

const DashboardChangePassword = () => {
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword: "",
  })

  const handleFormInput = (e) => {
    const { name, value } = e.target
    setNewPassword((prev) => ({ ...prev, [name]: value }))
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newPassword),
      })

      if (response.ok) {
        console.log("Account Password updated")
      }
    } catch (error) {
      console.error("Account update error:", error)
    }
  }

  return (
    <div className="min-h-screen max-w-full w-[60vw] mx-auto p-4 sm:p-6 lg:p-8 shadow-2xl">
      <h1 className="text-[#ff491f] text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-8 sm:mb-12">
        Please Update Your Password
      </h1>
      <form onSubmit={handleChangePassword} className="flex items-center justify-center flex-col gap-4 sm:gap-6 w-full">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="">
            Old Password
          </label>
          <input
            className="bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            type="password"
            placeholder=""
            name="oldPassword"
            value={newPassword.oldPassword}
            onChange={handleFormInput}
          />
        </div>
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="">
            New Password
          </label>
          <input
            className="bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            type="password"
            placeholder=""
            name="newPassword"
            value={newPassword.newPassword}
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

export default DashboardChangePassword
