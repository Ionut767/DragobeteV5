import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const PostsSavesSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "posts", required: true },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);
let Posts_Likes_Schema =
  mongoose.models.posts_likes ||
  mongoose.model("posts_likes", PostsSavesSchemaModel);
export default Posts_Likes_Schema;
