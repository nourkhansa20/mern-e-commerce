import React from 'react'

const Collapse = ({ open, children }) => {
    return (
        <div className={`${open ? 'h-full' : 'h-0'} overflow-hidden  transition-all duration-200`}>
            {children}
        </div>
    )
}

export default Collapse