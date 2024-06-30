import React, { useState, cloneElement, Children, useEffect } from 'react';
import { Link } from 'react-router-dom'

const BarItem = ({ children, className = 'bg-black bg-opacity-25 rounded-lg', withoutRound, withoutBackgroudColor, to }) => {
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


const BarIcon = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

const BarItemText = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

const BarItems = ({ children, withoutDirection, className = 'flex gap-2 w-full ', type }) => {

  const [typeStyle, setTypeStyle] = useState('')

  useEffect(() => {
    if (type == 'side') {
      setTypeStyle('flex-col')
    } else if (type == 'nav') {
      setTypeStyle('flex-row')
    }
  }, [type])


  return (
    <div className={`${className} ${typeStyle}
    ${withoutDirection ? '' : 'justify-end'}
    `}>
      {children}
    </div>
  )
}

const BarLogo = ({ children }) => {
  return (
    <div className=''>
      {children}
    </div>
  )
}

const BarDropDown = ({ entered, children }) => {
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

const Bar = ({ children, className = '', type = 'nav' }) => {
  const [typeStyle, setTypeStyle] = useState('')

  useEffect(() => {
    if (type == 'side') {
      setTypeStyle('h-full z-40 flex-col w-[30ex]')
    } else if (type == 'nav') {
      setTypeStyle('z-40 flex-row')
    }

  }, [type])

  const clonedChildren = Children.map(children, child =>
    cloneElement(child, { type })
  );

  return (
    <div className={`bg-secondary py-2 px-4 flex items-center ${className} ${typeStyle} `}>
      {clonedChildren}
    </div>
  )
}

export default Bar

Bar.ItemText = BarItemText
Bar.Item = BarItem
Bar.Items = BarItems
Bar.Icon = BarIcon
Bar.Logo = BarLogo
Bar.DropDown = BarDropDown