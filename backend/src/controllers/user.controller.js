import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Product } from "../models/product.model.js";
import Stripe from 'stripe'
import { Order } from "../models/order.model.js";

import dotenv from "dotenv";
dotenv.config();


const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "Something Went Wrong While Generating Tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, fullName } = req.body;
  if (
    [email, username, password, fullName].some((field) => {
      return field.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser)
    throw new ApiError(400, "You should try with a new Email or Username");
  let profileImage;
  if (req.file) {
    const profileImageLocalPath = req.file.path;
    if (!profileImageLocalPath)
      throw new ApiError(400, "profile Image Required");
    profileImage = await uploadOnCloudinary(profileImageLocalPath);
  }

  const user = await User.create({
    fullName,
    email,
    profileImage: profileImage?.url || "",
    username: username.toLowerCase(),
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-refreshToken -password"
  );
  if (!createdUser) throw new ApiError(400, "User required");
  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created Sucessfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(400, "UserId not Available");
  const user = await User.findOne({ _id: userId }).select(
    "-password -refreshToken"
  );
  if (!user)
    throw new ApiError(
      400,
      "Something went wrong while searching for the user"
    );
  res.status(200).json(new ApiResponse(200, user, "User sent Successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username)
    throw new ApiError(400, "Email or username is required");

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) throw new ApiError(400, "Please register the User");
  const passwordValidate = await user.isPasswordCorrect(password);
  if (!passwordValidate)
    throw new ApiError(400, "Email or Password is incorrect");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
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
        "User LoggedIn Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await req.user._id;
  await User.findByIdAndUpdate(
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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout Successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = await req.user?._id;
  if (!userId) throw new ApiError(400, "User not found");
  const user = await User.findById(userId);
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

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { email, fullName, username } = req.body;
  if (![email, fullName, username].some((val) => val?.trim())) {
    throw new ApiError(400, "At least one field is required");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName,
        username,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  res
    .status(200)
    .json(
      new ApiResponse(200, user, "Details updated successfully succesfully")
    );
});

const updateprofileImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  let previousprofileImage = user.profileImage;
  if (previousprofileImage) {
    await deleteFromCloudinary(previousprofileImage);
  }

  const profileImageLocalPath = req.file?.path;
  if (!profileImageLocalPath)
    throw new ApiError(400, "You should provide profile Image Local Path");

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);

  if (!profileImage)
    throw new ApiError(400, "Some Error Occured during image uploading");
  user.profileImage = profileImage.url;
  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { profileImage },
        "Profile Image Changed Sucessfully"
      )
    );
});

const addToFavorites = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) throw new ApiError(400, "Product productId is required");

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const alreadyFavorite = user.favorites.includes(productId.toString());
  if (alreadyFavorite) {
    throw new ApiError(400, "Product is already in Favorites");
  }

  user.favorites.push(productId);
  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, user.favorites, "Product added to the favorites")
    );
});
const addToCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (!id) throw new ApiError(400, "Product Id is required");

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const alreadyCart = user.cart.includes(id.toString());
  if (alreadyCart) {
    throw new ApiError(400, "Product is already in Cart");
  }

  user.cart.push({ product: id, quantity });
  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, user.favorites, "Product added to the favorites")
    );
});
const getCartItems=asyncHandler(async(req,res)=>{
  const userId=req.user._id
  if(!userId) throw new ApiError(400,"UserId not Available")
  const user=await User.findById(userId).populate('cart.product')
  if(!user) throw new ApiError(400,"User not available")
  
  res.status(200).json(
    new ApiResponse(200,user.cart,"Cart Items Fetched Successfully")
  )
  
})
const getUserFavorites = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const user = await User.findById(userId).populate("favorites");
  
  if (!user) throw new ApiError(404, "User not found");
  
  res
    .status(200)
    .json(
      new ApiResponse(200, user.favorites, "User favorites fetched Sucessfully")
    );
});
const removeFavorites = asyncHandler(async (req, res) => {
  const userId = req.user?._id; 
  const { id } = req.params;    

  
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  
  const favoriteIndex = user.favorites.findIndex(
    (favId) => favId.toString() === id
  );

  if (favoriteIndex === -1) {
    return res.status(404).json({ message: "Favorite not found" });
  }

 
  user.favorites.splice(favoriteIndex, 1);

  
  await user.save();

  res.status(200).json({
    success: true,
    message: "Favorite removed successfully",
    favorites: user.favorites,
  });
});


const addreviews = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      alreadyReviewed.rating = rating;
      alreadyReviewed.comment = comment;
    } else {
      product.reviews.push({
        user: req.user._id,
        rating,
        comment,
      });
      product.ratings.count = product.reviews.length;
    }

    product.ratings.average =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    await product.populate("reviews.user", "name email");

    res.status(200).json({
      message: "Review added/updated successfully",
      reviews: product.reviews,
      ratings: product.ratings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const fetchReviews = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.user",
      "username email"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const fetchOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId })
    .populate("items.product", "name price") 
    .sort({ createdAt: -1 });                 

  if (!orders) throw new ApiError(404, "No orders found");

  res.status(200).json(
    new ApiResponse(200, orders, "User orders fetched successfully")
  );
});

const checkoutSession = asyncHandler(async (req, res) => {
  const data = req.body;


  const lineItems = data.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
      },
      unit_amount: Math.round(Number(item.product.price) * 100),
    },
    quantity: Number(item.quantity),
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});


export {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  updateAccountDetails,
  updateprofileImage,
  addToFavorites,
  addToCart,
  getUserFavorites,
  addreviews,
  fetchReviews,
  getCartItems,
  fetchOrders,
  checkoutSession,
  removeFavorites,
};