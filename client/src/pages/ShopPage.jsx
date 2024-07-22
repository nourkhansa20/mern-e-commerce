import React, { useEffect, useState } from 'react';
import Drawer from '../moon-ui/Drawer';
import SideFilter from '../moon-ui/SideFilter';
import FilterIcon from '../moon-ui/icons/FilterIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductsContainer from '../components/ProductsContainer/ProductsContainer';
import { capitalizeFirstLetter } from '../helpers/wordhelper';

const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
};

const ShopPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isfilterDrawerOpen, setIsfilterDrawerOpen] = useState(false);
    const query = useQueryParams();

    const [categoryName, setCategoryName] = useState(capitalizeFirstLetter(query.get('category')) || '');
    const [price, setPrice] = useState(capitalizeFirstLetter(query.get('price')) || '');

    useEffect(() => {
        setCategoryName(capitalizeFirstLetter(query.get('category')) || '');
        setPrice(capitalizeFirstLetter(query.get('price')) || '');
    }, [location.search]);

    const filters = [
        {
            title: 'category',
            type: 'unique',
            options: [
                { label: 'Fashion' },
                { label: 'Electronics' },
                { label: 'Home Appliances' },
                { label: 'Books' }
            ],
        },
        {
            title: 'price',
            type: 'unique',
            options: [
                { label: 'Under $50' },
                { label: '$50 - $100' },
                { label: '$100 - $200' },
                { label: 'Upper $200' },
            ]
        },
    ];

    const getFilter = (data) => {
        navigate(`/shop?${data.query_params.toLowerCase()}`);
        setCategoryName(data.json.category[0]);
    }

    const side_filter = () => (
        <SideFilter
            filters={filters}
            sendFilter={getFilter}
            containerClassName={'lg:w-[27ex] h-fit md:border rounded-md md:border-[2px] border-gray-200 px-5 py-3 sticky md:top-20'}
            groupTitleClassName='mb-[0.80ex] text-[1.7ex] font-semibold'
            groupClassName={'my-3'}
            optionClassName={'text-sm'}
            titleClassName='text-xl font-semibold pb-2 border-b-[1px]'
        />
    );

    return (
        <div className='lg:px-5 px-2 py-6 flex '>
            <Drawer size={30} open={isfilterDrawerOpen} onClose={() => setIsfilterDrawerOpen(prev => !prev)}>
                {side_filter()}
            </Drawer>
            <div className='md:block hidden '>
                {side_filter()}
            </div>

            <div className='w-full'>
                <div className='md:hidden flex gap-1' onClick={() => setIsfilterDrawerOpen(prev => !prev)}>
                    <FilterIcon className='w-4 fill-primary' />
                    <span className='text-md font-semibold text-primary'>Filter</span>
                </div>
                <ProductsContainer limit={0} price={price} category_name={categoryName} />
            </div>
        </div>
    );
}

export default ShopPage;
