import React from 'react'
import Select from 'react-select'

function CustomSelect({ label, options, onChange, defaultValue, responsiveLabel, error, className }) {
  const labelStyle = responsiveLabel ? 'hidden md:block' : '';
  return (
    <div className={className}>
      <label className={'text-sm font-semibold' + labelStyle}>{label}</label>
      <Select options={options} defaultValue={defaultValue} onChange={onChange}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: '5px',
            border: 'litegray',
            padding: '1.2ex'
          }),
        }} />
      <div className='text-[var(--error-color)] text-[1.5ex]  ml-1 '>{error}</div>

    </div>
  )
}

export default CustomSelect