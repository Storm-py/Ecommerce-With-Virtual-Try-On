import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: String,
  image: String,
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  featured: Boolean
});

categorySchema.pre('save', function(next) {
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  next();
});

export const Category = mongoose.model('Category', categorySchema);