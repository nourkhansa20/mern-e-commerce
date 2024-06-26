import React, { useState } from 'react'
import Drawer from '../moon-ui/Drawer'
import SideFilter from '../moon-ui/SideFilter'
import FilterIcon from '../moon-ui/icons/FilterIcon'
import { useNavigate } from 'react-router-dom';
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'

const ShopPage = () => {
    const navigate = useNavigate()
    const [isfilterDrawerOpen, setIsfilterDrawerOpen] = useState(false)

    const filters = [
        {
            title: 'category',
            options: [
                {
                    label: 'Jackets',
                    subOptions: [
                        { label: 'Casual Jackets' },
                        { label: 'Formal Jackets' }
                    ]
                },
                {
                    label: 'Sweaters',
                    subOptions: [
                        {
                            label: 'Knitted Sweaters',
                            subOptions: [
                                { label: 'Cotton' },
                                { label: 'Wool' }
                            ]
                        }
                    ]
                },
                { label: 'Bottoms' }
            ],
        },
        {
            title: 'price',
            type: 'unique',
            options: [
                { label: 'Under $50' },
                { label: '$50 - $100' },
                { label: '$100 - $200' }
            ]
        },
        {
            title: 'manufacturer',
            options: [
                { label: 'Brand A' },
                { label: 'Brand B' },
                { label: 'Brand C' }
            ]
        },
        {
            title: 'color',
            options: [
                { label: 'Red' },
                { label: 'Blue' },
                { label: 'Green' },
                { label: 'Yellow' },
                { label: 'Black' },
                { label: 'White' }
            ]
        }
    ];

    const getFilter = (data) => {
        navigate(`/shop?${data.query_params}`)
    }

    const side_filter = () => {
        return (
            <SideFilter
                filters={filters}
                sendFilter={getFilter}
                containerClassName={'lg:w-[27ex] h-fit border rounded-md  border-[2px] border-gray-200 px-5 py-3'}
                groupTitleClassName='mb-[0.80ex] text-[1.7ex] font-semibold'
                groupClassName={'my-3'}
                optionClassName={'text-sm '}
                titleClassName='text-xl font-semibold pb-2 border-b-[1px]'
            />
        )

    }
    return (
        <div className='lg:px-5 px-2 py-6 border-b-2 flex '>

            <Drawer size={30} open={isfilterDrawerOpen} onClose={() => setIsfilterDrawerOpen(prev => !prev)}>
                {side_filter()}
            </Drawer>
            <div className='md:block hidden' >
                {side_filter()}
            </div>


            <div className='w-full'>
                <div className='md:hidden flex gap-1' onClick={() => setIsfilterDrawerOpen(prev => !prev)}>
                    <FilterIcon className='w-4 fill-primary' />
                    <span className='text-md font-semibold text-primary'>Filter</span>
                </div>
                <ProductsContainer limit={0} />
            </div>

        </div>
    )
}

export default ShopPage
