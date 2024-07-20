import React from 'react'
import ResponsiveGrid from '../../moon-ui/ResponsiveGrid'
import ItemCard from '../ItemCard/ItemCard'
import { useQuery } from 'react-query'
import SkeletonProductContainer from './SkeletonProductContainer'
import { useProducts } from '../../hooks/useProductApi'

const ProductsContainer = ({ category_name = '', price = '', limit = 0, containerClassName }) => {

    const { data, isFetching, isError, isLoading } = useProducts(category_name, price)

    if (isLoading || isFetching) {
        return <SkeletonProductContainer />
    }

    if (isError) {
        return <p>Error loading products</p>;
    }
    return (
        <ResponsiveGrid containerClassName={containerClassName}>

            {limit > 0 &&
                data.map((product, index) => (index < limit) && (
                    <ItemCard key={product._id} product={product} />
                ))
            }
            {limit == 0 &&
                data.map((product, index) => (
                    <ItemCard key={product._id} product={product} />
                ))
            }
        </ResponsiveGrid>
    )
}

export default ProductsContainer