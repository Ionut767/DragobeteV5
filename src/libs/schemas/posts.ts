import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const PostsDataSchema = new Schema(
  {
    description: { type: String, required: true, default: "" },
    sound: {
      type: Schema.Types.ObjectId,
      ref: "songs",
      required: false,
      default: {},
    },
    likes: { type: Schema.Types.ObjectId, ref: "posts_likes", default: [] },
    comments: {
      type: Schema.Types.ObjectId,
      ref: "posts_comments",
      default: [],
    },
    shares: { type: Schema.Types.ObjectId, ref: "posts_shares", default: [] },
    saves: { type: Schema.Types.ObjectId, ref: "posts_saves", default: [] },
  },
  {
    timestamps: true,
  }
);

const PostsSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    source: { type: String, required: true, default: "" },
    data: PostsDataSchema,
  },
  {
    timestamps: true,
  }
);
let PostsSchema =
  mongoose.models.posts || mongoose.model("posts", PostsSchemaModel);
export default PostsSchema;
