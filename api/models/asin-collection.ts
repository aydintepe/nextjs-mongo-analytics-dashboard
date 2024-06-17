import mongoose from "mongoose";

const AsinCollection = new mongoose.Schema({
  asin: { type: String, required: true },
  lastControl_product_offers: { type: Date, required: true },
  lastControl_catalog_item: { type: Date, required: true },
  lastControl_competitive_summary: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

// This prevents Mongoose from recompiling the model.
export default mongoose.models?.asin_collection || mongoose.model("asin_collection", AsinCollection);
