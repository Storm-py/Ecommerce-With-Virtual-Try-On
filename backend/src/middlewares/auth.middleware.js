import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { Admin } from '../models/admin.model.js';

export const userVerifyJWT=asyncHandler(async (req,_,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token) throw new ApiError(401,"Unauthorized Request")
            const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user=await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
    )
    if(!user) throw new ApiError(401,"Invalid Access Token")
        req.user=user;
    next()
    } catch (error) {
        console.log("Error :", error)
        throw new ApiError(401,"Invalid Access Token.")
    }
})

export const adminVerifyJWT=asyncHandler(async (req,_,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token) throw new ApiError(401,"Unauthorized Request")
            const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user=await Admin.findById(decodedToken?._id).select(
            "-password -refreshToken"
    )
    if(!user) throw new ApiError(401,"Invalid Access Token")
        req.user=user;
    next()
    } catch (error) {
        console.log("Error :", error)
        throw new ApiError(401,"Invalid Access Token.")
    }
})
