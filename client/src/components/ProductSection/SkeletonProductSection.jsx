import React from 'react'
import SkeletonItemCard from '../ItemCard/SkeletonItemCard'
import ResponsiveGrid from '../../moon-ui/ResponsiveGrid'

const SkeletonProductSection = () => {
    return (
        <div>
            <div className='flex gap-6 items-center animate-pulse'>
                <h2 className='bg-slate-300 h-7 w-32'></h2>
                <div className='bg-gray-200 h-[0.5px] w-full' />
            </div>
            <ResponsiveGrid>
                <SkeletonItemCard />
                <SkeletonItemCard />
                <SkeletonItemCard />
                <SkeletonItemCard />
            </ResponsiveGrid>
        </div>
    )
}

export default SkeletonProductSection