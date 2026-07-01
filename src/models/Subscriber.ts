import mongoose, { Schema, model, models } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export type SubscriberDoc = mongoose.InferSchemaType<typeof SubscriberSchema>;

export default models.Subscriber || model("Subscriber", SubscriberSchema);
