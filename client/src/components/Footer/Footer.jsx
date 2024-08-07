import React from 'react'
import FacebookIcon from '../../moon-ui/icons/FacebookIcon'
import InstagramIcon from '../../moon-ui/icons/InstagramIcon'
import XIcon from '../../moon-ui/icons/XIcon'
import Logo from '../../../public/Logo'
export const Footer = ({ className }) => {
    return (
        <div className={`relative flex flex-col gap-6 md:gap-10 justify-center items-center bg-secondary min-h-[26ex] w-full self-end p-3 ${className}`}>
            <div className='text-white text-2xl flex gap-3 justify-center items-center'>
                <Logo className='w-11 fill-white' />
                <span>E-Commerce</span>
            </div>
            <div className='flex justify-center items-center gap-12 '>
                <div className='flex flex-col sm:flex-row sm:gap-12 gap-5'>
                    <span className='text-white md:text-sm text-[1.3ex]'>Temrs of Service</span>
                    <span className='text-white md:text-sm text-[1.3ex]'>Privacy Policy</span>
                </div>
                <div className='flex flex-col sm:flex-row sm:gap-12 gap-5'>
                    <span className='text-white md:text-sm text-[1.3ex]'>Security</span>
                    <span className='text-white md:text-sm text-[1.3ex]'>Sitemap</span>
                </div>
            </div>
            <div className='flex gap-7 '>
                <FacebookIcon className='w-3 fill-white' />
                <InstagramIcon className='w-6 fill-white' />
                <XIcon className='w-6 fill-white' />
            </div>
            <div className='md:absolute md:right-5 md:bottom-[4.5ex] text-white md:text-sm text-[1.3ex]'>©2024 Nour AL Khansa, All rights reserved</div>
        </div>
    )
}
