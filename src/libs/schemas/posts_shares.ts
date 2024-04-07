import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const PostsSharesSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "posts", required: true },
    shares: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
  },
  {
    timestamps: true,
  }
);
let Posts_Shares_Schema =
  mongoose.models.posts_shares ||
  mongoose.model("posts_shares", PostsSharesSchemaModel);
export default Posts_Shares_Schema;
