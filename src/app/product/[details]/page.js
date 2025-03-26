import CommonDetails from '@/components/commonDetails'
import { productbyId } from '@/services/product'
import React from 'react'

async function ProductDetails({params}) {
    const productDetailsData = await productbyId(params.details)
    return (
        <CommonDetails item={productDetailsData && productDetailsData.data} />
    )
}

export default ProductDetails
