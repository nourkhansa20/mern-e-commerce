import React from 'react'

const ItemCardDescription = ({ product }) => {

    const discountAmount = Number(product.price - product.discount.amount).toFixed(2)

    if (product.discount.amount > 0) {
        return (
            <div className='flex gap-4'>
                <div className='text-sm lg:text-lg font-semibold'>${discountAmount}</div>
                <div className='text-sm lg:text-lg font-semibold text-gray-400 line-through'>${product.price}</div>
            </div>
        )
    }
    return (
        <div className='flex gap-4'>
            <div className='text-sm lg:text-lg font-semibold'>${Number(product.price).toFixed(2)}</div>
        </div>
    )
}

export default ItemCardDescription