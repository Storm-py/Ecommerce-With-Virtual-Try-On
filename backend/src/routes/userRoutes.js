import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { registerUser,logoutUser,loginUser,changePassword, updateAccountDetails, updateprofileImage, addToFavorites,checkUser } from "../controllers/user.controller.js";
import {userVerifyJWT} from '../middlewares/auth.middleware.js'

const router=Router()


router.route('/register').post(
    upload.single("profileImage"),
    registerUser
)
router.route('/check').get(checkUser)
router.route('/login').post(loginUser)
router.route('/logout').get(userVerifyJWT,logoutUser)
router.route('/change-password').patch(userVerifyJWT,changePassword)
router.route('/update-account-details').patch(userVerifyJWT,updateAccountDetails)
router.route('/update-profile-image').patch(
    userVerifyJWT,
    upload.single('profileImage'),
    updateprofileImage
)
router.route('add-to-favorites').post(userVerifyJWT,addToFavorites)
export default router