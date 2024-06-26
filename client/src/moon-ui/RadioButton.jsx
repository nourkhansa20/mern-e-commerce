import React, { forwardRef, useEffect } from 'react'
import './style/RadioButton.css'

export const RadioButtonGroup = ({ children, className, error, label  }) => {

    return (
        <div className={`w-full`}>
            <div className='flex justify-center w-full gap-6 items-center'>
                <span className='text-[2ex]'>{label}</span>
                <div className={`${className}`}>
                    {children}
                </div>
            </div>

            <p className='text-red-400 text-sm'>{error}</p>
        </div>
    )
}
export const RadioButton = forwardRef(({ label, id, ...props }, ref) => {
    return (
        <div className="radio-wrapper">
            <label className="radio-button">
                <input id={id} type="radio" ref={ref} value={label} {...props} />
                <span className="radio-checkmark"></span>
                <span className="radio-label">{label}</span>
            </label>
        </div>
    )
})
