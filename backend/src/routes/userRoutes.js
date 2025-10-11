import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { registerUser,logoutUser,loginUser,changePassword, updateAccountDetails, updateprofileImage, addToFavorites, getUser,getUserFavorites, addToCart, fetchReviews, addreviews, getCartItems,checkoutSession,fetchOrders, removeFavorites } from "../controllers/user.controller.js";
import {userVerifyJWT} from '../middlewares/auth.middleware.js'

const router=Router()


router.route('/register').post(
    upload.single("profileImage"),
    registerUser
)
router.route('/user').get(userVerifyJWT,getUser)
router.route('/login').post(loginUser)
router.route('/logout').get(userVerifyJWT,logoutUser)
router.route('/change-password').patch(userVerifyJWT,changePassword)
router.route('/update-account-details').patch(userVerifyJWT,updateAccountDetails)
router.route('/update-profile-image').patch(
    upload.single('profileImage'),
    userVerifyJWT,
    updateprofileImage
)
router.route('/favorites').get(userVerifyJWT,getUserFavorites)// fetch this now
router.route('/get-cartItems').get(userVerifyJWT,getCartItems)
router.route('/add-to-favorites').post(userVerifyJWT,addToFavorites)
router.route('/add-to-cart/:id').post(userVerifyJWT,addToCart)
router.route('/remove-favorite/:id').delete(userVerifyJWT,removeFavorites)
router.route('/:id/reviews').get(fetchReviews).post(userVerifyJWT, addreviews)
router.route('/checkout-session').post(userVerifyJWT,checkoutSession)
router.route('/orders').get(userVerifyJWT,fetchOrders)// fetch this now
export default router