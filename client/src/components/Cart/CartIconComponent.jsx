import React from 'react'
import { useLocalStorageContext } from '../../context/LocalStorageContext'
import CartIcon from '../../moon-ui/icons/CartIcon'
import { useCartContext } from '../../context/CartContext'

const CartIconComponent = ({ onClick }) => {
    const { cartProducts } = useCartContext()

    return (
        <div className='relative'>
            {
                cartProducts.length > 0 &&
                <div className='absolute  -right-3 -top-2 rounded-full size-[3.5ex] pt-[2.2px] bg-primary text-[1.1ex] font-semibold text-white flex items-center justify-center' >
                        <div className='absolute top-[2.4px]'>{cartProducts.length}</div>
                </div>
            }
            <CartIcon className='w-7 fill-white hover:fill-primary transition-all duration-300 ease-in-out cursor-pointer' onClick={onClick} />
        </div>
    )
}

export default CartIconComponent