import React from 'react'

const List = ({ children, className = '', noPadding = false }) => {
    return (
        <ol className={`w-full ${className} ${noPadding ? 'px-0' : 'px-4'}`}>
            {children}
        </ol>
    )
}
const ListItemButton = ({ children, className = '', onClick, withoutHover, ...rest }) => {
    return (
        <>
            <li className={`w-full ${className} ${withoutHover ? "" : 'hover:bg-opacity-20 hover:bg-black'} `} {...rest} >
                <button className={`w-full flex gap-5 p-3 cursor-pointer }`} onClick={onClick}>
                    {children}
                </button>
            </li>
            <hr />
        </>

    )
}

const ListItemIcon = ({ children, className = '' }) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}

const ListItemText = ({ children, className = '' }) => {
    return (
        <div className={`${className} `}>{children} </div>
    )
}

const ListItem = ({ children, className = '', onClick, withoutRound }) => {
    return (
        <>
            <li className={`min-w-full flex items-center ${withoutRound ? '' : 'rounded-lg '}
        ${className} `}  >
                <div className={`w-full flex p-3 gap-5`} onClick={onClick}>
                    {children}
                </div>
            </li>
            <hr />
        </>
    )
}

export default List

List.ItemButton = ListItemButton
List.ItemIcon = ListItemIcon
List.ItemText = ListItemText
List.ListItem = ListItem