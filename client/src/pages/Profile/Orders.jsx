import React, { useEffect, useState } from 'react'
import Table from '../../moon-ui/Table'
import { useAuthContext } from '../../context/useAuthContext'
import { useOrdersByUserId } from '../../hooks/useOrderApi'
import { PrimaryButton } from '../../moon-ui/Buttons'

const Orders = () => {

    const { user } = useAuthContext()
    const { data: orders, isLoading: isOrdersLoading, error: ordersError } = useOrdersByUserId(user._id)
    const [tableOrders, setTableOrders] = useState([])


    useEffect(() => {
        if (orders) {
            const newOrdersArray = orders.map(({ _id, isDelivered, isPaid, orderItems, paymentMethod, shippingAddress, totalPrice }) => {

                let orderItemsLength = orderItems.length
                let address = shippingAddress.title

                let isDeliveredComponent = isDelivered ?
                    <StatusComponent type='complete' text='Delivred' /> :
                    <StatusComponent type='pending' text='In Progress' className={'text-[1.5ex] p-1'} />

                let isPaidComponent = isPaid ?
                    <StatusComponent type='complete' text='Paid' /> :
                    <StatusComponent type='pending' text='Not Paid' className={'text-[1.5ex] p-1'} />

                let totalString = '$ ' + totalPrice

                let button = <PrimaryButton className={'text-sm '} width='w-fit'>Show </PrimaryButton>

                return { _id, address, paymentMethod, orderItemsLength, isDeliveredComponent, isPaidComponent, totalString, /*button */ }

            });
            setTableOrders(newOrdersArray);
        }

    }, [orders])

    if (isOrdersLoading) {
        return <div>Loading...</div>
    }

    const headres = ['Address', 'Payement method', 'Number of Product', 'Is Delevered', 'Is Paid', 'Total price']

    return (
        <>
            <div className='mb-5 flex justify-between'>
                <h2 className='text-4xl font-semibold'>Orders</h2>
            </div>
            <div className='hidden md:block'>
                <Table headers={headres} data={tableOrders} rowsPerPage={20} unvisibleColumn={'0'} headerClassName='text-[1.7ex] p-2' tableClassName={'w-full'} />
            </div>
            <div className='flex flex-col gap-3 md:hidden '>
                {
                    tableOrders.map((order) => (
                        <div className='flex justify-around rounded-md border-[1px] border-gray-200 px-5 py-3'>
                            <table className='text-center text-sm'>
                                <tbody>
                                    <tr>
                                        <td className='font-semibold p-2'>Address :</td>
                                        <td>{order.address}</td>
                                    </tr>
                                    <tr>
                                        <td className='font-semibold p-2'>Payement method :</td>
                                        <td>{order.paymentMethod}</td>
                                    </tr>
                                    <tr>
                                        <td className='font-semibold p-2'>Number of product :</td>
                                        <td>{order.orderItemsLength}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='flex flex-col justify-between items-end'>
                                <div className='flex flex-col gap-3 h-fit'>
                                    {order.isPaidComponent}
                                    {order.isDeliveredComponent}
                                </div>
                                <div className='font-semibold m-2'>
                                    {order.totalString}
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Orders

const StatusComponent = ({ type, text, className = 'px-3 py-1' }) => {
    const [style, setStyle] = useState('')
    useEffect(() => {
        switch (type) {
            case 'pending':
                setStyle('bg-blue-300 text-white')
                break;
            case 'complete':
                setStyle('bg-green-300 text-white')
                break;
            default:
                break;
        }
    }, [type])

    return (
        <div className={`${style} rounded-md text-center ${className}`}>{text}</div>
    )
}