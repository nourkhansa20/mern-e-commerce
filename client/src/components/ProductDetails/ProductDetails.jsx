import React, { useEffect, useState } from 'react';
import Carousel from '../../moon-ui/Carousel';
import { PrimaryButton, SecondaryButton } from '../../moon-ui/Buttons';
import NumberInput from '../../moon-ui/NumberInput';
import StartRating from '../../moon-ui/StarRating';
import LikeButton from '../../moon-ui/LikeButton';
import { useQuery } from 'react-query';
import { fetchProduct } from '../../api/productApi';
import { Link, useParams } from 'react-router-dom';
import SkeletonProductDetails from './SkeletonProductDetails';
import { useLocalStorageContext } from '../../context/LocalStorageContext';
import StarRating from '../../moon-ui/StarRating';

const ProductDetails = ({ product }) => {
    const [_product, setProduct] = useState(product);
    const [quantity, setQuantity] = useState(0);
    const { product_slug } = useParams();

    const { data, isLoading, isSuccess, isError } = useQuery(
        ['product', product_slug],
        () => fetchProduct(product_slug),
        {
            enabled: !!product_slug,
        }
    );

    const { addProduct, removeProduct, getProductQuantity, isProductExist, deleteProduct } = useLocalStorageContext();

    useEffect(() => {
        let currentProduct;
        if (product) {
            currentProduct = product;
            setProduct(product);
        } else if (isSuccess && data) {
            currentProduct = data;
            setProduct(data);
        }
        if (currentProduct) {
            const qty = getProductQuantity(currentProduct.id);
            console.log(qty)
            setQuantity(qty);
        }
    }, [product, isSuccess, data, getProductQuantity]);

    if (isLoading) {
        return <SkeletonProductDetails />;
    }

    if (isError || !_product) {
        return <p>Error loading product details</p>;
    }

    const handleAddProduct = () => {
        addProduct(_product);
        setQuantity(prevQty => prevQty + 1);
    };

    const handleRemoveProduct = () => {
        removeProduct(_product.id);
        setQuantity(prevQty => (prevQty > 0 ? prevQty - 1 : 0));
    };

    const handleDeleteProduct = () => {
        deleteProduct(_product.id);
        setQuantity(0);
    };

    return (
        <div className='flex flex-col lg:flex-row justify-center md:items-start items-center gap-7 w-full'>
            <div className=''>
                <Carousel
                    imageContainerClassName='md:h-[60ex] lg:h-[50ex] sm:h-[60ex] h-[30ex]'
                    imageClassName='object-contain'
                    images={[_product.image]}
                    showGallery
                    showIndicators={false}
                    autoPlay={false}
                    className='w-[39ex] sm:w-[65ex] md:w-[75ex] lg:w-[60ex]'
                />
            </div>
            <div className='flex flex-col md:items-start items-center gap-4'>
                <div className='flex gap-4 items-center'>
                    {
                        product ? (
                            <Link to={`../product/${_product.id}`} className='text-xl md:text-2xl font-semibold w-[28ex]'>{_product.title}</Link>
                        ) : (
                            <h1 className='text-xl md:text-2xl font-semibold w-[28ex]'>{_product.title}</h1>
                        )
                    }
                    <LikeButton className={`w-[3ex]`} />
                </div>
                <StarRating starClassName='w-4' defaultRating={_product.rating.rate} />
                <div className="flex gap-7">
                    <p className='text-xl md:text-2xl font-semibold'>${_product.price}</p>
                    {_product.discount &&
                        <p className='text-xl md:text-2xl font-semibold text-gray-400 line-through'>${_product.discount}</p>
                    }
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
                            className={'px-3 py-4 border w-16 text-center rounded-md'}
                            onIncrease={handleAddProduct}
                            onDecrease={handleRemoveProduct}
                            value={quantity}
                        />
                    </div>
                    {isProductExist(_product.id) ? (
                        <PrimaryButton className={`w-[30ex] py-4`} onClick={handleDeleteProduct}>
                            Remove FROM CART
                        </PrimaryButton>
                    ) : (
                        <SecondaryButton className={`w-[30ex] py-4`} onClick={handleAddProduct}>
                            ADD TO CART
                        </SecondaryButton>
                    )}
                </div>
                <p className='text-gray-400 text-sm leading-6 max-w-[90ex] text-wrap'>
                    {_product.description}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
