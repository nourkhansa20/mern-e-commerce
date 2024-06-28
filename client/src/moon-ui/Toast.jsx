import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

export const Toast = ({ id, message, type, duration, onRemove }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(id);
        }, duration);

        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 100 / (duration / 100));
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [id, duration, onRemove]);

    const handleRemove = () => {
        onRemove(id);
    };

    const typeStyles = {
        success: 'bg-green-400',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    };

    return (
        <div className={`toast w-[30ex] flex flex-col justify-between items-start p-4 mb-4 rounded text-white shadow-lg ${typeStyles[type]}`}>
            <div className="flex justify-between w-full items-center">
                <span>{message}</span>
                <button onClick={handleRemove} className="ml-4 bg-transparent border-0 text-white cursor-pointer">X</button>
            </div>
            <div className="relative w-full h-1 mt-2 bg-gray-200 rounded">
                <div
                    className="absolute top-0 left-0 h-full bg-gray-500"
                    style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                ></div>
            </div>
        </div>
    );
};

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type, duration = 3000) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            <div className="toast-container fixed top-5 right-5 flex flex-col items-end gap-4">
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onRemove={removeToast} />
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};