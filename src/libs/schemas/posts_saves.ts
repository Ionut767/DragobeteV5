import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const PostsSavesSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "posts", required: true },
    saves: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
  },
  {
    timestamps: true,
  }
);
let Posts_Saves_Schema =
  mongoose.models.posts_saves ||
  mongoose.model("posts_saves", PostsSavesSchemaModel);
export default Posts_Saves_Schema;
