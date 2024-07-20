import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import List from '../../moon-ui/List';
import { useLocalStorageContext } from '../../context/LocalStorageContext';
import { useCart } from '../../hooks/useCartApi';
import { useAuthContext } from '../../context/useAuthContext';
import { useCartContext } from '../../context/CartContext';

const Cart = () => {

    const { cartProducts } = useCartContext()
    console.log(cartProducts)
    return (
        <>
            {cartProducts ? (
                <div>
                    <List noPadding>
                        {cartProducts.map(product => (
                            <List.ListItem key={product.product._id}>
                                <CartItem product={product.product} />
                            </List.ListItem>
                        ))}
                    </List>
                </div>
            ) : (
                <>No item</>
            )}
        </>
    );
};

export default Cart;
