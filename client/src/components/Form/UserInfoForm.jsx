import React from 'react'
import { FilledTextField } from '../../moon-ui/TextField'

const UserInfoForm = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-4'>
                <FilledTextField
                    type="text"
                    id="first-name"
                    label="First name"
                />
                <FilledTextField
                    type="text"
                    id="last-name"
                    label="Last name"
                />
            </div>
            <FilledTextField
                type="email"
                id="email"
                label="Email"
            />
            <FilledTextField
                type="text"
                id="username"
                label="Username"
            />
            <FilledTextField
                type="text"
                id="phone-number"
                label="Phone number"
            />
        </div>
    )
}

export default UserInfoForm