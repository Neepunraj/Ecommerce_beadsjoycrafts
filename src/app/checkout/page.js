'use client'

import Notification from "@/components/Notification"
import { Globalcontext } from "@/contex"
import { fetchAllAddress } from "@/services/address"
import { createNewOrder } from "@/services/order"
import { callStripeSession } from "@/services/stripe"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"

function CheckOut() {
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isorderProssesing, setIsorderProcessing] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)
    const { cartItems,
        user, addresses, setAddresses, checkoutFormData, setCheckoutFormData

    } = useContext(Globalcontext)
    const publishableKey = 'pk_test_51PqEEhRogN8CI6sD7mvutMCM6K8JRp0X425p5Kv4RQDnXQHgxivE1SkrxLAanatbbxvuPhfbo5gV7NkgTVdrlTPP00REZosEbk'
    const stripePromise = loadStripe(publishableKey)

    const router = useRouter()
    const params = useSearchParams();

    async function getallAddress() {
        const res = await fetchAllAddress(user?._id)
        if (res.success) {
            setAddresses(res.data)

        }

    }

    useEffect(() => {
        if (user !== null) getallAddress();
    }, [user])

    useEffect(() => {
        async function createFinalOrder() {
            const isStripe = JSON.parse(localStorage.getItem('stripe'));
            if (isStripe && params.get('status') === 'success' && cartItems && cartItems.length) {
                setIsorderProcessing(true);
                const getCheckoutFormData = JSON.parse(localStorage.getItem('checkoutFormData'))

                const createFinalCheckoutFOrmData = {
                    user: user?._id,
                    shippingAddress: getCheckoutFormData.shippingAddress,
                    paymentMethod: 'Stripe',
                    totalPrice: cartItems.reduce((total,item)=>total+item.productID.price,0),
                    isPaid: true,
                    paidAt: new Date(),
                    isProcessing: true,
                    orderItems:cartItems.map((item)=>({
                        qty:1, 
                        product:item.productID
                    }))
                };

                const res = await createNewOrder(createFinalCheckoutFOrmData);
                if (res.success){
                    setIsorderProcessing(false);
                    setOrderSuccess(true);
                    toast.success(res.message,{
                        position:'top-right'
                    })
                }else{
                    setIsorderProcessing(false);
                    setOrderSuccess(false);

                    toast.error(res.message,{
                        position:'top-right'
                    })

                }
            }

        }
        createFinalOrder();

    }, [params.get('status'), cartItems])

    function handleselectedAddress(getAddress) {
        if (getAddress._id === selectedAddress) {
            setSelectedAddress(null)
            setCheckoutFormData({
                ...checkoutFormData,
                shippingAddress: {}
            })
        }



        setSelectedAddress(getAddress._id)
        setCheckoutFormData({
            ...checkoutFormData,
            shippingAddress: {
                ...checkoutFormData.shippingAddress,
                fullName: getAddress.fullName,
                city: getAddress.city,
                country: getAddress.country,
                address: getAddress.address,
                postalCode: getAddress.postalCode,
            }
        })
    }

    async function handleCheckout() {
        const stripe = await stripePromise;
        const createLineItems = cartItems.map((item) => ({

            price_data: {
                currency: "usd",
                product_data: {
                    images: [item.productID.imageUrl],
                    name: item.productID.name,
                },
                unit_amount: item.productID.price * 100,
            },
            quantity: 1,
        }))

        const res = await callStripeSession(createLineItems);
        setIsorderProcessing(true);
        localStorage.setItem('stripe', true)
        localStorage.setItem('checkoutFormData', JSON.stringify(checkoutFormData))
        const { error } = await stripe.redirectToCheckout({
            sessionId: res.id
        })

    }
    
    useEffect(()=>{
        if(orderSuccess){
            setTimeout(()=>{
                router.push('/orders')
            },[2000])
        }


    },[orderSuccess])

    if(orderSuccess){
        return (
            <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  Your payment is successfull and you will be redirected to
                  orders page in 2 seconds !
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>)
    }
    

    if (isorderProssesing) {
        return <div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
                color={"#000000"}
                loading={isorderProssesing}
                size={30}
                data-testid="loader"
            />
        </div>
    }


    return (
        <div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8" >
                    <p className="font-medium text-xl">
                        Cart Summary
                    </p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
                        {
                            cartItems && cartItems.length ? (
                                cartItems.map((item) =>
                                    <div key={item._id}
                                        className="flex flex-col rounded-lg bg-white sm:flex-row"
                                    >
                                        <img
                                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                            src={item && item.productID && item.productID.imageUrl} />
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-bold">{item && item.productID && item.productID.name}</span>
                                            <span className="font-semibold">${item && item.productID && item.productID.price}</span>

                                        </div>

                                    </div>
                                )) : (<p>Your Cart is Empty ! Please add</p>)
                        }

                    </div>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="font-medium text-xl">Shipping Address Details</p>
                    <p>Complete your order by selecting Address Below</p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
                        {
                            addresses && addresses.length ? (
                                addresses.map((item) =>
                                    <div
                                        onClick={() => handleselectedAddress(item)}
                                        className={`border cursor-pointer p-6 ${item._id === selectedAddress ? 'border-green-600' : ''}`}
                                        key={item._id}>
                                        <p>Name: {item.fullName}</p>
                                        <p>Address: {item.address}</p>
                                        <p>City: {item.city}</p>
                                        <p>Country: {item.country}</p>
                                        <p>PostalCode: {item.postalCode}</p>
                                        <button
                                            className="mt-5   inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                            {
                                                item._id === selectedAddress ? 'Selected Address' : 'Select Address'
                                            }
                                        </button>

                                    </div>


                                )) : (<p>No address Found</p>)
                        }

                    </div>
                    <button
                        onClick={() => router.push('/account')}
                        className="mt-5   inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                        Add New address
                    </button>
                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium  text-gray-900"> Subtotal</p>
                            <p className="text-lg font-bold text-gray-900">
                                ${cartItems && cartItems.length ? (
                                    cartItems.reduce((total, item) => item.productID.price + total, 0)
                                ) : '0'

                                }

                            </p>

                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Shipping</p>
                            <p className="text-lg font-bold text-gray-900">Free</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium  text-gray-900"> Total</p>
                            <p className="text-lg font-bold text-gray-900">
                                ${cartItems && cartItems.length ? (
                                    cartItems.reduce((total, item) => item.productID.price + total, 0)
                                ) : '0'

                                }

                            </p>

                        </div>
                        <div className="pb-10">
                            <button
                                disabled={cartItems && cartItems.length === 0 ||
                                    Object.keys(checkoutFormData.shippingAddress).length === 0
                                }
                                onClick={handleCheckout}
                                className="disabled:opacity-50 mt-5 mr-5 w-full  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                Checkout
                            </button>
                        </div>

                    </div>

                </div>

            </div>
            <Notification />


        </div>
    )
}

export default CheckOut
