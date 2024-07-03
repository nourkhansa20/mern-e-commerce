import React, { useEffect, useState } from 'react'
import Table from '../../../moon-ui/Table'
import { useProducts } from '../../../hooks/useProductApi'

const ProductList = () => {
    const [products, setProducts] = useState()

    const { data, isLoading } = useProducts();

    const header = [
        'Name', 'Description', 'Category', 'Price', 'Discount', 'Quantity'
    ]

    useEffect(() => {
        if (data) {
            const newProductArray = data.map(({ _id, category, description, discount, name, price, stockQuantity }) => {
                let categoryName = category.name
                let discountAmount = `${discount.amount}$`
                let _price = `${price}$`

                return { _id, name, description, categoryName, _price, discountAmount, stockQuantity }

            });

            setProducts(newProductArray);
            console.log(newProductArray)
        }

    }, [data])

    if (isLoading) return <>Loading ...</>

    return (
        <div>
            <Table headers={header} data={products} rowsPerPage={2} unvisibleColumn={'0'} />
        </div>
    )
}

export default ProductList