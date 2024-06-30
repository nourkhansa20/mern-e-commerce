import React, { useState } from 'react'
import Bar from '../../moon-ui/Bar'
import CartDrawer from '../Cart/CartDrawer'
import CartIconComponent from '../Cart/CartIconComponent'
import UserIcon from '../../moon-ui/icons/UserIcon'
import { useAuthContext } from '../../context/useAuthContext'

const CustomBar = () => {
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
    const { isAuth } = useAuthContext()
    
    return (
        <Bar>
            <Bar.Items withoutDirection className="flex justify-start">
                <Bar.Item to='/home' className='text-white hover:text-primary transition-all duration-200'>
                    <Bar.ItemText>HOME</Bar.ItemText>
                </Bar.Item>

                <Bar.Item to={'/shop'} className='text-white hover:text-primary transition-all duration-200'>
                    <Bar.ItemText>SHOP</Bar.ItemText>
                    <Bar.DropDown>
                        nour ffsdf
                    </Bar.DropDown>
                </Bar.Item>
            </Bar.Items>

            <Bar.Items className=' flex gap-4 w-full'>
                <Bar.Icon className='flex items-center justify-center'>
                    <CartIconComponent onClick={() => setIsCartDrawerOpen(true)} />
                    <CartDrawer open={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
                </Bar.Icon>

                {
                    isAuth ?
                        (
                            <Bar.Item to={'/profile/user-info'} className=''>
                                <Bar.ItemText>
                                    <UserIcon className='w-7 fill-white hover:fill-primary transition-all duration-300' />
                                </Bar.ItemText>
                            </Bar.Item>

                        ) : (
                            <Bar.Item to={'/login'} className=''>
                                <Bar.ItemText className='text-white'>
                                    Login
                                </Bar.ItemText>
                            </Bar.Item>
                        )
                }

            </Bar.Items>

        </Bar>
    )
}

export default CustomBar


const BarSection = ({ section }) => {
    return (
        <div>
            <h2>{section.title}</h2>
        </div>
    )
}