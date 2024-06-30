import React from 'react'
import { FilledTextField } from '../../moon-ui/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const schema = yup.object({
    name: yup.string().required("Full name is required"),
    description: yup.string().required("Username is required"),
    price: yup.string().required("Email is required"),
    category: yup.string().required("phone is required"),
    stockQuantity: yup.string().required("phone is required"),
});

const ProductForm = () => {

    const form = useForm({
        defaultValues: {
            username: '',
            name: '',
            email: '',
            phone: '',
        },
        resolver: yupResolver(schema),
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;

    const onSubmit = async (data) => {
        console.log(data)
    };

    const onError = (data) => {
        console.error(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
            noValidate
        >
            <FilledTextField
                type="text"
                id="name"
                label="Full Name"
                error={errors.name?.message}
                {...register('name')}
            />
        </form>
    )
}

export default ProductForm