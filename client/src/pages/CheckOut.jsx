import React, { useState } from 'react'
import { useCartContext } from '../context/CartContext'
import CartItemsList from '../components/Cart/CartItemsList'
import { PrimaryButton } from '../moon-ui/Buttons'
import { useAuthContext } from '../context/useAuthContext'
import Modal from '../moon-ui/Modal'
import AddressForm from '../components/Form/AddressForm'
import { RadioButton, RadioButtonGroup } from '../moon-ui/RadioButton'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useToast } from '../moon-ui/Toast'
import { useCreateOrder } from '../hooks/useOrderApi.js'
import { useRemoveAllItemsFromCart } from '../hooks/useCartApi.js'
import { Navigate, useNavigate } from 'react-router-dom'

const schema = yup.object({
    address: yup.string().required("Address is required"),
})

const CheckOut = () => {

    const { isAuth, user } = useAuthContext()
    const navigate = useNavigate()

    if (!isAuth) {
        return <Navigate to='/home' />
    }

    const { cartProducts, total, subTotal, totalDiscount } = useCartContext()
    const [addAddressModal, setAddAddressModal] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [shippingAddress, setShippingAddress] = useState(null)

    const [isOrderLoading, setIsOrderLoading] = useState(false)

    const createOrderMutation = useCreateOrder()
    const removeAllItemFromCart = useRemoveAllItemsFromCart()


    const addToast = useToast()

    const form = useForm({
        defaultValues: {
            address: '',
        },
        resolver: yupResolver(schema)
    })

    const { register, control, handleSubmit, formState, watch } = form
    const { errors } = formState

    const onSubmit = (data) => {
        if (cartProducts.length > 0) {
            setShippingAddress(data.address)
            setConfirmModal(true)
        } else {
            addToast("You should have one item at least in the cart", 'error', 2000)
        }
    }

    const onError = (err) => {
        console.log(err)
    }

    const confirmOrder = () => {
        setIsOrderLoading(true)

        let orderItems = cartProducts.map(item => {
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.price
            }
        })

        createOrderMutation.mutateAsync({
            shippingAddress,
            userId: user._id,
            paymentMethod: 'cache',
            shippingPrice: 3,
            totalPrice: total + 3,
            orderItems
        }, {
            onSuccess: (data) => {
                removeAllItemFromCart.mutateAsync(user._id, {
                    onSuccess: (data) => {
                        navigate('/home')
                        setIsOrderLoading(false)

                    },
                    onError: (err) => {
                        addToast(err, 'error', 2000)
                        setIsOrderLoading(false)
                    }
                })
            },
            onError: (err) => {
                addToast(err, 'error', 2000)
                setIsOrderLoading(false)

            }
        })
    }

    return (
        <>
            <div className='flex flex-col xl:flex-row m-auto xl:gap-[15ex]'>
                <div className='md:w-[90ex]'>
                    <CartItemsList />
                </div>
                <div className='flex flex-col h-fit gap-5 justify-center items-center static md:sticky xl:top-20 xl:mt-5 '>
                    <div className='flex flex-col w-[40ex] gap-5 bg-white p-5 shadow-md h-fit rounded-md'>
                        <h2 className='font-semibold text-3xl '>Summary</h2>
                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td className='text-md font-semibold'>Subtotal</td>
                                    <td>${subTotal}</td>
                                </tr>
                                <tr>
                                    <td className='text-md font-semibold'>Discount</td>
                                    <td>${totalDiscount}</td>
                                </tr>
                                <tr>
                                    <td className='text-md font-semibold'>Shipping fee</td>
                                    <td>$3</td>
                                </tr>
                                <tr className='text-2xl'>
                                    <td className='font-semibold pt-4'>Total</td>
                                    <td className='font-semibold pt-4'>${total + 3}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className='flex flex-col justify-center items-center gap-3'>
                        <div className='flex flex-col w-[40ex] gap-5 bg-white p-5 shadow-md h-fit rounded-md'>
                            <div className='flex justify-between '>
                                <h2 className='font-semibold text-3xl '>Address</h2>
                                <PrimaryButton type="button" className={'text-sm '} width='w-fit' onClick={() => setAddAddressModal(true)}>Add address</PrimaryButton>
                            </div>

                            <RadioButtonGroup className={'w-full flex flex-col gap-2'} error={errors.address?.message} >
                                {
                                    user.addresses?.length > 0 ? (
                                        user.addresses?.map(address =>
                                            <RadioButton label={address.title} value={address._id} {...register('address')} />
                                        )
                                    ) : (
                                        <div>No address yet</div>
                                    )
                                }
                            </RadioButtonGroup>

                        </div>
                        <PrimaryButton>Place order</PrimaryButton>
                    </form>
                </div>

                <Modal open={addAddressModal} onClose={() => setAddAddressModal(false)} className='gap-4 w-[40ex] xl:w-[60ex] '>
                    <Modal.Title>Create Address</Modal.Title>
                    <AddressForm onClick={() => setAddAddressModal(false)} />
                </Modal>

                <Modal open={confirmModal} onClose={() => setConfirmModal(false)} className='gap-6'>
                    <Modal.Title>Confrim the order</Modal.Title>
                    <p>Are you sure that you want to confirm this order?</p>
                    <PrimaryButton onClick={confirmOrder} isLoading={isOrderLoading}>Confirm</PrimaryButton>
                </Modal>

            </div >
        </>
    )
}

export default CheckOut
