import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
    city: String,
    postalCode: String,
    country: String,
    phone: String, //(+91),(+212)
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
