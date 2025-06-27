import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { uplaodProducts } from "../controllers/admin.controller";

const router=Router()
router.use(verifyJWT)

router.route("/add-product").post(
    upload.fields([
        {
            name:"images",
            maxCount:5
        }
    ]),
    uplaodProducts
)



export default router
