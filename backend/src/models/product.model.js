import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

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
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids", "Shoes", "Accessories", "Bags"],
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
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = this.name
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)+/g, "")
    .toLowerCase();
  next();
});

export const Product = mongoose.model("Product", productSchema);
