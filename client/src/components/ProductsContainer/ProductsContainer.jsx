import React from 'react'
import ResponsiveGrid from '../../moon-ui/ResponsiveGrid'
import ItemCard from '../ItemCard/ItemCard'
import { useQuery } from 'react-query'
import SkeletonProductContainer from './SkeletonProductContainer'
import { fetchAllProducts, fetchProductsByCategory } from '../../api/productApi'

const ProductsContainer = ({ category_name = '', limit = 0, containerClassName }) => {
    const { data, isLoading, isError, isFetching } = useQuery(['category', category_name], () => {
        if (category_name) {
            return fetchProductsByCategory(category_name)
        } else {
            return fetchAllProducts()
        }
    });

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
                    <ItemCard  key={product.id} product={product} />
                ))
            }
            {limit == 0 &&
                data.map((product, index) => (
                    <ItemCard key={product.id} product={product} />
                ))
            }
        </ResponsiveGrid>
    )
}

export default ProductsContainer