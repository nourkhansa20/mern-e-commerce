import React from 'react';
import ProductsContainer from '../ProductsContainer/ProductsContainer';
import { capitalizeFirstLetter } from '../../helpers/wordhelper';
import { checkIfProductInLocalStorageCart } from '../../helpers/localStorageHelper';


const ProductSection = ({ title, category, children }) => {

    return (
        <div>
            <div className='flex gap-6 items-center mb-3'>
                <h2 className='text-4xl font-semibold'>{capitalizeFirstLetter(category.name)}</h2>
                <div className='bg-gray-200 h-[0.5px] w-full' />
            </div>
            <ProductsContainer category_name={category.name} limit={5} />
        </div>
    );
};

export default ProductSection;
