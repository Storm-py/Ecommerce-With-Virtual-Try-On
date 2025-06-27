import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Product } from "../models/product.model";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Admin } from "../models/admin.model.js";

const uploadMultipleImagesToCloudinary=async function(files){
    const uploadedImages=[]

    for(const file of files){
        const result=await uploadOnCloudinary(files.path)
        uploadedImages.push({   
            url:result.url,
            publicId:result.public_id,
            isPrimary:false
        })
    }
    if(uploadedImages.length>0) uploadedImages[0].isPrimary=true
    return uploadedImages;
}


const uplaodProducts=asyncHandler(async(req,res)=>{
    const {name,price,description,category,stock,featured}=req.body
    if(
    [name,price,description,category,stock,featured].some((field)=>field.trim()==="")
    ){
        throw new ApiError(400,"Every Field is required")
    }
    const imagesLocalPath=req.files?.images
    if(!imagesLocalPath) throw new ApiError(400,"Images local Path not available")
        
        const images=uploadMultipleImagesToCloudinary(imagesLocalPath)
        
        const admin=await Admin.findById(req.user?._id)
        
        if(!admin) throw new ApiError(400,"admin not available")
            
    
    const product=await Product.create({
        name,
        price,
        description,
        category,
        images:images?.url,
        stock,
        featured,

    })
    admin.products.push(product._id)
    await admin.save()

    res.status(200).json(
        new ApiResponse(200,{product},"Product created Successfully")
    )

})





export{
    uplaodProducts
}