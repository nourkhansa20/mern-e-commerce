import React from 'react'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import Tab from '../moon-ui/Tab'
import CustomTab from '../components/CustomTab/CustomTab'
const ProductPage = () => {
    return (
        <div className='flex flex-col justify-center items-center p-4'>
            <div className='max-w-[170ex] my-20'>
                <ProductDetails />
            </div>

            <CustomTab containerClassName='bg-gray-100 w-full p-4'>
                <Tab.child title={'Details'}></Tab.child>
                <Tab.child title={'Reviews'}></Tab.child>
            </CustomTab>
        </div>
    )
}

export default ProductPage