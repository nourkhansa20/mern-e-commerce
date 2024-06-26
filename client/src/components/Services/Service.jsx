import React from 'react'

const Service = ({ src, title, desc }) => {
    return (
        <div className='flex flex-col justify-center items-center gap-2 text-center'>
            <img src={src} alt={title} />
            <h3 className='text-gray-500 text-sm'>{title}</h3>
            <h3 className='text-gray-400 text-[1.2ex]'>{desc}</h3>
        </div>
    )
}

export default Service