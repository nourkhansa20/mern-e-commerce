import React from 'react';
import ProductsContainer from '../ProductsContainer/ProductsContainer';
import { capitalizeFirstLetter } from '../../helpers/wordhelper';


const ProductSection = ({ title, section_name, children }) => {
    return (
        <div>
            <div className='flex gap-6 items-center mb-3'>
                <h2 className='text-4xl font-semibold'>{capitalizeFirstLetter(section_name)}</h2>
                <div className='bg-gray-200 h-[0.5px] w-full' />
            </div>
            <ProductsContainer category_name={section_name} limit={5} />
        </div>
    );
};

export default ProductSection;
