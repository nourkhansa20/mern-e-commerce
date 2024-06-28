import React, { useState, cloneElement, Children, useEffect } from 'react';
import { Link } from 'react-router-dom'

const NavbarItem = ({ children, className = 'bg-black bg-opacity-25 rounded-lg', withoutRound, withoutBackgroudColor, to }) => {
  const [entered, setEntered] = useState(false);

  // Clone children to pass the entered state to them
  const clonedChildren = Children.map(children, child =>
    cloneElement(child, { entered })
  );

  return (
    <Link
      to={to}
      className={`flex gap-2 w-fit p-2 font-semibold cursor-pointer group relative ${className}`}
      onMouseEnter={() => setEntered(true)}
      onMouseLeave={() => setEntered(false)}
    >
      {clonedChildren}
    </Link>
  );
};


const NavbarIcon = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

const NavbarItemText = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

const NavbarItems = ({ children, withoutDirection, className = 'flex gap-2 w-full ' }) => {
  return (
    <div className={`${className}
    ${withoutDirection ? '' : 'justify-end'}
    `}>
      {children}
    </div>
  )
}

const NavbarLogo = ({ children }) => {
  return (
    <div className=''>
      {children}
    </div>
  )
}

const NavbarDropDown = ({ entered, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout;
    if (entered) {
      timeout = setTimeout(() => setVisible(true), 100); // Adjust the delay as needed
    } else {
      timeout = setTimeout(() => setVisible(false), 100); // Adjust the delay as needed
    }
    return () => clearTimeout(timeout); // Cleanup timeout on unmount or if entered changes
  }, [entered]);

  return (
    <div className={`absolute ${visible ? 'block' : 'hidden'} bg-white transition-all duration-300 p-3 top-12 shadow-sm z-10 text-black opacity-0 group-hover:opacity-100 group-hover:block overflow-hidden`}>
      {children}
    </div>
  );
};

const Navbar = ({ children, className = '' }) => {
  return (
    <div className={`bg-secondary py-2 px-4 flex items-center ${className}`}>
      {children}
    </div>
  )
}

export default Navbar

Navbar.ItemText = NavbarItemText
Navbar.Item = NavbarItem
Navbar.Items = NavbarItems
Navbar.Icon = NavbarIcon
Navbar.Logo = NavbarLogo
Navbar.DropDown = NavbarDropDown