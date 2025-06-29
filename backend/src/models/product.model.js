import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0.01, "Price must be at least 0.01"],
      set: (v) => parseFloat(v.toFixed(2)),
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type:Schema.Types.ObjectId,
      ref:"Product",
      required:true
    },
    images: [
      {
        url: String,
        publicId: String,
        isPrimary: Boolean,
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


productSchema.pre("save",async function(next) {
    if(!this.isModified('name')) return next();
    this.slug=this.name
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
    next()
})
export const Product = mongoose.model("Product", productSchema);
