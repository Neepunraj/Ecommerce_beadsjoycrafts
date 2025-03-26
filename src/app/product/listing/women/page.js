import CommonListing from '@/components/commonlisting'
import { productByCategory } from '@/services/product'
import React from 'react'

async function WomenAllProducts() {
    const getallProducts = await productByCategory('women')
    return (
        <CommonListing data={getallProducts && getallProducts.data} />
    )
}

export default WomenAllProducts
