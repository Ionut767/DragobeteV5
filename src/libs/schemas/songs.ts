import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const SongsSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    authors: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
    source: { type: String, required: true, default: "" },
    copyright: { type: String, required: true, default: "" },
    license: { type: String, required: true, default: "" },
    isReusable: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
let SongsSchema =
  mongoose.models.songs || mongoose.model("songs", SongsSchemaModel);
export default SongsSchema;
