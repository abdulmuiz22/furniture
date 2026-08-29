import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  image: string;
  cloudinaryPublicId?: string;
  video?: string;
  videoCloudinaryPublicId?: string;
  mediaType?: "image" | "video";
  description: string;
  dimensions?: string;
  material?: string;
  featured: boolean;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    video: {
      type: String,
      default: "",
    },
    videoCloudinaryPublicId: {
      type: String,
      default: "",
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    dimensions: {
      type: String,
      default: "Custom sizing available upon request",
    },
    material: {
      type: String,
      default: "Premium handcrafted materials",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 12,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development hot reloading
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
