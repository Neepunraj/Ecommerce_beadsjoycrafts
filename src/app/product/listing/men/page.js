import CommonListing from '@/components/commonlisting'
import { productByCategory } from '@/services/product'


async function MenAllProducts() {
    const getallProducts = await productByCategory('men')
    return (
        <CommonListing data={getallProducts && getallProducts.data} />
        
    )
}

export default MenAllProducts
