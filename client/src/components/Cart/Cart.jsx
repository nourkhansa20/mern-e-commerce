import React, { useState } from 'react'
import CartItem from './CartItem'
import List from '../../moon-ui/List'
import { addProductToLocalStorageCart, getAllCartItemsFromLocalStorage } from '../../helpers/localStorageHelper'
import { useLocalStorageContext } from '../../context/LocalStorageContext'

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { products } = useLocalStorageContext()

    const handleRemove = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };
    return (
        <div>
            <List noPadding>
                {
                    products.map(product => (
                        <List.ListItem key={product.id}>
                            <CartItem product={product} onRemove={handleRemove} />
                        </List.ListItem>
                    ))
                }
            </List>
        </div>
    )
}

export default Cart