import { Router } from "express";
import { adminVerifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uplaodProducts,check, registerAdmin, loginAdmin, deleteProducts, listProducts } from "../controllers/admin.controller.js";
import { updateAccountDetails } from "../controllers/user.controller.js";

const router=Router()
// router.use(verifyJWT)

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
router.route("/delete-product").delete(deleteProducts)
router.route("/list-products").get(listProducts)
router.route("/update-details").patch(updateAccountDetails)



export default router
