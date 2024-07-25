import React from 'react'
import { useParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrderApi';
import Invoice from '../../components/Invoice/Invoice';

const Order = () => {
    const { order_id } = useParams();
    const { data: order, isLoading, isError } = useOrder(order_id)

    const invoiceFooter = () => (
        <tr className='border-b-[1px] '>
            <td className='p-3 text-center'></td>
            <td className='p-3 text-center'></td>
            <td className='p-3 text-center font-semibold'>Total</td>
            <td className='p-3 text-center font-semibold'>${order.totalPrice}</td>
        </tr>

    )

    if (!order) {
        return <h1>Order not found</h1>
    }

    return (
        <div className='2xl:w-[180ex] w-full mx-auto mt-9 min-h-[70vh] md:p-4 p-2'>
            <Invoice products={order.orderItems} tableRow={invoiceFooter()} />
        </div>

    )
}

export default Order
