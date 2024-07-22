import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CartItemsList from './CartItemsList'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../../moon-ui/Buttons';

const Cart = ({ closeDrawer }) => {
    return (
        <CartItemsList>
            <Link to='/check-out' onClick={closeDrawer}>
                <PrimaryButton>Check Out</PrimaryButton>
            </Link>
        </CartItemsList>
    );
};

export default Cart;
