import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const adminSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            index:true,
            lowercase:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            
        },
        fullName:{
            type:String,
            required:true,
            lowercase:true,
            index:true
        },
        profileImage:{
            type:String,
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        refreshToken:{
            type:String,
        },
        products:[
            {
                type:Schema.Types.ObjectId,
                ref:"Product"
            }
        ]
    },
    {
        timestamps:true
    }
)


adminSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
})

adminSchema.methods.generateAccessToken=function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
adminSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

adminSchema.methods.isPasswordCorrect=async function(password) {
   return await bcrypt.compare(password,this.password)
}

export const Admin=mongoose.model("Admin",adminSchema);