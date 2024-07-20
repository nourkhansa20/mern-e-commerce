import React, { useCallback, useEffect, useState } from 'react'
import LikeButton from '../../moon-ui/LikeButton'
import NumberInput from '../../moon-ui/NumberInput'
import DeleteIcon from '../../moon-ui/icons/DeleteIcon'
import { useLocalStorageContext } from '../../context/LocalStorageContext'
import { useAuthContext } from '../../context/useAuthContext'
import { useAddItemToCart, useCart, useCheckProductInCart, useRemoveItemFromCart } from '../../hooks/useCartApi'
import { useCartContext } from '../../context/CartContext'

const CartItem = ({ product }) => {
    const { addProductToCart, removeProductFromCart, getProductQuantity, deleteProductFromCart } = useCartContext()
    const quantity = getProductQuantity(product._id);

    const handleAdd = () => {
        addProductToCart(product)
    }

    const handleDelete = () => {
        deleteProductFromCart(product)
    }

    const handleRemove = () => {
        removeProductFromCart(product)
    }


    return (
        <>
            {
                product &&
                <div className='flex gap-3 w-[60ex]'>
                    {
                        product.images && product.images.length > 0 &&
                        <img src={`${import.meta.env.VITE_API_BASE_URL}/${product.images[0]}`} alt="img" className='h-[12ex] sm:h-[20ex] sm:w-[14ex] w-[9ex] object-contain' />
                    }
                    <div className='flex flex-col gap-2 w-full justify-center'>
                        <div className='text-[1.4ex] sm:text-[1.8ex] font-semibold flex justify-between items-center '>
                            <h3 className='w-[23ex] line-clamp-2 '>{product.name}</h3>
                            {product.price && <p>${product.price}</p>}
                        </div>
                        <table className='text-gray-400 text-[1.2ex] md:text-[1.4ex]'>
                            <tbody>
                                <tr>
                                    <td className='py-1'>Product no</td>
                                    <td className='py-1'>{product._id}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='flex justify-between items-center min-w-full'>
                            <LikeButton className={'w-[2.4ex] sm:w-[3ex]'} />
                            <NumberInput
                                className={'p-1 w-7 text-sm sm:text-lg sm:p-1 sm:w-9 border text-center rounded-md'}
                                value={quantity}
                                onIncrease={handleAdd}
                                onDecrease={handleRemove}
                            />
                            <DeleteIcon className='w-[2.4ex] sm:w-[3ex] fill-secondary hover:fill-primary transition-all duration-300 ease-in-out cursor-pointer' onClick={handleDelete} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CartItem
