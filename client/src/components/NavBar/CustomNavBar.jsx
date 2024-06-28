import React, { useState } from 'react'
import Navbar from '../../moon-ui/Navbar'
import CartDrawer from '../Cart/CartDrawer'
import CartIconComponent from '../Cart/CartIconComponent'
import UserIcon from '../../moon-ui/icons/UserIcon'
import { useAuthContext } from '../../context/useAuthContext'

const CustomNavBar = () => {
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
    const { isAuth } = useAuthContext()
    console.log(isAuth)
    return (
        <Navbar>
            <Navbar.Items withoutDirection className="flex justify-start">
                <Navbar.Item to='/home' className='text-white hover:text-primary transition-all duration-200'>
                    <Navbar.ItemText>HOME</Navbar.ItemText>
                </Navbar.Item>

                <Navbar.Item to={'/shop'} className='text-white hover:text-primary transition-all duration-200'>
                    <Navbar.ItemText>SHOP</Navbar.ItemText>
                    <Navbar.DropDown>
                        nour ffsdf
                    </Navbar.DropDown>
                </Navbar.Item>
            </Navbar.Items>

            <Navbar.Items className=' flex gap-4 w-full'>
                <Navbar.Icon className='flex items-center justify-center'>
                    <CartIconComponent onClick={() => setIsCartDrawerOpen(true)} />
                    <CartDrawer open={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
                </Navbar.Icon>

                {
                    isAuth ?
                        (
                            <Navbar.Item to={'/profile/user-info'} className=''>
                                <Navbar.ItemText>
                                    <UserIcon className='w-7 fill-white hover:fill-primary transition-all duration-300' />
                                </Navbar.ItemText>
                            </Navbar.Item>

                        ) : (
                            <Navbar.Item to={'/login'} className=''>
                                <Navbar.ItemText className='text-white'>
                                    Login
                                </Navbar.ItemText>
                            </Navbar.Item>
                        )
                }

            </Navbar.Items>

        </Navbar>
    )
}

export default CustomNavBar


const NavbarSection = ({ section }) => {
    return (
        <div>
            <h2>{section.title}</h2>
        </div>
    )
}