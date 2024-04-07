import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const UsersSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    username: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    avatar: { type: String, required: true, default: "" },
    // posts: [{ type: Schema.Types.ObjectId, ref: "posts", default: [] }],
    // followers: [
    //   { type: Schema.Types.ObjectId, ref: "users_followers", default: [] },
    // ],
    // following: [
    //   { type: Schema.Types.ObjectId, ref: "users_following", default: [] },
    // ],
    // saved: [{ type: Schema.Types.ObjectId, ref: "saved_posts", default: [] }],
    // notifications: [
    //   { type: Schema.Types.ObjectId, ref: "notifications", default: [] },
    // ],
    // messages: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "users_sessions_messages",
    //     default: [],
    //   },
    // ],
    // algorithm: { type: Schema.Types.ObjectId, ref: "algorithms", default: {} },
    // settings: {
    //   type: Schema.Types.ObjectId,
    //   ref: "users_settings",
    //   default: {},
    // },
  },
  {
    timestamps: true,
  }
);
let UsersSchema =
  mongoose.models.users || mongoose.model("users", UsersSchemaModel);
export default UsersSchema;
