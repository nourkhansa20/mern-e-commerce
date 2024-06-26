import React, { useState } from 'react'
import Navbar from '../../moon-ui/Navbar'
import CartDrawer from '../Cart/CartDrawer'
import CartIconComponent from '../Cart/CartIconComponent'
const CustomNavBar = () => {
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
    return (
        <Navbar>
            <Navbar.Items withoutDirection className="justify-start">
                <Navbar.Item className='text-white hover:text-primary transition-all duration-200'>
                    <Navbar.ItemText>HOME</Navbar.ItemText>
                </Navbar.Item>

                <Navbar.Item to={'/shop'} className='text-white hover:text-primary transition-all duration-200'>
                    <Navbar.ItemText>SHOP</Navbar.ItemText>
                    <Navbar.DropDown>
                        nour
                    </Navbar.DropDown>
                </Navbar.Item>
            </Navbar.Items>


            <Navbar.Icon className=''>
                <CartIconComponent onClick={() => setIsCartDrawerOpen(true)} />
                <CartDrawer open={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
            </Navbar.Icon>
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