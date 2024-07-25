import Order from '../database/models/Order.js';
import OrderItem from '../database/models/OrderItem.js'
import { User } from '../database/models/User.js'

// Create a new order
export const createOrder = async (req, res) => {
    const { userId, orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;

    try {
        // Create the order first
        const order = new Order({
            user: userId,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: false,
            isDelivered: false,
        });

        await order.save();

        // Create and add order items to the order
        const orderItemsPromises = orderItems.map(async (item) => {
            const orderItem = new OrderItem({
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            });
            await orderItem.save();
            order.orderItems.push(orderItem._id);
        });

        await Promise.all(orderItemsPromises);

        await order.save();

        // Update the user's orders
        const user = await User.findById(userId); // Await the promise
        if (user) {
            user.orders.push(order._id);
            await user.save(); // Await the save operation
        } else {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('orderItems.product', 'name image price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an order by ID
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id)
            .populate('user', 'name email')
            .populate({
                path: 'orderItems',
                populate: {
                    path: "product",
                }
            })
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'orderItems',
                populate: {
                    path: "product",
                }
            })
            .populate('shippingAddress')
            .populate('user', 'name email')
            .sort({ createdAt: -1 })

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
