import { Cart } from '../database/models/Cart.js';

// Add item to cart
export const addItemToCart = async (req, res) => {
    const { userId, productId, quantity, price } = req.body;

    try {

        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity, price });
            }
        } else {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity, price }]
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add multiple items to cart
export const addMultipleItemsToCart = async (req, res) => {
    const { userId, products } = req.body; // products is an array of { productId, quantity, price }
    console.log(userId)
    console.log(products)
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        products.forEach(product => {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === product._id);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += product.quantity;
            } else {
                cart.items.push({ product: product._id, quantity: product.quantity, price: product.price });
            }
        });

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Remove all Items From  Cart
export const removeAllItemsFromCart = async (req, res) => {
    const { userId } = req.body;
    try {
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            cart.items = []
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update item quantity in cart
export const updateItemQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                await cart.save();
                res.status(200).json(cart);
            } else {
                res.status(404).json({ message: 'Product not found in cart' });
            }
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get cart by user ID
export const getCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const checkProductInCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                res.status(200).json({ exists: true, item: cart.items[itemIndex] });
            } else {
                res.status(200).json({ exists: false });
            }
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
