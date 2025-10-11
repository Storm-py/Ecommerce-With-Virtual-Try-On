import { Router } from "express";
import { adminVerifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uplaodProducts,check, registerAdmin, loginAdmin, deleteProducts, listProducts, logoutAdmin, getProduct, updateProductDetails,fetchOrders } from "../controllers/admin.controller.js";
import { updateAccountDetails } from "../controllers/user.controller.js";

const router=Router()
// router.use(adminVerifyJWT)

router.route("/add-product").post(
    adminVerifyJWT,
    upload.fields([
        {
            name:"images",
            maxCount:5
        }
    ]),
    uplaodProducts
)
router.route("/check").get(check)
router.route("/register").post(
    upload.single("profileImage"),
    registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/get-product/:id").get(getProduct)
router.route('/orders').get(adminVerifyJWT,fetchOrders)
router.route("/update-product/:id").put(adminVerifyJWT,
    upload.fields([
        {
            name:"images",
            maxCount:5
        }
    ]),
    updateProductDetails)
router.route("/logout").get(adminVerifyJWT,logoutAdmin)
router.route("/delete-product/:id").delete(adminVerifyJWT,deleteProducts)
router.route("/list-products").get(listProducts)
router.route("/update-details").patch(adminVerifyJWT,
    upload.fields([
        {
            name:"images",
            maxCount:5
        }
    ]),
    updateAccountDetails)



export default router
