import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import CartItemsList from './CartItemsList'
import { Link, useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../../moon-ui/Buttons';
import { useAuthContext } from '../../context/useAuthContext';
import Modal from '../../moon-ui/Modal'

const Cart = ({ closeDrawer }) => {

    const navigate = useNavigate()
    const { isAuth } = useAuthContext()
    const [loginModal, setLoginModal] = useState(false)

    const goToCheckOut = () => {
        if (isAuth) {
            navigate('check-out')
        } else {
            navigate('login')

        }
        closeDrawer()
    }
    return (
        <>
            <CartItemsList>
                <PrimaryButton onClick={goToCheckOut}>Check Out</PrimaryButton>
            </CartItemsList>
        </>
    );
};

export default Cart;
