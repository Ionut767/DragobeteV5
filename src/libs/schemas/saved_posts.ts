import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const SavedPostsSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    postsId: [{ type: Schema.Types.ObjectId, ref: "posts", required: true }],
  },
  {
    timestamps: true,
  }
);
let Saved_Posts_Schema =
  mongoose.models.saved_posts ||
  mongoose.model("saved_posts", SavedPostsSchemaModel);
export default Saved_Posts_Schema;
