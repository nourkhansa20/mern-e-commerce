import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FilledTextField } from '../../../moon-ui/TextField';
import { PrimaryButton } from '../../../moon-ui/Buttons';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/useAuthContext';
import { getAllCartItemsFromLocalStorage } from '../../../helpers/localStorageHelper';
import { useAddMultipleItemsToCart } from '../../../hooks/useCartApi';

const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const LoginFrom = () => {
    const { loginMutation, setUser, setToken, loadingAuth } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const addMultiProductToCartMutation = useAddMultipleItemsToCart()

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })

    const { register, control, handleSubmit, formState, watch } = form

    const { errors } = formState

    const onSubmit = async (data) => {
        setIsLoading(true)
        await loginMutation.mutateAsync(data, {
            onSuccess: (data) => {
                setUser(data.data.user)
                setToken(data.data.token)
                setIsLoading(false)
                const products = getAllCartItemsFromLocalStorage()
                if (products.length > 0) {
                    addMultiProductToCartMutation.mutate({ userId: data.data.user._id, products }, {
                        onSuccess: () => {
                            console.log('Add products to the cart succ..')
                        },
                        onError: (err) => {
                            console.log('Error add prod to cart', err)
                        }
                    })
                }

                // navigate('/home')
            },
            onError: (error) => {
                console.error('Error posting data:', error);
            }
        });
    }

    const onError = (data) => {
        console.log(data)
    }
    console.log(loadingAuth)
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className='h-full flex flex-col justify-between items-center gap-2'>
            <h2 className='font-semibold text-xl mb-3 mt-2'>Login</h2>
            <FilledTextField
                type="text"
                id="username"
                label="Username"
                error={errors.username?.message}
                {...register('username')}
            />
            <FilledTextField
                type="password"
                id="password"
                label="Password"
                error={errors.password?.message}
                {...register('password')}
            />
            <PrimaryButton className={'w-[20ex]'} isLoading={isLoading || loadingAuth}>Login</PrimaryButton>

        </form>
    )
}

export default LoginFrom