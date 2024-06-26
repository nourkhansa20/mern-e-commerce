import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Drawer = ({ open = false, onClose, children, z_index = 'z-30', position = 'left', className, size = null, customStyle }) => {
  const [style, setStyle] = useState({})
  const [visibility, setVisibility] = useState('hidden')
  useEffect(() => {
    let sizeStyle = size ? `${size}ex` : '40ex';
    let newStyle = {};

    switch (position) {
      case 'left':
        newStyle = {
          left: 0,
          height: '100%',
          width: open ? sizeStyle : '0',
        };
        break;
      case 'right':
        newStyle = {
          right: 0,
          height: '100%',
          width: open ? sizeStyle : '0',
        };
        break;
      case 'top':
        newStyle = {
          top: 0,
          width: '100%',
          height: open ? sizeStyle : '0',
        };
        break;
      case 'bottom':
        newStyle = {
          bottom: 0,
          width: '100%',
          height: open ? sizeStyle : '0',
        };
        break;
      default:
        break;
    }

    setStyle({ ...newStyle, ...customStyle });
  }, [open, position, size,customStyle]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => setVisibility('hidden'), 500)
    } else if (open) setVisibility('block')
  }, [style])

  return createPortal(
    <>
      {open && <div className={`fixed bg-black w-screen h-screen opacity-10 ${z_index}`} onClick={onClose} />}
      <div
        className={`fixed bg-white shadow-2xl overflow-auto transition-all duration-500  ${z_index}  overflow-y-auto ${open ? 'block' : visibility} ${className}`}
        style={style}
      >
        {
          <div className={` transition-all duration-500 h-full ${open ? 'opacity-100' : 'opacity-0'}`}>
            {children}
          </div>
        }
      </div>
    </>,
    document.querySelector("#popup")
  );
}

export default Drawer;
