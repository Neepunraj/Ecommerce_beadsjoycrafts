'use client'
import ComponentLevelLoader from '@/components/loader/componentlevel';
import { Globalcontext } from '@/contex';
import { addToCart } from '@/services/cart';
import { deleteAProduct } from '@/services/product';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

function ProductButton({ item }) {
    const { setCurrentUpdatedProduct, componentLevelLoader, setComponentLevelLoader,user, showCartModal,setshowCartModel } = useContext(Globalcontext)
    const pathName = usePathname();
    const router = useRouter();
    const isAdminView = pathName.includes("admin-view");


    async function handleDeleteProduct(item) {
        setComponentLevelLoader({ loading: true, id: item._id });
        const res = await deleteAProduct(item._id)
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' });
            toast.success(res.message, {
                position: 'top-right'
            })
            router.refresh();

        } else {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.error(res.message, {
                position: 'top-right'

            })
        }
    }
    async function handleAddToCart(getItem){
        
        setComponentLevelLoader({loading:true,id:getItem._id});
        const res = await addToCart({productID:getItem._id,userID:user._id})
        if(res.success){
            toast.success(res.message,{
                position:'top-right'
            })
            setComponentLevelLoader({loading:false,id:''})
            setshowCartModel(true)
        }else{
            toast.error(res.message,{
                position:'top-right'
            })
            setComponentLevelLoader({loading:false,id:''})
            setshowCartModel(true)

        }



    }
    return (
        isAdminView ? <>
            <button
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                onClick={() => {
                    setCurrentUpdatedProduct(item)
                    router.push('/admin-view/add-product')
                }

                }
            >
                Update
            </button>
            <button
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                onClick={() => handleDeleteProduct(item)}
            >{
                    componentLevelLoader && componentLevelLoader.loading && item._id === componentLevelLoader.id ? (
                        <ComponentLevelLoader
                            text={'Deleting Product'}
                            color={'#ffffff'}
                            loading={componentLevelLoader && componentLevelLoader.loading} />
                    ) : 'DELETE'
                }
            </button>
        </> :
            <>
                <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >{
                        componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === item._id ?
                            (<ComponentLevelLoader
                                text={"Adding to cart"}
                                color={"#ffffff"}
                                loading={componentLevelLoader && componentLevelLoader.loading}
                            />) : 'Add to Cart'
                    }
                </button>
            </>
    )
}

export default ProductButton
