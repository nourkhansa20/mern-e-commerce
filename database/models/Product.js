import { model, Schema } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }], // Array of image URLs or paths
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category collection
  stockQuantity: { type: Number, default: 0 },
  discount: {
    amount: { type: Number, default: 0 }, // Discount amount
    startDate: { type: Date }, // Discount start date
    endDate: { type: Date } // Discount end date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Product = model('Product', productSchema);
