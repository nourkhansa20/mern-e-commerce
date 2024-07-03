import React, { useEffect, useState } from 'react'
import { useCategories } from '../../../hooks/useCategoryApi'
import CustomSelect from './CustomSelect';

const CategorySelect = ({ onChange = () => { } }) => {
    const { data: categories, isLoading } = useCategories();
    const [options, setOptions] = useState()
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        if (categories) {
            setOptions(categories.map(category => ({ label: category.name, value: category._id })));
        }
    }, [categories]);

    if (isLoading) {
        return (
            <CustomSelect
                options={[{ label: 'Loading...', value: null }]}
            />
        )
    }

    const handleChange = (data) => {
        setSelectedOption(data)
        onChange(data)
    }

    return (
        <CustomSelect
            defaultValue={selectedOption}
            onChange={handleChange}
            options={options}
            label={'Category'}
        />
    );
}

export default CategorySelect