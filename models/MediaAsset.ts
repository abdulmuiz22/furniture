import mongoose, { Schema, Document, Model } from "mongoose";

export type MediaSection =
  | "hero"
  | "category"
  | "promo"
  | "product"
  | "showcase"
  | "gallery"
  | "general";

export interface IMediaAsset extends Document {
  title: string;
  section: MediaSection;
  mediaType: "image" | "video";
  url: string;
  cloudinaryPublicId?: string;
  caption?: string;
  linkUrl?: string;
  categoryRef?: string;
  productId?: string;
  tags?: string[];
  order?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    title: {
      type: String,
      required: [true, "Media title is required"],
      trim: true,
    },
    section: {
      type: String,
      enum: ["hero", "category", "promo", "product", "showcase", "gallery", "general"],
      default: "general",
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    url: {
      type: String,
      required: [true, "Media URL is required"],
      trim: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      default: "",
      trim: true,
    },
    linkUrl: {
      type: String,
      default: "",
      trim: true,
    },
    categoryRef: {
      type: String,
      default: "",
    },
    productId: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite upon hot reloads
const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset ||
  mongoose.model<IMediaAsset>("MediaAsset", MediaAssetSchema);

export default MediaAsset;
