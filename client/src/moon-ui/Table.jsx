// src/components/Table.js
import React, { useState } from 'react';

const Table = ({ data = [], headers = [], rowsPerPage, unvisibleColumn = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Ensure we have data and it's not empty
    const jsonVariablesName = data.length > 0 ? getJsonPropertyNames(data[0]) : [];

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfFirstRow + rowsPerPage);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        return (
            <div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button key={number} onClick={() => handleClick(number)}>
                        {number}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {headers.map((head, index) => (
                            <th className='p-2 w-[20ex]' key={`${head}-${index}`}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row) => (
                        <tr key={row._id} >
                            {jsonVariablesName.map((prop, index) => !unvisibleColumn.includes(index) && (
                                <td
                                    key={`${row._id}-${prop}`}
                                    className='p-2 border text-center'
                                >{row[prop]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {renderPageNumbers()}
        </div>
    );
};

export default Table;

function getJsonPropertyNames(jsonObj) {
    if (typeof jsonObj !== 'object' || jsonObj === null) {
        throw new Error('Input must be a JSON object');
    }
    return Object.keys(jsonObj);
}
