// routes/users.js
import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, addProductToWishList } from '../controllers/users.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/:userId/wishlist/:productId', addProductToWishList);

export default router;
