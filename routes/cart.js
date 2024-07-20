import express from 'express';
import {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    getCartByUserId,
    addMultipleItemsToCart,
    checkProductInCart
} from '../controllers/cart.js';

const router = express.Router();

router.post('/add', addItemToCart);
router.delete('/remove', removeItemFromCart);
router.put('/update', updateItemQuantity);
router.get('/:userId', getCartByUserId);
router.post('/add-multiple', addMultipleItemsToCart); // Route for multiple items
router.get('/:userId/product/:productId', checkProductInCart); // Route for checking product in cart


export default router;
