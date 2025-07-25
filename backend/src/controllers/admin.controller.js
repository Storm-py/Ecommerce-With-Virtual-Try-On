import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import {Category} from '../models/category.model.js'
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Admin } from "../models/admin.model.js";

const uploadMultipleImagesToCloudinary = async function (files) {
  const uploadedImages = [];

  for (const file of files) {
    const result = await uploadOnCloudinary(file.path);
    uploadedImages.push({
      url: result.url,
      publicId: result.public_id,
      isPrimary: false,
    });
  }
  if (uploadedImages.length > 0) uploadedImages[0].isPrimary = true;
  return uploadedImages;
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Admin.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: true });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "Something went wrong while generating tokens");
  }
};

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, username, password, fullName } = req.body;
  
  if (
    [email, username, password, fullName].some((field) => {
      return field.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await Admin.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser)
    throw new ApiError(400, "You should try with a new Email or Username");
  const profileImageLocalPath = req.file.path;
  if (!profileImageLocalPath) throw new ApiError(400, "profile Image Required");
  const profileImage = await uploadOnCloudinary(profileImageLocalPath);

  const user = await Admin.create({
    fullName,
    email,
    profileImage: profileImage?.url,
    username: username.toLowerCase(),
    password,
  });
  const createdAdmin = await Admin.findById(user._id).select(
    "-refreshToken -password"
  );
  if (!createdAdmin) throw new ApiError(400, "Admin required");
  res
    .status(201)
    .json(new ApiResponse(201, createdAdmin, "Admin created Sucessfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username)
    throw new ApiError(400, "Email or username is required");

  const user = await Admin.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) throw new ApiError(400, "Please register the User");
  const passwordValidate = await user.isPasswordCorrect(password);
  if (!passwordValidate)
    throw new ApiError(400, "Email or Password is incorrect");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await Admin.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          refreshToken,
          accessToken,
        },
        "Admin LoggedIn Successfully"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  const user = req.user._id;

  await Admin.findOneAndDelete(
    user,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Admin Logout Perfectly"));
});

const uplaodProducts = asyncHandler(async (req, res) => {
  const { name, price, description, category, stock, featured } = req.body;
  if (
    [name, price, description, category, stock, featured].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "Every Field is required");
  }
  const parsedPrice = Number(price);
  const parsedStock = Number(stock);

  if (isNaN(parsedPrice) || isNaN(parsedStock)) {
    throw new ApiError(400, "Price and Stock must be numbers");
  }
  const imagesLocalPath = req.files?.images;
  if (!imagesLocalPath)
    throw new ApiError(400, "Images local Path not available");

  const images = await uploadMultipleImagesToCloudinary(imagesLocalPath);

  const admin = await Admin.findById(req.user?._id);

  const existingCategory= await Category.findOne({name:category.trim()})

  if (!admin) throw new ApiError(400, "admin not available");

  const product = await Product.create({
    name,
    price: parsedPrice,
    description,
    category:existingCategory._id,
    images,
    stock: parsedStock,
    featured,
  });
  admin.products.push(product._id);
  await admin.save();

  res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product created Successfully"));
});

const check = asyncHandler(async (req, res) => {
  res.send("i am working");
});

const deleteProducts = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) throw new ApiError(400, "Product ID not available");

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) throw new ApiError(400, "Product not found");

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted Successfully"));
});

const listProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (products.length === 0)
    res
      .status(200)
      .json(new ApiResponse(200, { products }, "Your Products list is empty"));
  res
    .status(200)
    .json(new ApiResponse(200, { products }, "Products Fetched Succesfully"));
});

const updateProductDetails = asyncHandler(async (req, res) => {
  const { stock, featured, name, price, description, category } = req.body;

  if([stock,featured,name,price,description,category].some((field)=>String(field).trim()!=="")) throw new ApiError(400,"Atlease one field is required")
  })

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = await req.user?._id;
  if (!userId) throw new ApiError(400, "User not found");
  const user = await Admin.findById(userId);
  if (!user) throw new ApiError(400, "user not found");
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect)
    throw new ApiError(400, "Please enter the correct Password");
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export {
  updateProductDetails,
  changePassword,
  listProducts,
  deleteProducts,
  uplaodProducts,
  check,
  registerAdmin,
  loginAdmin,
}
