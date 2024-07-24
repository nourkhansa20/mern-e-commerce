import React from 'react';
import FillLikeIcon from '../../moon-ui/icons/FillLikeIcon';
import OrderIcon from '../../moon-ui/icons/OrderIcon';
import UserIcon from '../../moon-ui/icons/UserIcon';
import AddressIcon from '../../moon-ui/icons/AddressIcon';
import LogoutIcon from '../../moon-ui/icons/LogoutIcon';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/useAuthContext';

const SideBar = () => {
    const { logout } = useAuthContext()

    const items = [
        {
            to: 'user-info',
            title: 'User Info',
            icon: UserIcon
        },
        {
            to: 'orders',
            title: 'Orders',
            icon: OrderIcon
        },
        {
            to: 'addresses',
            title: 'Adderesses',
            icon: AddressIcon
        },
        // {
        //     to: 'setting',
        //     title: 'Setting',
        //     icon: FillLikeIcon // Assuming you wanted to use this icon here
        // }
    ];

    return (
        <div className='md:h-screen'>
            <div className="flex md:flex-col justify-between gap-5 w-[30ex] h-[80%] relative">
                <div className='flex md:flex-col gap-5'>
                    {items.map((item, index) => (
                        <SideBarItem key={index} item={item} />
                    ))}
                </div>
                <SideBarItem
                    onClick={logout}
                    item={{
                        to: '../home',
                        title: 'Logout',
                        icon: LogoutIcon
                    }} />

                <div className='absolute w-full h-1 bottom-0 md:w-1 md:h-full md:right-0 bg-gray-200  opacity-40' />
            </div>
        </div>
    );
}

export default SideBar;

const SideBarItem = ({ item, onClick }) => {
    const location = useLocation();
    const inLocation = location.pathname === `/profile/${item.to}`;
    const Icon = item.icon || (() => <span className="w-5 h-5"></span>); // Fallback icon

    return (
        <Link
            onClick={onClick}
            to={item.to}
            className={`flex flex-col md:flex-row justify-center items-center md:justify-start p-2 gap-3 w-full ${inLocation ? 'border-primary border-b-[3px] md:border-b-[0px] md:border-r-[5px]' : 'text-gray-400'} z-10`}
        >
            <Icon className='md:w-6 w-8 fill-gray-700' />
            <span className='text-lg hidden md:block'>{item.title}</span>
        </Link>
    );
}
