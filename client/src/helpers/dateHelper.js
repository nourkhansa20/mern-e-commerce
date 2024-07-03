const formatDate = (date) => {
    // Create a Date object if the input is a string
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Extract day, month, and year from the date object
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getFullYear();

    // Return the formatted date
    return `${day}/${month}/${year}`;
};