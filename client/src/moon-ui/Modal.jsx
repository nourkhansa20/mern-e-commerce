// src/components/Modal.jsx

import React from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from './icons/CloseIcon';

const Modal = ({ open = false, onClose, children, className = '' }) => {

    const close = () => {
        onClose();
    };

    return createPortal(
        <>
            {open && (
                <>
                    <div className="fixed flex justify-center items-center w-screen h-screen z-30">
                        <div className="absolute bg-black w-screen h-screen opacity-30 z-20" onClick={close} />
                        <div
                            className={`rounded-md transition-all duration-500 bg-white shadow-md overflow-auto ${open ? 'opacity-100' : 'opacity-0'} 
                            p-3 z-30`}
                        >
                            <div className="w-full flex justify-end cursor-pointer" onClick={close}>
                                <CloseIcon className="w-4 mr-1" />
                            </div>
                            <div className={`flex justify-between items-center flex-col ${className} ` }>
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>,
        document.querySelector("#popup")
    );
};

export default Modal;

const ModalTitle = ({ children }) => {
    return (
        <h3 className="text-2xl font-semibold">{children}</h3>
    );
};

Modal.Title = ModalTitle;
