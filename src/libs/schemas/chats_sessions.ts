import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const ChatsSessionsSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "users", required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: "chats_messages" }],
  },
  {
    timestamps: true,
  }
);
let Chats_Sessions_Schema =
  mongoose.models.chats_sessions ||
  mongoose.model("chats_sessions", ChatsSessionsSchemaModel);
export default Chats_Sessions_Schema;
