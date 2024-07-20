// controllers/users.js
import { Product } from '../database/models/Product.js';
import { Category } from '../database/models/Category.js';

// Create a new user
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get all products
export const getProducts = async (req, res) => {
    try {
        const { category_name, price } = req.query;

        let filter = {};

        // Filter by category name
        if (category_name) {
            const category = await Category.findOne({ name: category_name });
            if (category) {
                filter.category = category._id;
            } else {
                // No category found with the given name
                return res.status(200).send([]);
            }
        }

        // Filter by price range
        if (price) {
            if (price === 'Under $50') {
                filter.price = { $lt: 50 };
            } else if (price === '$50 - $100') {
                filter.price = { $gte: 50, $lt: 100 };
            } else if (price === '$100 - $200') {
                filter.price = { $gte: 100, $lt: 200 };
            } else if (price === 'Upper $200') {
                filter.price = { $gte: 200 };
            }
        }

        const products = await Product.find(filter).populate('category');
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a user by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a user
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Delete a user
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}
