import React, { useEffect, useState } from 'react';
import Carousel from '../../moon-ui/Carousel';
import { PrimaryButton, SecondaryButton } from '../../moon-ui/Buttons';
import NumberInput from '../../moon-ui/NumberInput';
import LikeButton from '../../moon-ui/LikeButton';
import { Link, useParams } from 'react-router-dom';
import SkeletonProductDetails from './SkeletonProductDetails';
import StarRating from '../../moon-ui/StarRating';
import { useProduct } from '../../hooks/useProductApi';
import { useCartContext } from '../../context/CartContext';

const ProductDetails = ({ product }) => {
    const [currentProduct, setCurrentProduct] = useState(product);
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(null);

    const { product_slug } = useParams();
    const { data, isLoading, isSuccess, isError } = useProduct(product_slug);
    const { addProductToCart, removeProductFromCart, deleteProductFromCart, getProductQuantity, isProductInCart } = useCartContext()

    const [quantity, setQuantity] = useState();

    useEffect(() => {
        if (product) {
            setCurrentProduct(product);
            setQuantity(getProductQuantity(product._id));
        } else if (isSuccess && data) {
            setCurrentProduct(data);
            setQuantity(getProductQuantity(data._id));
        }
    }, [product, isSuccess, data, getProductQuantity]);

    useEffect(() => {
        if (currentProduct && currentProduct.discount) {
            setPriceAfterDiscount(currentProduct.price - currentProduct.discount.amount);
        }
    }, [currentProduct]);

    if (isLoading) {
        return <SkeletonProductDetails />;
    }

    if (isError || !currentProduct) {
        return <p>Error loading product details</p>;
    }

    const handleAddProduct = () => {
        addProductToCart(currentProduct);
    };

    const handleRemoveProduct = () => {
        removeProductFromCart(currentProduct);
    };

    const handleDeleteProduct = () => {
        console.log(currentProduct)
        deleteProductFromCart(currentProduct);
    };

    return (
        <div className='flex flex-col lg:flex-row justify-center md:items-start items-center gap-7 w-full'>
            <div>
                <Carousel
                    imageContainerClassName='md:h-[60ex] lg:h-[50ex] sm:h-[60ex] h-[30ex]'
                    imageClassName='object-contain'
                    baseUrl={`${import.meta.env.VITE_API_BASE_URL}/`}
                    images={currentProduct.images}
                    showGallery
                    showIndicators={false}
                    autoPlay={false}
                    className='w-[29ex] sm:w-[65ex] md:w-[75ex] lg:w-[60ex]'
                />
            </div>
            <div className='flex flex-col md:items-start items-center gap-4'>
                <div className='flex gap-4 items-center'>
                    <Link to={`../product/${currentProduct._id}`} className='text-xl md:text-2xl font-semibold md:w-[28ex]'>{currentProduct.name}</Link>
                    <LikeButton className='w-[3ex]' />
                </div>
                <StarRating starClassName='w-4' defaultRating={currentProduct.rate} />
                <div className='flex gap-7'>
                    {currentProduct.discount ? (
                        <>
                            <p className='text-xl md:text-2xl font-semibold'>${priceAfterDiscount}</p>
                            <p className='text-xl md:text-2xl font-semibold text-gray-400 line-through'>${currentProduct.price}</p>
                        </>
                    ) : (
                        <p className='text-xl md:text-2xl font-semibold'>${currentProduct.price}</p>
                    )}
                </div>
                <div className='flex gap-6 text-gray-500'>
                    <p className='font-semibold'>In Stock</p>
                    <p>
                        <span className='font-bold'>SKU</span> 24-MG05
                    </p>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-3 my-3'>
                    <div className='flex gap-3 items-center'>
                        <p className='text-gray-500 text-md'>Qty</p>
                        <NumberInput
                            className='px-3 py-4 border w-16 text-center rounded-md'
                            onIncrease={handleAddProduct}
                            onDecrease={handleRemoveProduct}
                            value={quantity}
                        />
                    </div>
                    {isProductInCart(currentProduct._id) ? (
                        <PrimaryButton className='w-[30ex] py-4' onClick={handleDeleteProduct}>
                            REMOVE FROM CART
                        </PrimaryButton>
                    ) : (
                        <SecondaryButton className='w-[30ex] py-4' onClick={handleAddProduct}>
                            ADD TO CART
                        </SecondaryButton>
                    )}
                </div>
                <p className='text-gray-400 text-sm leading-6 max-w-[90ex] text-wrap'>
                    {currentProduct.description}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
