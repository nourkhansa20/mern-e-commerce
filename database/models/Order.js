import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
    shippingAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    paymentMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const Order = model('Order', orderSchema);

export default Order
