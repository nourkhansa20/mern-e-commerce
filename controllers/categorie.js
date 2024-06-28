// controllers/users.js
import { Category } from '../database/models/Category.js';

// Create a new user
export const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Get all users
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a user by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send();
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Update a user
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send();
        }
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete a user
export const deleteCategory = async (req, res) => {
    try {
        const Category = await Category.findByIdAndDelete(req.params.id);
        if (!Category) {
            return res.status(404).send();
        }
        res.status(200).send(Category);
    } catch (error) {
        res.status(500).send(error);
    }
}
