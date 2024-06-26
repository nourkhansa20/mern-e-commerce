import React from 'react'
import Tab from '../../moon-ui/Tab'

const CustomTab = ({ children, saparator, containerClassName = '', content = '' }) => {
    return (
        <>
            <Tab
                tabClassName='md:text-2xl font-semibold'
                acticeTabClassName=''
                inactiveTabClassName='text-gray-300'
                tabContainerClassName='justify-center'
                saparator={saparator}
                containerClassName={containerClassName}
                saparatorClassName='font-semibold text-gray-300 text-lg'
            >
                {children}
            </Tab>
        </>
    )
}

export default CustomTab