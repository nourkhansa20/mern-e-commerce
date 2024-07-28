import React, { Fragment, useEffect, useState } from 'react';
import ItemCardDescription from './ItemCardDescription';
import ItemCardFooter from './ItemCardFooter';
import StarRating from '../../moon-ui/StarRating';
import DiscountLabel from './DiscountLabel ';
import { Link } from 'react-router-dom';
import { useCheckProductInCart } from '../../hooks/useCartApi';

const ItemCard = ({ product }) => {

    const discountPercantage = Number((100 * product.discount.amount) / product.price).toFixed(0)

    return (
        <>
            {
                product &&
                <div className='group w-48 sm:w-48 lg:w-80 p-3 h-fit rounded-md group relative hover:border-gray-200 border-[0.3ex] border-white duration-500 transition-all'>
                    <DiscountLabel discount={discountPercantage} labelClassName={`fill-[#509abd] m-1.5 w-11 lg:w-[10ex] absolute`} discountClassName='text-white mt-[2.7ex] ml-[4.3ex] text-[0.7ex] lg:text-[1.4ex] lg:mt-[1.7ex] lg:ml-[3.5ex]' />
                    <div className='flex flex-col gap-3'>
                        <img
                            className='rounded-md  cursor-pointer  h-[20ex] lg:h-[35ex] object-contain '
                            src={`${import.meta.env.VITE_API_BASE_URL}/${product.images['0']}`}
                            alt='Product'
                        />
                        <StarRating starClassName='size-4' defaultRating={product.rate} />
                        <hr />
                        <Link to={`../ecommerce/product/${product._id}`} className='text-sm lg:text-md font-semibold h-11 line-clamp-2 hover:text-primary transition-all duration-300'>{product.name}</Link>
                        <div />
                        <ItemCardDescription product={product} />
                        <ItemCardFooter product={product} />
                    </div>
                </div>
            }
        </>

    );
};

export default ItemCard;
