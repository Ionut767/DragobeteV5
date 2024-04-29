import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const UsersDataModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    username: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    avatar: { type: String, required: true, default: "" },
    settings: {
      type: Schema.Types.ObjectId,
      ref: "users_settings",
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
let UsersData =
  mongoose.models.users_data || mongoose.model("users", UsersDataModel);
export default UsersData;
