import React, { useEffect, useState } from 'react'
import Drawer from '../../moon-ui/Drawer'
import Cart from './Cart'

const CartDrawer = ({ open, onClose, ...props }) => {
    const [width, setWidth] = useState({});

    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setWidth(38);
            } else if (width < 900) {
                setWidth(60);
            } else {
                setWidth(60);
            }
        };

        updateWidth(); // Initial check
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <Drawer size={width} className={` ${open ? `p-1 sm:px-4 sm:pt-4` : 'p-0'}`} open={open} position='right' onClose={onClose} {...props}>
            <h2 className='text-2xl sm:text-3xl font-semibold'>Cart</h2>
            <Cart closeDrawer={onClose} />
        </Drawer>
    )
}

export default CartDrawer