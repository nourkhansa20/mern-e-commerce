import DatePicker from 'react-date-picker';
import './DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const CustomDatePicker = ({ onChange, className, label }) => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
        onChange(newDate);
    };

    return (
        <div className={className}>
            <span className='text-sm font-semibold'>{label}</span>
            <DatePicker value={date} onChange={handleDateChange} calendarAriaLabel='Date' />
        </div>
    );
}

export default CustomDatePicker;
