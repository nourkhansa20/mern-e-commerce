import React, { useEffect, useState } from 'react';

const NumberInput = ({ className, showButtons = true, value = 0, onIncrease, onDecrease }) => {
    const [number, setNumber] = useState(value);

    useEffect(() => {
        setNumber(value)
    }, [value])

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            increment();
        } else if (event.key === 'ArrowDown') {
            decrement();
        }
        // Allow only numeric keys, arrow keys, and backspace/delete
        if (
            (event.key >= '0' && event.key <= '9') || // numeric keys
            event.key === 'ArrowUp' ||
            event.key === 'ArrowDown' ||
            event.key === 'Backspace' ||
            event.key === 'Delete' ||
            event.key === 'Tab' // allow tab key for navigation
        ) {
            return;
        } else {
            event.preventDefault();
        }
    };

    const handleChange = (e) => {
        // Ensure input value is numeric
        const value = e.target.value.replace(/\D/g, ''); // replace non-digit characters
        setNumber(Number(value));
    };

    const increment = () => {
        setNumber(prevNumber => prevNumber + 1);
        onIncrease()
    };

    const decrement = () => {
        if (number > 0) {
            setNumber(prevNumber => prevNumber - 1);
            onDecrease()
        }
    };

    return (
        <div className="flex gap-3 items-center">
            {showButtons && <button onClick={decrement} >-</button>}
            <input
                type="text"
                value={number}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={className}
            />
            {showButtons && <button onClick={increment} >+</button>}

        </div>
    );
};

export default NumberInput;
