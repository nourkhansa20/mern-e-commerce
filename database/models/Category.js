import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});

export const Category = model('Category', categorySchema);
