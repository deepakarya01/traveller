import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   image: {
      type: [String],
      required: true,
   },
   amenities: {
      type: [String],
      default: [],
    },
   price: {
      type: Number,
      required: true,
   },
   rating: {
      type: Number,
      required: true,
   },
   maxGuests: {
      type: Number,
      required: true,
    },
}, { timestamps: true });

const Place = mongoose.model("Place", placeSchema);

export default Place;