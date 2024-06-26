import React from 'react'
import ResponsiveGrid from '../../moon-ui/ResponsiveGrid'
import SkeletonItemCard from '../ItemCard/SkeletonItemCard'

const SkeletonProductContainer = () => {
    return (
        <ResponsiveGrid>
            <SkeletonItemCard />
            <SkeletonItemCard />
            <SkeletonItemCard />
            <SkeletonItemCard />
            <SkeletonItemCard />
        </ResponsiveGrid>
    )
}

export default SkeletonProductContainer