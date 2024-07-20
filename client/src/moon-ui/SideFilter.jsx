import React, { useState, useEffect, useRef } from 'react';
import { capitalizeFirstLetter, jsonToQueryParams, queryParamsToJson } from '../helpers/wordhelper';
import MiniArrow from './icons/MiniArrow'
import { useLocation } from 'react-router-dom';

const SideFilter = ({ filters = [], sendFilter = () => { }, containerClassName = 'w-64 p-4 bg-white border rounded-lg shadow-md', groupClassName, optionClassName, titleClassName = 'text-xl font-bold mb-4', groupTitleClassName }) => {


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    let query_params = '';

    const appendQueryParam = (paramName, paramValue) => {
        if (paramValue) {
            query_params += `&${paramName}=${encodeURIComponent(paramValue)}`;
        }
    };

    filters.forEach(filter => {
        const { title, options } = filter;
        const paramValue = queryParams.get(title);

        if (Array.isArray(options)) {
            // Handle array options
            appendQueryParam(title, paramValue);
        } else if (options.type === 'unique') {
            // Handle unique options
            const option = options.find(opt => opt.label === paramValue);
            appendQueryParam(title, option ? option.label : '');
        } else {
            // Handle nested options
            const option = findNestedOption(options, paramValue);
            appendQueryParam(title, option ? option.label : '');
        }
    });

    if (query_params !== 'shop') {
        query_params = query_params.replace(/^&/, '?');
    }

    const initialSelectedOptions = queryParamsToJson(query_params.substring(1));

    filters.forEach(filter => {
        if (!initialSelectedOptions[filter.title]) {
            initialSelectedOptions[filter.title] = [];
        }
    });

    const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);
    const initialOptionsRef = useRef(initialSelectedOptions);

    const handleOptionChange = (category, selectedValues, type) => {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [category]: type === 'unique' ? selectedValues.slice(-1) : selectedValues
        }));
    };

    useEffect(() => {
        // if (JSON.stringify(selectedOptions) !== JSON.stringify(initialOptionsRef.current)) {
        sendFilter({ json: selectedOptions, query_params: jsonToQueryParams(selectedOptions) });
        // }
    }, [selectedOptions]);

    return (
        <div className={`${containerClassName}`}>
            <h2 className={`${titleClassName}`}>SHOP BY</h2>
            {filters.map((filter, index) => (
                <FilterGroup
                    key={index}
                    title={filter.title}
                    options={filter.options}
                    type={filter.type}
                    onOptionChange={handleOptionChange}
                    selectedOptions={selectedOptions[filter.title]}
                    setSelectedOptions={(values) => handleOptionChange(filter.title, values, filter.type)}
                    selectedOptionsAll={selectedOptions}
                    groupClassName={groupClassName}
                    groupTitleClassName={groupTitleClassName}
                    optionClassName={optionClassName}
                />
            ))}
        </div>
    );
};

const FilterGroup = ({ title, options, type, onOptionChange, selectedOptions, setSelectedOptions, selectedOptionsAll, groupClassName = 'mb-4', optionClassName, groupTitleClassName = 'text-lg font-semibold mb-2' }) => {
    return (
        <div className={`${groupClassName}`}>
            <h3 className={`${groupTitleClassName}`}>{capitalizeFirstLetter(title)}</h3>
            <ul>
                {options.map((option, index) => (
                    <FilterOption
                        key={index}
                        option={option}
                        onOptionChange={onOptionChange}
                        parentLabels={[title]}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                        type={type}
                        selectedOptionsAll={selectedOptionsAll}
                        optionClassName={optionClassName}
                    />
                ))}
            </ul>
        </div>
    );
};

const FilterOption = ({ option, onOptionChange, parentLabels, selectedOptions, setSelectedOptions, type, selectedOptionsAll, optionClassName = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubOptions = option.subOptions && option.subOptions.length > 0;

    const isChecked = selectedOptions && selectedOptions.includes(option.label);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleChange = () => {
        if (type === 'unique') {
            if (isChecked) {
                setSelectedOptions([]);
                onOptionChange(parentLabels[0], [], type);
            } else {
                setSelectedOptions([option.label]);
                onOptionChange(parentLabels[0], [option.label], type);
            }
        } else {
            if (isChecked) {
                const updatedSelection = selectedOptions.filter(label => label !== option.label);
                setSelectedOptions(updatedSelection);
                onOptionChange(parentLabels[0], updatedSelection, type);
            } else {
                setSelectedOptions([...selectedOptions, option.label]);
                onOptionChange(parentLabels[0], [...selectedOptions, option.label], type);
            }
        }
    };

    useEffect(() => {
        if (hasSubOptions) {
            const hasCheckedSubOption = option.subOptions.some(subOption =>
                selectedOptionsAll[parentLabels[0]] && selectedOptionsAll[parentLabels[0]].includes(subOption.label)
            );
            setIsOpen(hasCheckedSubOption);
        }
    }, []);

    return (
        <li className="mb-1">
            <div className={`flex justify-between w-full ${optionClassName}`}>
                <div className='w-full flex'>
                    <input type="checkbox" className="form-checkbox cursor-pointer" checked={isChecked} onChange={handleChange} />
                    <div className={`ml-2 ${hasSubOptions && 'cursor-pointer'} w-full`} onClick={toggleOpen} >{option.label}</div>
                </div>
                {hasSubOptions && (
                    <MiniArrow className={`w-4 ml-1 cursor-pointer ${isOpen ? 'rotate-90 mt-2' : '-rotate-90 mb-1.5'} transition-all duration-300`} onClick={toggleOpen} />
                )}
            </div>
            {isOpen && hasSubOptions && (
                <ul className="ml-4 mt-2 ">
                    {option.subOptions.map((subOption, index) => (
                        <FilterOption
                            key={index}
                            option={subOption}
                            onOptionChange={onOptionChange}
                            parentLabels={[...parentLabels, option.label]}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            type={type}
                            selectedOptionsAll={selectedOptionsAll}
                            optionClassName={optionClassName}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SideFilter;