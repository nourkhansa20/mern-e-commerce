import React from 'react'

const Invoice = ({ products, tableRow }) => {
  return (
    <div>
      <h1 className='text-3xl font-semibold mb-4'>Your Order</h1>
      <table className='w-full'>
        <thead>
          <tr className='border-b-[1px] '>
            <th className='p-3 font-semibold'>Product</th>
            <th className='p-3 font-semibold'>Quantity</th>
            <th className='p-3 font-semibold'>Price</th>
            <th className='p-3 font-semibold'>Total price</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) => (
              <tr className='border-b-[1px] '>
                <td className='p-3 text-center'>{product.product.name}</td>
                <td className='p-3 text-center'>{product.quantity}</td>
                <td className='p-3 text-center'>${Number(product.price).toFixed(2)}</td>
                <td className='p-3 text-center'>${Number(product.price * product.quantity).toFixed(2)}</td>

              </tr>
            ))
          }
          {tableRow}
        </tbody>
      </table>
    </div>
  )
}

export default Invoice