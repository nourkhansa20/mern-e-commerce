import React, { useEffect, useState } from 'react'


const NumberPadButton = ({ text, onClick }) => {
    return (
        <button
            key={text}
            onClick={onClick}
            className="bg-gray-100 text-black p-4 px-10 rounded-md"
        >
            {text}
        </button>
    )
}

const MobileNumberPad = ({ sendPayementAmount, onSubmit }) => {
    const [amount, setAmount] = useState('0');

    const handleClick = (value) => {
        setAmount((prev) => (prev === '0' ? value : prev + value));
    };

    const handleClear = () => {
        setAmount('0');
    };

    const handleBackspace = () => {
        setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    };

    const _onSubmit = () => {
        onSubmit(amount)
    }

    useEffect(() => {
        sendPayementAmount(amount)
    }, [amount])

    return (
        <div className='flex w-full justify-center gap-2'>
            <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '.'].map((num) => (
                    <NumberPadButton text={num} key={num} onClick={() => handleClick(num.toString())} />
                ))}

            </div>
            <div className='flex flex-col gap-2'>
                <NumberPadButton text={'<'} onClick={handleBackspace} />
                <NumberPadButton text={'-'} onClick={handleClear} />
                <NumberPadButton text={'.'} />
                <NumberPadButton text={'+'} onClick={_onSubmit} />
            </div>
        </div>

    );
};

export default MobileNumberPad