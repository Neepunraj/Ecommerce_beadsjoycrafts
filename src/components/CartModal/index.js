'use client'

import { Fragment, useContext, useEffect } from "react"
import CommonModal from "../commonModal"
import { Globalcontext } from "@/contex"
import { deleteFromCart, getAllCartItems } from "@/services/cart"
import ComponentLevelLoader from "../loader/componentlevel"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"


function CartModal() {
    const { showCartModal, setshowCartModel, user, cartItems, setCartITems, componentLevelLoader, setComponentLevelLoader, } = useContext(Globalcontext)
const router = useRouter()
    async function extractAllCartItems() {
        const res = await getAllCartItems(user?._id);
        console.log(res)
        if (res.success) {
            setCartITems(res.data)
            localStorage.setItem('cartItems', JSON.stringify(res.data))

        }
    }
    async function handleDeleteCartItem(getCartItemId) {
        setComponentLevelLoader({loading:true, id:getCartItemId})
        const res = await deleteFromCart(getCartItemId)
        if(res.success){
            setComponentLevelLoader({loading:false, id:''})
            toast.success(res.message,{
                position:'top-right'
            })
            extractAllCartItems();
        }else{
            setComponentLevelLoader({loading:false, id:''})
            toast.error(res.message,{
                position:'top-right'
            })
        }


    }
    useEffect(() => {
        if (user !== null) extractAllCartItems();
    }, [user])
    return (
        <CommonModal
            showButtons={true}
            show={showCartModal}
            setShow={setshowCartModel}
            mainContent={
                cartItems && cartItems.length ? (
                    <ul role='list' className="-my-6 divide-y divide-gray-300">
                        {
                            cartItems.map((cartItem) => (
                                <li key={cartItem.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={cartItem && cartItem.productID && cartItem.productID.imageUrl}
                                            alt='Cart- Item'
                                            className="h-full w-full object-cover object-center"
                                        />

                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a>
                                                        {
                                                            cartItem && cartItem.productID && cartItem.productID.name
                                                        }
                                                    </a>
                                                </h3>

                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">
                                                ${
                                                    cartItem && cartItem.productID && cartItem.productID.price
                                                }

                                            </p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteCartItem(cartItem._id)}
                                                className="font-medium text-yellow-600 sm:order-2"
                                            >
                                                {
                                                    componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === cartItem._id ?
                                                        (
                                                            <ComponentLevelLoader
                                                                text={"Removing"}
                                                                color={"#000000"}
                                                                loading={
                                                                    componentLevelLoader && componentLevelLoader.loading}
                                                                    />
                                            ) : 'Remove'

                                                }
                                            </button>

                                        </div>

                                    </div>

                                </li>
                            ))
                        }

                    </ul>
                ) : 'Your Cart is Empty'
            }
            buttonComponent={
                <Fragment>
                    <button
                    disabled={cartItems && cartItems.length === 0}
                    type='button'
                    onClick={()=>{
                        router.push('/cart')
                        setshowCartModel(false)
                    }}
                     className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                     >Go to Cart</button>
                    <button
                    type="button"
                    onClick={()=>{
                        router.push('/checkout');
                        setshowCartModel(false)
                    }}
                     className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50">Check Out</button>
               <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
                <button type="button" className="font-medium text-grey"
                onClick={()=>setshowCartModel(false)}>
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>

                </button>

               </div>
                </Fragment>
            }
        />

    )
}

export default CartModal
