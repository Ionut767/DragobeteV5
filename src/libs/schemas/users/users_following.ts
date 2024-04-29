import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const followingIdSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    followingId: [
      { type: Schema.Types.ObjectId, ref: "users", required: true },
    ],
  },
  {
    timestamps: true,
  }
);
let FollowingSchema =
  mongoose.models.users_following ||
  mongoose.model("users_following", followingIdSchemaModel);
export default FollowingSchema;
