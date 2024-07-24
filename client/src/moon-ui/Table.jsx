// src/components/Table.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
};

const Table = ({ data = [], headers = [], rowsPerPage = 5, unvisibleColumn = [], tableClassName, headerClassName = 'p-2 w-[20ex]' }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Ensure we have data and it's not empty
    const jsonVariablesName = data.length > 0 ? getJsonPropertyNames(data[0]) : [];

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfFirstRow + rowsPerPage);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const navigate = useNavigate()
    const query = useQueryParams();
    const location = useLocation()

    const handleClick = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(query.get('page') || '1');
    }, [location.search]);

    const renderPageNumbers = () => {
        return (
            <div className='flex w-full items-center justify-center gap-5 mt-3'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button key={number} onClick={() => handleClick(number)}
                        className={`${currentPage == number ? 'bg-primary' : 'bg-secondary'} text-white size-8 rounded-md transition-all duration-300 `}
                    >
                        {number}
                    </button>
                ))
                }
            </div >
        );
    };

    return (
        <div>
            <table className={tableClassName}>
                <thead>
                    <tr>
                        {headers.map((head, index) => (
                            <th className={`${headerClassName}`} key={`${head}-${index}`}>{head}</th>
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
