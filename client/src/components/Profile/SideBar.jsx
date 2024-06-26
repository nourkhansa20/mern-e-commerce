import React from 'react';
import OutlineLikeIcon from '../../moon-ui/icons/OutlineLikeIcon';
import UserIcon from '../../moon-ui/icons/UserIcon';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {

    const items = [
        {
            to: 'user-info',
            title: 'User Info',
            icon: UserIcon
        },
        {
            to: 'setting',
            title: 'Setting',
            icon: OutlineLikeIcon // Assuming you wanted to use this icon here
        }
    ];

    return (
        <div className="flex flex-col gap-5 w-[30ex] h-screen relative">
            {items.map((item, index) => (
                <SideBarItem key={index} item={item} />
            ))}

            <div className='w-1 h-screen absolute right-0 bg-gray-100 opacity-40'/>
        </div>
    );
}

export default SideBar;

const SideBarItem = ({ item }) => {
    const location = useLocation();
    const inLocation = location.pathname === `/profile/${item.to}`;
    const Icon = item.icon || (() => <span className="w-5 h-5"></span>); // Fallback icon

    return (
        <Link
            to={item.to}
            className={`flex items-center p-2 gap-3 w-full  ${inLocation ? 'border-primary border-r-[5px]' : 'text-gray-400'} z-10`}
        >
            <Icon className='w-6' />
            <span className='text-lg'>{item.title}</span>
        </Link>
    );
}
