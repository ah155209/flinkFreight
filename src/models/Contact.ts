import mongoose, { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export type ContactDoc = mongoose.InferSchemaType<typeof ContactSchema>;

export default models.Contact || model("Contact", ContactSchema);
