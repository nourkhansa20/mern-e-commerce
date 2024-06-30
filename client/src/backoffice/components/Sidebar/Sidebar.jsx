import React from 'react'
import Bar from '../../../moon-ui/Bar'
const Sidebar = () => {

    const barItems = [
        {
            title: 'Product',
            to: 'products'
        },
        {
            title: 'User',
            to: 'users'
        },
    ]

    return (
        <Bar type='side'>
            <Bar.Items>
                {
                    barItems.map((item, index) => (
                        <Bar.Item to={item.to} className='w-full text-center hover:bg-primary hover:bg-opacity-20 flex justify-center transition-all divide-purple-300 rounded-md text-white'>
                            <Bar.ItemText>
                                {item.title}
                            </Bar.ItemText>
                        </Bar.Item>
                    ))
                }

            </Bar.Items>
        </Bar>
    )
}

export default Sidebar