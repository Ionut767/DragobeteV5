import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const UsersSettingsSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    favorite_tags: [{ type: String, required: true, default: "" }],
    unfavorite_tags: [{ type: String, required: true, default: "" }],
    favorite_songs: [{ type: Schema.Types.ObjectId, ref: "songs" }],
    favourited_users: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: true,
  }
);
let Users_Settings_Schema =
  mongoose.models.users_settings ||
  mongoose.model("users_settings", UsersSettingsSchemaModel);
export default Users_Settings_Schema;
