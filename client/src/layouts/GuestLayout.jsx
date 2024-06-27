import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext'

const GuestLayout = () => {
    const { token } = useAuthContext()

    if (token) {
        console.log(token)
        return <Navigate to={'/home'} />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default GuestLayout