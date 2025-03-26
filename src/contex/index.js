"use client"
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const Globalcontext = createContext(null)

export const initialCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: '',
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true
}
const protectedRoutes = ['carts', 'checkout', 'account', 'orders', 'admin-view'];
const protectedAdminRoutes = [
    '/admin-view',
    '/admin-view/add-product',
    '/admin-view/all-products'
]


function GlobalState({ children }) {
    const [showNavModal, setShowNavModal] = useState(false)
    const [product, setProduct] = useState([])

    const [isAuthUser, setIsAuthUser] = useState(null)
    const [user, setUSer] = useState(null)
    const [pagelevelLoader, setPageLevelLoader] = useState(false)
    const [componentLevelLoader, setComponentLevelLoader] = useState({
        loading: false,
        id: ''
    })
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null)
    const [showCartModal, setshowCartModel] = useState(false)
    const [cartItems, setCartITems] = useState([]);
    const [addresses, setAddresses] = useState([])
    const initaladdressFormdata = {
        fullName: '',
        city: '',
        country: '',
        address: '',
        postalCode: '',
    }
    const [addressFormData, setAddressFormData] = useState(initaladdressFormdata)
    const [checkoutFormData, setCheckoutFormData] = useState(initialCheckoutFormData)
    const [allOrdersForUsers,setAllOrdersForUsers] = useState([])
    const [orderDetails,setOrderDetails] = useState([])
    const [allOrdersForAllUsers,setAllOrdersForAllUsers]= useState([]);

    const router = useRouter();
    const pathName = usePathname();


    useEffect(() => {
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            const getCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setUSer(userData)
            setCartITems(getCartItems)
        } else {
            setIsAuthUser(false);
            setUSer({})

        }

    }, [Cookies])

    useEffect(() => {
        if (pathName !== '/register' && !pathName.includes('product')
            && pathName !== '/' &&
            user && Object.keys(user).length === 0
            && protectedRoutes.includes(pathName) > -1) {

            router.push('/login')

        }


    }, [user, pathName])
    useEffect(() => {
        if (user != null &&
            user &&
            Object.keys(user).length > 0 &&
            user?.role !== 'admin' &&
            protectedAdminRoutes.indexOf(pathName) > -1) {

            router.push('/unauthorized-page')

        }


    }, [user, pathName])

    return (

        <Globalcontext.Provider
            value={{
                initaladdressFormdata,
                isAuthUser, setIsAuthUser,
                user, setUSer,
                showNavModal, setShowNavModal,
                componentLevelLoader, setComponentLevelLoader,
                pagelevelLoader, setPageLevelLoader,
                currentUpdatedProduct, setCurrentUpdatedProduct,
                showCartModal, setshowCartModel,
                cartItems, setCartITems,
                addressFormData, setAddressFormData,
                addresses, setAddresses,
                checkoutFormData, setCheckoutFormData,
                allOrdersForUsers,setAllOrdersForUsers,
                orderDetails,setOrderDetails,
                allOrdersForAllUsers,setAllOrdersForAllUsers


            }} >{children}</Globalcontext.Provider>

    )
}

export default GlobalState
