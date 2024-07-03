import React from 'react'

const ItemCardDescription = ({ product }) => {

    const discountAmount = product.price - product.discount.amount

    if (product.discount) {
        return (
            <div className='flex gap-4'>
                <div className='text-sm lg:text-lg font-semibold'>${discountAmount}</div>
                <div className='text-sm lg:text-lg font-semibold text-gray-400 line-through'>${product.price}</div>
            </div>
        )
    }
    return (
        <div className='flex gap-4'>
            <div className='text-sm lg:text-lg font-semibold'>${product.price}</div>
        </div>
    )
}

export default ItemCardDescription