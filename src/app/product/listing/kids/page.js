import CommonListing from '@/components/commonlisting'
import { productByCategory } from '@/services/product'


async function KidsAllProducts() {
    const getallProducts = await productByCategory('kids')
    return (
        <CommonListing data={getallProducts && getallProducts.data} />
    )
}

export default KidsAllProducts
