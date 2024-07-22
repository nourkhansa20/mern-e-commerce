import React from 'react'
import { useCartContext } from '../../context/CartContext'
import List from '../../moon-ui/List'
import CartItem from './CartItem'

const CartItemsList = ({ children }) => {
    const { cartProducts } = useCartContext()
    return (
        <>
            {cartProducts.length > 0 ? (
                <div>
                    <div className='min-h-[96.6%]'>
                        <List noPadding>
                            {cartProducts.map(product => (
                                <List.ListItem key={product.product._id}>
                                    <CartItem product={product.product} />
                                </List.ListItem>
                            ))}
                        </List>
                    </div>
                    <div className='sticky -bottom-1 w-full flex justify-center bg-white p-4'>
                        {children}
                    </div>
                </div>
            ) : (
                <>No item</>
            )}
        </>
    )
}

export default CartItemsList