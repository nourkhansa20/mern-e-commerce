import React from 'react'
import { Link } from 'react-router-dom'

const BannerImage = ({ banner, className }) => {
    return (
        <Link to={banner.to} className={`${className} flex items-center justify-center`}>
            <img src={banner.img} alt="banner" className='hover:scale-[1.01] transition-all duration-300' />
        </Link>
    )
}

export default BannerImage