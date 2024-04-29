import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
const PostCommentschema = new Schema({
  _id: { type: ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  comment: { type: String, required: true, default: "" },
  likes: [{ type: Schema.Types.ObjectId, ref: "users", default: [] }],
  subcomments: {
    _id: { type: ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    comment: { type: String, required: true, default: "" },
    likes: [{ type: Schema.Types.ObjectId, ref: "users", default: [] }],
  },
});
const PostsCommentsSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "posts", required: true },
    comments: [PostCommentschema],
  },
  {
    timestamps: true,
  }
);
let Posts_Comments_Schema =
  mongoose.models.posts_comments ||
  mongoose.model("posts_comments", PostsCommentsSchemaModel);
export default Posts_Comments_Schema;
