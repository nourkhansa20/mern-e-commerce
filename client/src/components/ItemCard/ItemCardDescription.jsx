import React from 'react'

const ItemCardDescription = ({ product }) => {
    return (
        <div className='flex gap-4'>
            <div className='text-sm lg:text-lg font-semibold'>${product.price}</div>
            {
                product.discount &&
                <div className='text-sm lg:text-lg font-semibold text-gray-400 line-through'>$145.00</div>
            }
        </div>
    )
}

export default ItemCardDescription