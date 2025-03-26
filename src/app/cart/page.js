'use client'

import CommnonCart from '@/components/commonCart';
import { Globalcontext } from '@/contex';
import { deleteFromCart, getAllCartItems } from '@/services/cart';
import { useContext, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';


function Cart() {
    const { cartItems, setCartITems, user,
        componentLevelLoader, setComponentLevelLoader,
        pagelevelLoader, setPageLevelLoader } = useContext(Globalcontext)

    async function extractAllCartItems() {
        setPageLevelLoader(true)
        const res = await getAllCartItems(user?._id);

        if (res.success) {
            setPageLevelLoader(false)
            setCartITems(res.data)
            localStorage.setItem('cartItems', JSON.stringify(res.data))

        }
    }
    useEffect(() => {
        if (user !== null) extractAllCartItems();

    }, [user])

    async function handleDeleteCartItem(getCartItemId) {
        setComponentLevelLoader({ loading: true, id: getCartItemId });
        const res = await deleteFromCart(getCartItemId);
        
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' });
            toast.success(res.message, {
                position: 'top-right'
            })
           extractAllCartItems();
        } else {
            setComponentLevelLoader({ loading: false, id: '' });
            toast.error(res.message, {
                position: 'top-right'
            })
        }

    }

    if (pagelevelLoader) {
        return (<div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
                color={"#000000"}
                loading={pagelevelLoader}
                size={30}
                data-testid="loader"
            />
        </div>)
    }

    return (
        <CommnonCart cartItems={cartItems}
            handleDeleteCartItem={handleDeleteCartItem}
            componentLevelLoader={componentLevelLoader} />
    )
}

export default Cart
