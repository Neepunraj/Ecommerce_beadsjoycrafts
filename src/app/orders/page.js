'use client'

import Notification from "@/components/Notification";
import { Globalcontext } from "@/contex";
import {  getAllOrdersForUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react"
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Orders() {
    const { user, pagelevelLoader, setPageLevelLoader,
        allOrdersForUsers, setAllOrdersForUsers

    } = useContext(Globalcontext)
    const router = useRouter()



    async function extractAllOrders() {
        setPageLevelLoader(true)
        const res = await getAllOrdersForUser(user?._id)
       

        if (res.success) {
            setPageLevelLoader(false)
            setAllOrdersForUsers(res.data)

            toast.success(res.message, {
                position: 'top-right'
            })

        } else {
            setPageLevelLoader(false)
            toast.error(res.message, {
                position: 'top-right'
            })
        }



    }


    useEffect(() => {
        if (user !== null) extractAllOrders();
    }, [user])

    if (pagelevelLoader) {
        <div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
                color={"#000000"}
                loading={pagelevelLoader}
                size={30}
                data-testid="loader"
            />
        </div>
    }
    console.log(allOrdersForUsers)
    return (
        <section>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                {
                                    allOrdersForUsers && allOrdersForUsers.length ? (
                                        <ul className="flex flex-col gap-4">
                                            {
                                                allOrdersForUsers.map((item) =>
                                                    <li key={item._id}
                                                        className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left">
                                                        <div className="flex">
                                                            <h1 className="font-bold text-lg mb-3 flex-1">
                                                                #order :{item._id}
                                                            </h1>
                                                            <div className="flex items-center">
                                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                                    Total Paid Amount
                                                                </p>
                                                                <p className="mr-3 text-2xl  font-semibold text-gray-900">${item.totalPrice}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {
                                                                item.orderItems.map((orderItem, index) => (
                                                                    <div key={index} className="shrink-0">
                                                                        <img
                                                                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                                                                            src={orderItem && orderItem.product &&
                                                                                orderItem.product.imageUrl} alt='orderItem' />
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                        <div className="flex gap-5">
                                                            <button className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                                                {item.isProcessing ? "Order is Processing" : "Order is Delivered"}
                                                            </button>
                                                            <button 
                                                            onClick={()=>router.push(`/orders/${item._id}`)}
                                                            className=" mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                                               View Order Details
                                                            </button>

                                                        </div>



                                                    </li>)
                                            }
                                        </ul>
                                    )

                                        : null }

                            </div>

                        </div>

                    </div>
                </div>

            </div>
            <Notification />
        </section>
    )
}