import React, { useState } from "react";

const DashboardAccountDetails = () => {
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newPassword),
        }
      );
      
      if (response.ok) {
        
        console.log("Account Password updated");
      }
    } catch (error) {
      console.error("Account update error:", error);
    }
  };

  return (
    <div className="h-[90vh] w-[63vw] p-4 ">
      <h1 className="text-[#ff491f] text-4xl text-center font-bold">
        Please Update Your Password
      </h1>
      <form
        onSubmit={handleChangePassword}
        className="flex items-center justify-center flex-col gap-4 h-[55%] w-full"
      >
        <div className="h-20 w-96">
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Old Password
          </label>
          <input
            className='bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            type="password"
            placeholder=""
            name="oldPassword"
            value={newPassword.oldPassword}
            onChange={handleFormInput}
          />
        </div>
        <div className="h-20 w-96">
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            New Password
          </label>
          <input
            className='bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            type="password"
            placeholder=""
            name="newPassword"
            value={newPassword.newPassword}
            onChange={handleFormInput}
          />
        </div>
        <input
          className="bg-[#ff491f] h-10 w-96 rounded text-white font-medium cursor-pointer"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default DashboardAccountDetails;