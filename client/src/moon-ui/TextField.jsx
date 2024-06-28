import React, { forwardRef, useEffect, useState } from 'react';

const TextField = forwardRef(({ label, error, className, inputClassName, id, type = 'text', readOnly, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(props.defaultValue);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const spanClassNames = `absolute left-2 transition-all ease-in-out duration-300 text-gray-400 cursor-text
     ${isFocused || value ? 'top-1 text-xs font-semibold text-sky-500' : 'top-[30%] text-md'}`;

    return (
        <div className='w-full'>
            <label className={`relative w-full block group  ${className}`} htmlFor={id}>
                <input
                    id={id}
                    name={props.name ? props.name : ''}
                    className={`${inputClassName} ${error ? 'border-red-400' : ' border-gray-300'} w-full`}
                    type={type}
                    onFocus={handleFocus}
                    onBlur={(e) => {
                        handleBlur(e);
                        if (props.onBlur) {
                            props.onBlur(e);
                        }
                    }}
                    onChange={(e) => {
                        if (props.onChange) {
                            props.onChange(e); // Call the onChange provided by react-hook-form
                        }
                    }}
                    onKeyUp={(e) => {
                        handleChange(e);
                    }}

                    ref={ref} // Forward the ref to the input element
                    // value={value}
                    readOnly={readOnly}
                    {...props}
                />
                <span className={spanClassNames}>{label}</span>
            </label>
            <p className='text-red-400 text-sm'>{error ? error : ''}</p>
        </div>
    );
});

export const FilledTextField = forwardRef(({ ...props }, ref) => {
    return <TextField inputClassName={`input text-black w-full py-[1.9ex] pl-2 pr-1 outline-none border rounded-lg `} ref={ref} {...props} />
});

// export const StandardTextField = forwardRef(({ label, error, className, id, type = 'text', ...props }, ref) => {
//     return <TextField inputClassName={`input text-black w-full py-5 pl-2 pr-1 outline-none border-b`} ref={ref} {...props} />
// });
