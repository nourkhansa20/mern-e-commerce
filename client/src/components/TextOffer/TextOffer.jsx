import React from 'react'

const TextOffer = ({ children }) => {
    return (
        <div className='w-full bg-secondary px-7 py-4 text-white text-[1.9ex] text-center'>
            {children}
        </div>
    )
}

const Highligth = ({ children }) => {
    return <span className='text-primary'>{children}</span>
}


export default TextOffer

TextOffer.Highligth = Highligth