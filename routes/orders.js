import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUserId
} from '../controllers/order.js';

const router = express.Router();

router.post('/', createOrder);                // Create a new order
router.get('/', getAllOrders);                // Get all orders
router.get('/:id', getOrderById);             // Get an order by ID
router.put('/:id', updateOrder);              // Update an order by ID
router.delete('/:id', deleteOrder);           // Delete an order by ID
router.get('/user/:userId', getOrdersByUserId); // Get orders by user ID

export default router;
