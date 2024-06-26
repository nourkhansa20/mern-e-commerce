import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Context = createContext(null)

const BottomNavigationAction = ({ label, Icon, className = '', index, to = '' }) => {
    const { setSelectedIndex, selectedIndex } = useContext(Context)
    return (
        <Link to={to} type="button" className={`inline-flex flex-col gap-1 items-center justify-center font-medium px-5 group py-1 rounded-2xl
        ${index == selectedIndex ? '' : ''}
        ${className}
        `}
            onClick={() => setSelectedIndex(index)}
        >
            <Icon className={`w-7 transition-all duration-200 ${index == selectedIndex ? 'fill-primary' : 'fill-gray-200'}`} />
            <span className={`text-sm transition-all duration-200  ${index == selectedIndex ? 'text-primary' : 'text-gray-200'}`}>{label}</span>
        </Link>
    )
}

const BottomNavigation = ({ children, onChange, withoutRound }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [updatedChildren, setUpdatedChildren] = useState([]);

    useEffect(() => {
        const newChildren = React.Children.map(children, (child, index) => {
            return React.cloneElement(child, { index: index });
        });
        setUpdatedChildren(newChildren);
    }, [children]);

    return (
        <Context.Provider value={{
            selectedIndex,
            setSelectedIndex
        }}>
            <div className={`fixed flex justify-around bottom-0 left-0 z-50 w-full h-18 shadow-2xl shadow-black bg-secondary p-2 
            ${withoutRound ? '' : 'rounded-t-2xl'}
            `} onClick={onChange} >
                {updatedChildren}
            </div>
        </Context.Provider>

    )
}

export default BottomNavigation

BottomNavigation.Action = BottomNavigationAction