import React, { useState } from 'react'
import { FilledTextField, TextField } from '../../../moon-ui/TextField';
import { PrimaryButton } from '../../../moon-ui/Buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import CustomDatePicker from '../DatePicker/DatePicker';
import CategorySelect from '../Select/CategorySelect';
import DragAndDropFile from '../../../moon-ui/DargAndDropFile';
import { useCreateProduct, useImageUpload } from '../../../hooks/useProductApi';
import { useToast } from '../../../moon-ui/Toast';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required").typeError('Price must be a number'),
    stockQuantity: yup.number().required("Stock quantity is required").typeError('Stock quantity must be a number'),
    discount: yup.object().shape({
        amount: yup.number('').required("Discount amount is required").typeError('Amount must be a number'),
    })
});
const ProductForm = () => {

    const navigate = useNavigate()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState(new Date())
    const [category, setCategory] = useState(new Date())
    const [images, setImages] = useState()

    const addToast = useToast()

    const [isLoading, setIsLoading] = useState(false)

    const uploadImageMutation = useImageUpload()
    const createProductMuation = useCreateProduct()

    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            stockQuantity: '',
            discount: {
                amount: '',
            },
        },
        resolver: yupResolver(schema),
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;

    const onSubmit = async (data) => {
        let submitData = data
        let categoryId = category.value
        let discountJson = {
            amount: data.discount.amount,
            startDate,
            endDate,
        }
        if (startDate && endDate && category && images) {
            submitData = {
                ...submitData,
                discount: discountJson,
                category: categoryId,
            }
            setIsLoading(true)
            createProductMuation.mutateAsync(submitData, {
                onSuccess: (data) => {
                    uploadImageMutation.mutate({ id: data._id, images }, {
                        onSuccess: (data) => {
                            addToast("Product added successfully", 'success', 2000)
                            navigate('/admin/products')
                            setIsLoading(false)

                        },
                        onError: (err) => {
                            console.log(err)
                            setIsLoading(false)

                        }
                    })
                }
            })


        }
    };

    const onError = (data) => {
        console.error(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
            noValidate
            className='flex flex-col gap-2 items-center'
        >
            <TextField
                type="text"
                id="name"
                label="Full Name"
                error={errors.name?.message}
                {...register('name')}
            />

            <TextField
                type="text"
                id="description"
                label="Description"
                error={errors.description?.message}
                {...register('description')}
            />

            <TextField
                type="text"
                id="price"
                label="Price"
                error={errors.price?.message}
                {...register('price')}
            />

            <TextField
                type="text"
                id="stockQuantity"
                label="Stock Quantity"
                error={errors.stockQuantity?.message}
                {...register('stockQuantity')}
            />

            <div className='flex gap-2 w-full'>
                <TextField
                    type="text"
                    id="discount-amount"
                    label="Discount Amount"
                    className='flex-[2]'
                    error={errors.discount?.amount?.message}
                    {...register('discount.amount')}
                />

                <CustomDatePicker label={'Start date'} className='flex-1' onChange={setStartDate} />
                <CustomDatePicker label={'End date'} className='flex-1' onChange={setEndDate} />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <CategorySelect onChange={setCategory} />
                <DragAndDropFile sendImage={setImages} />
            </div>
            <PrimaryButton isLoading={isLoading}>Create</PrimaryButton>

        </form>
    )
}

export default ProductForm