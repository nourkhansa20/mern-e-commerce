import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

export const User = model('User', userSchema);
