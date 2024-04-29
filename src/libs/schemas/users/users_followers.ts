import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const FollowersIdSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    followersId: [
      { type: Schema.Types.ObjectId, ref: "users", required: true },
    ],
  },
  {
    timestamps: true,
  }
);
let FollowersSchema =
  mongoose.models.users_followers ||
  mongoose.model("users_followers", FollowersIdSchemaModel);
export default FollowersSchema;
