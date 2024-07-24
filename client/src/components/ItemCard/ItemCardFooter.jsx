import React, { useEffect, useState, useCallback } from 'react';
import CartIcon from '../../moon-ui/icons/CartIcon';
import EyeIcon from '../../moon-ui/icons/EyeIcon';
import LikeButton from '../../moon-ui/LikeButton';
import Modal from '../../moon-ui/Modal';
import ProductDetails from '../ProductDetails/ProductDetails';
import { useLocalStorageContext } from '../../context/LocalStorageContext';
import DeleteIcon from '../../moon-ui/icons/DeleteIcon';
import { useAuthContext } from '../../context/useAuthContext';
import { useAddItemToCart, useCheckProductInCart, useRemoveItemFromCart } from '../../hooks/useCartApi';
import { useCartContext } from '../../context/CartContext'

const ItemCardFooter = ({ product }) => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const { addProductToCart, isProductInCart ,deleteProductFromCart} = useCartContext()

    const close = () => {
        setIsDetailModalOpen(false);
    };

    const handleAddProduct = () => {
        addProductToCart(product)
    }

    const handleDeleteProduct = () => {
        deleteProductFromCart(product)
    }

    return (
        <div className='absolute px-2 bg-white left-0 bottom-4 opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-500 w-full'>
            <hr />
            <div className='py-2.5 flex justify-between items-center'>
                {isProductInCart(product._id) ? (
                    <div className='flex items-center gap-2 group cursor-pointer' onClick={handleDeleteProduct}>
                        <DeleteIcon className='fill-red-500 w-[2ex] lg:w-[2.5ex]' />
                        <span className='text-[1ex] mt-0.5 lg:text-[1.6ex] text-red-500 font-semibold'>DELETE FROM CART</span>
                    </div>
                ) : (
                    <div className='flex items-center gap-2 group cursor-pointer' onClick={handleAddProduct}>
                        <CartIcon className='fill-black w-[2ex] lg:w-[2.5ex]' />
                        <span className='text-[1ex] mt-0.5 lg:text-[1.6ex] font-semibold'>ADD TO CART</span>
                    </div>
                )}
                <div className='flex items-center gap-2 h-full'>
                    <EyeIcon className='cursor-pointer w-[2.1ex] lg:w-[2.8ex]' onClick={() => setIsDetailModalOpen(true)} />
                    <LikeButton className='w-[1.8ex] lg:w-[2.4ex]' />
                </div>
            </div>
            <Modal open={isDetailModalOpen} onClose={close} className='h-[70ex] w-[40ex] sm:w-[70ex] md:w-[80ex] lg:w-[120ex] xl:w-[120ex] '>
                <ProductDetails product={product} />
            </Modal>
        </div>
    );
};

export default ItemCardFooter;
