import React, { useRef, useState } from "react";

const DashboardAccountDetails = () => {
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    "https://tse2.mm.bing.net/th/id/OIP.ff2Bto4-7hxRZS5FndS8bgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  );
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    email: "",
    fullName: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImage(file);
    
  
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    if (!image) return;
    
    try {
      const fd = new FormData();
      fd.append('profileImage', image); 
      
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/update-profile-image`,
        {
          method: "PATCH",
          credentials: "include",
          body: fd, 
        }
      );
      
      if (response.ok) {
        console.log("Image uploaded successfully");
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDashboardAccountDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/update-details`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(accountDetails),
        }
      );
      
      if (response.ok) {
        
        console.log("Account details updated");
      }
    } catch (error) {
      console.error("Account update error:", error);
    }
  };

  return (
    <div className="h-[90vh] w-[63vw] p-4 ">
      <h1 className="text-[#ff491f] text-4xl text-center font-bold">
        Please Update Your Details
      </h1>
      <div 
        className="flex items-center justify-center cursor-pointer my-6" 
        onClick={() => imageRef.current.click()}
      >
        <img 
          src={previewUrl} 
          alt="" 
          className=" h-36 w-36 rounded-full object-cover"
        />
        <input 
          type="file" 
          ref={imageRef} 
          onChange={handleImageChange} 
          className="hidden" 
        />
      </div>
      {image && (<div className="flex items-center justify-center">
      <button 
        onClick={uploadImage}
        className="bg-[#ff491f] text-white px-4 py-2 rounded mb-4 "
        >
        Upload Image
      </button>
        </div>)}
      <form
        onSubmit={handleDashboardAccountDetails}
        className="flex items-center justify-center flex-col gap-4 h-[55%] w-full"
      >
        <div className="h-20 w-96">
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Username
          </label>
          <input
            className='bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            type="text"
            placeholder=""
            name="username"
            value={accountDetails.username}
            onChange={handleFormInput}
          />
        </div>
        <div className="h-20 w-96">
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Full Name
          </label>
          <input
            className='bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            type="text"
            placeholder=""
            name="fullName"
            value={accountDetails.fullName}
            onChange={handleFormInput}
          />
        </div>
        <div className="h-20 w-96">
          <label className="block text-sm font-medium text-gray-700" htmlFor="">
            Email
          </label>
          <input
            className='bg-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            type="email"
            placeholder=""
            name="email"
            value={accountDetails.email}
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