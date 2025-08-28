import { Router } from "express";
import { adminVerifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uplaodProducts,check, registerAdmin, loginAdmin, deleteProducts, listProducts, logoutAdmin } from "../controllers/admin.controller.js";
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
router.route("/logout").get(adminVerifyJWT,logoutAdmin)
router.route("/delete-product").delete(adminVerifyJWT,deleteProducts)
router.route("/list-products").get(adminVerifyJWT,listProducts)
router.route("/update-details").patch(adminVerifyJWT,updateAccountDetails)



export default router
