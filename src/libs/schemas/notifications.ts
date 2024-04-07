import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const NotificationsSchemaModel = new Schema(
  {
    _id: { type: ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    notifications: [
      {
        type: {
          type: String,
          enum: ["update", "inorog", "report", "warning", "important"],
          required: true,
        },
        title: { type: String, required: true },
        message: { type: String, required: true },
        read: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);
let NotificationsSchema =
  mongoose.models.notifications ||
  mongoose.model("notifications", NotificationsSchemaModel);
export default NotificationsSchema;
