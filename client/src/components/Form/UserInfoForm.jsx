import React, { useState } from 'react';
import { FilledTextField } from '../../moon-ui/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthContext } from '../../context/useAuthContext';
import { useForm } from 'react-hook-form';
import { PrimaryButton, SecondaryButton } from '../../moon-ui/Buttons';
import { useUpdateUser } from '../../hooks/useUserApi';
import { useToast } from '../../moon-ui/Toast';

const schema = yup.object({
    name: yup.string().required("Full name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    phone: yup.string().required("phone is required"),
});

const UserInfoForm = () => {
    const { user, setUser } = useAuthContext();
    const [isEditable, setIsEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const addToast = useToast()

    const form = useForm({
        defaultValues: {
            username: user.username,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
        resolver: yupResolver(schema),
    });

    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;

    const updateMutation = useUpdateUser();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            await updateMutation.mutateAsync({ id: user._id, updatedUser: data },
                {
                    onSuccess: (data) => {
                        if (user._id = data._id) {
                            setUser(data)
                            setIsEditable(false)
                            setIsLoading(false)
                            addToast("User edited successfully", 'success', 2000)
                        }
                    },
                    onError: (err) => {
                        // return err
                    }
                }
            );
        } catch (error) {
            console.log(error)
        }
    };

    const onError = (data) => {
        console.error(data);
    };

    return (
        <div className='flex flex-col items-center'>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                noValidate
                className='flex flex-col items-center justify-center gap-4 w-full'
            >
                <FilledTextField
                    type="text"
                    id="name"
                    label="Full Name"
                    defaultValue={user.name}
                    error={errors.name?.message}
                    readOnly={!isEditable}
                    {...register('name')}
                />
                <FilledTextField
                    type="text"
                    id="username"
                    label="Username"
                    defaultValue={user.username}
                    error={errors.username?.message}
                    readOnly={!isEditable}
                    {...register('username')}
                />
                <FilledTextField
                    type="email"
                    id="email"
                    label="Email"
                    defaultValue={user.email}
                    error={errors.email?.message}
                    readOnly={!isEditable}
                    {...register('email')}
                />
                <FilledTextField
                    type="text"
                    id="phone"
                    label="Phone number"
                    readOnly={!isEditable}
                    defaultValue={user.phone}
                    error={errors.phone?.message}
                    {...register('phone')}
                />
                {isEditable && (
                    <div className='flex gap-4'>
                        <SecondaryButton
                            onClick={() => {
                                setIsEditable(false);
                                reset({
                                    username: user.username,
                                    name: user.name,
                                    email: user.email,
                                    phone: user.phone,
                                });
                            }}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton isLoading={isLoading}>Save</PrimaryButton>
                    </div>
                )}
            </form>
            {!isEditable && (
                <PrimaryButton onClick={() => setIsEditable(true)} className={'mt-4'}>Edit</PrimaryButton>
            )}
        </div>
    );
};

export default UserInfoForm;
