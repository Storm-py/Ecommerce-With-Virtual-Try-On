import mongoose,{Schema} from "mongoose";

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

adminSchema.methods.isPasswordCorrect=async function(password) {
   return await bcrypt.compare(password,this.password)
}

export const Admin=mongoose.model("Admin",adminSchema);