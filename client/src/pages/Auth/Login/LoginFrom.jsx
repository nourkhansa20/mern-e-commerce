import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FilledTextField } from '../../../moon-ui/TextField';
import { PrimaryButton } from '../../../moon-ui/Buttons';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/useAuthContext';

const schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const LoginFrom = () => {
    const { loginMutation, setUser, setToken } = useAuthContext()

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })

    const { register, control, handleSubmit, formState, watch } = form

    const { errors } = formState

    const onSubmit = (data) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                setUser(data.data.user)
                setToken(data.data.token)
            },
            onError: (error) => {
                console.error('Error posting data:', error);
            }
        });
    }

    const onError = (data) => {
        console.log(data)
    }

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

            <PrimaryButton className={'w-[20ex]'}>Create</PrimaryButton>

        </form>
    )
}

export default LoginFrom