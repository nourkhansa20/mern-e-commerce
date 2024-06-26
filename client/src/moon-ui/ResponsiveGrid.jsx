// src/components/ResponsiveGrid.jsx
import './style/ResponsiveGrid.css'
import React from 'react';

const ResponsiveGrid = ({ children, containerClassName = 'min-w-full' }) => {
    return (
        <div className={`container ${containerClassName}`}>
            <div className="w-full grid-container ">
                {children}
            </div>
        </div>
    );
};

export default ResponsiveGrid;
