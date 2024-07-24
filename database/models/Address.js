import { model, Schema } from 'mongoose';

const addressSchema = new Schema({
    title: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    building: { type: String, required: true },
    floor: { type: Number, required: true },
    street: { type: String, required: true },
    postalCode: { type: Number, required: true },
    deleted: { type: Number, default: 0 },
});

export const Address = model('Address', addressSchema);
