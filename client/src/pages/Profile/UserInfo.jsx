import React, { useState } from 'react'
import { FilledTextField } from '../../moon-ui/TextField'
import UserInfoForm from '../../components/Form/UserInfoForm'
import RepeatingSection from '../../moon-ui/RepeatingSection'

const UserInfo = () => {
    return (
        <div className='w-full'>
            <div className='mb-5 flex justify-between'>
                <h2 className='text-4xl font-semibold'>User Info</h2>
            </div>
            <UserInfoForm />
        </div>
    )
}

export default UserInfo

const SampleComponent = ({ value, onChange }) => {
    return (
        <div>

            <div className="p-4 bg-gray-200 rounded shadow">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter value"
                />
            </div>
        </div>
    );
};
