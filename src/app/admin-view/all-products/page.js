import CommonListing from "@/components/commonlisting"
import { getAllAdminProducts } from "@/services/product"

async function AdminAllProducts() {
    const allAdminProducts = await getAllAdminProducts();
 
    return (
        <CommonListing  data={allAdminProducts && allAdminProducts.data}/>
    )
}

export default AdminAllProducts
