import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { registerUser,logoutUser,loginUser,changePassword, updateAccountDetails, updateprofileImage, addToFavorites } from "../controllers/user.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router=Router()


router.route('/register').post(
    upload.single("profileImage"),
    verifyJWT,
    registerUser
)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/change-password').patch(verifyJWT,changePassword)
router.route('/update-account-details').patch(verifyJWT,updateAccountDetails)
router.route('/update-profile-image').patch(
    upload.single('profileImage'),
    verifyJWT,
    updateprofileImage
)
router.route('add-to-favorites').post(verifyJWT,addToFavorites)
export default router