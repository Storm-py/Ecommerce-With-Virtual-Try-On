import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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
  console.log("Login Successfull");
  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created Sucessfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(400, "UserId not Available");
  const user = await User.findOne({ _id: userId });
  if (!user)
    throw new ApiError(
      400,
      "Something went wrong while searching for the user"
    );
  res
    .status(200)
    .json(new ApiResponse(200, user, "User sent Successfully"));
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
  const { email, fullName } = req.body;
  if (!email && !fullName)
    throw new ApiError(400, "At least one field is required");
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName,
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
  if (!previousprofileImage)
    throw new ApiError(400, "You dont have a profile image");
  await deleteFromCloudinary(previousprofileImage);

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
  if (!productId) throw new ApiError(400, "Product Id is required");

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

export {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  updateAccountDetails,
  updateprofileImage,
  addToFavorites,
};
