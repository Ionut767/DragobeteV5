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
  },
  {
    timestamps: true,
  }
);
let UsersSchema =
  mongoose.models.users || mongoose.model("users", UsersSchemaModel);
export default UsersSchema;
