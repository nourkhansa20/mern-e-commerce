import React from 'react'
import ProductList from '../../components/List/ProductList'
import { PrimaryButton } from '../../../moon-ui/Buttons'
import { Link } from 'react-router-dom'
const Product = () => {
    return (
        <div>
            <PrimaryButton>
                <Link to='new'>New Product</Link>
            </PrimaryButton>
            <ProductList />
        </div>
    )
}

export default Product