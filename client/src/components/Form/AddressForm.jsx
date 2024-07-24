import React, { useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FilledTextField } from '../../moon-ui/TextField'
import { PrimaryButton } from '../../moon-ui/Buttons';
import { useCreateAddress } from '../../hooks/useAddressApi'
import { useAuthContext } from '../../context/useAuthContext';
import { useToast } from '../../moon-ui/Toast';

const schema = yup.object({
    title: yup.string().required("Title is required"),
    country: yup.string().required("Country is required"),
    street: yup.string().required("Street is required"),
    city: yup.string().required("City is required"),
    postalCode: yup.number().required("Postal code is required"),
    building: yup.string().required("Building is required"),
    floor: yup.number().required("Floor is required"),

});

const AddressForm = ({ onClick }) => {
    const { user, refetchUser } = useAuthContext()

    const addToast = useToast()

    const createAddressMutation = useCreateAddress()
    const [createAddressLoading, setCreateAddressLoading] = useState(false)

    const form = useForm({
        defaultValues: {
            title: '',
            country: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            building: '',
            floor: '',
        },
        resolver: yupResolver(schema)
    })

    const { register, control, handleSubmit, formState, watch } = form

    const { errors } = formState

    const onSubmit = (data) => {
        setCreateAddressLoading(true)
        createAddressMutation.mutate({ userId: user._id, ...data }, {
            onSuccess: (mss) => {
                setCreateAddressLoading(false)
                refetchUser()
                addToast('Address created successfully', 'success', 2000)
                onClick()
            },
            onError: (err) => {
                setCreateAddressLoading(false)
                addToast(err.message, 'error', 2000)
                console.log(err)
            }
        })

        console.log(data)
    }

    const onError = (err) => {
        console.log(err)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className='h-full flex flex-col gap-3  justify-between items-center'>
            <FilledTextField
                type="text"
                id="title"
                label="Title"
                error={errors.title?.message}
                {...register('title')}
            />
            <FilledTextField
                type="text"
                id="country"
                label="Country"
                error={errors.country?.message}
                {...register('country')}
            />
            <FilledTextField
                type="text"
                id="city"
                label="City"
                error={errors.city?.message}
                {...register('city')}
            />
            <div className='flex w-full justify-between gap-3'>
                <FilledTextField
                    type="text"
                    id="building"
                    label="Building"
                    error={errors.building?.message}
                    {...register('building')}
                />
                <FilledTextField
                    type="text"
                    id="floor"
                    label="Floor"
                    error={errors.floor?.message}
                    {...register('floor')}
                />
            </div>
            <FilledTextField
                type="text"
                id="street"
                label="Street"
                error={errors.street?.message}
                {...register('street')}
            />
            <FilledTextField
                type="text"
                id="postalCode"
                label="PostalCode"
                error={errors.postalCode?.message}
                {...register('postalCode')}
            />

            <PrimaryButton isLoading={createAddressLoading}>Create</PrimaryButton>

        </form>
    )
}

export default AddressForm