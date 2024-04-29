import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const ChatsMessagesSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    messages: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        message: { type: String, required: true, default: "" },
        date: { type: Date, required: true, default: Date.now() },
        seen: { type: Boolean, required: true, default: false },
        likes: [{ type: Schema.Types.ObjectId, ref: "users", default: [] }],
      },
    ],
  },
  {
    timestamps: true,
  }
);
let Chats_Messages_Schema =
  mongoose.models.chats_messages ||
  mongoose.model("chats_messages", ChatsMessagesSchemaModel);
export default Chats_Messages_Schema;
