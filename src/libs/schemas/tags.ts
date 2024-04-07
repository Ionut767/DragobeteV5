import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const TagsSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    name: { type: String, required: true },
    videos: { type: Schema.Types.ObjectId, ref: "posts", default: [] },
  },
  {
    timestamps: true,
  }
);
let TagsSchema =
  mongoose.models.tags || mongoose.model("tags", TagsSchemaModel);
export default TagsSchema;
