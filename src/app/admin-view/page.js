'use client'

import { Globalcontext } from "@/contex"
import { getAllOrdersForAllUSers, updateStatusofOrder } from "@/services/order"
import { useContext, useEffect } from "react"
import { PulseLoader } from "react-spinners"

function AdminView() {
    const { allOrdersForAllUsers, setAllOrdersForAllUsers,
        user, pagelevelLoader, setPageLevelLoader,
        componentLevelLoader, setComponentLevelLoader,

    } = useContext(Globalcontext)

    async function extractAllOrdersForAllUser() {
        setPageLevelLoader(true)

        const res = await getAllOrdersForAllUSers();

        if (res.success) {
            setPageLevelLoader(false)
            setAllOrdersForAllUsers(
                res.data && res.data.length ? res.data.filter((item) => item.user.id !== user._id) : []
            )

        } else {
            setPageLevelLoader(false)
        }
    }
    async function handleUpdateOrderStatus(getItem) {
        setComponentLevelLoader({loading:true,id:getItem._id})
        const res = await updateStatusofOrder({
            ...getItem,
            isProcessing:false,
        })
        if(res.success){
            setComponentLevelLoader({loading:false,id:''})
            extractAllOrdersForAllUser();

        }else{
            setComponentLevelLoader({loading:false,id:''})
        }

    }

    useEffect(() => {
        if (user !== null) extractAllOrdersForAllUser();


    }, [user])

    if (pagelevelLoader) {
        return <div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
                color={"#000000"}
                loading={pagelevelLoader}
                size={30}
                data-testid="loader"
            />
        </div>
    }
    console.log(allOrdersForAllUsers)
    return (
        <section>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                        <div className="flow-root">
                            {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                                <ul className="flex flex-col gap-4">
                                    {
                                        allOrdersForAllUsers.map((item) => (
                                            <li key={item._id}
                                                className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left">
                                                <div className="flex">
                                                    <h1 className="font-bold text-lg mb-3 flex-1">
                                                        #order :{item._id}
                                                    </h1>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">
                                                                User Name:
                                                            </p>
                                                            <p className="text-sm  font-semibold text-gray-900">
                                                                {item?.user?.name}
                                                            </p>

                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">
                                                                User Email:
                                                            </p>
                                                            <p className="text-sm  font-semibold text-gray-900">
                                                                {item?.user?.email}
                                                            </p>

                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">
                                                                Total Paid Amount:
                                                            </p>
                                                            <p className="text-sm  font-semibold text-gray-900">
                                                                ${item?.totalPrice}
                                                            </p>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="flex gap-2">
                                                    {
                                                        item.orderItems.map((orderItem, index) => (
                                                            <div key={index} className="shrink-0">
                                                                <img src={orderItem && orderItem.product &&
                                                                    orderItem.product.imageUrl}
                                                                    alt="order items"
                                                                    className="h-24 w-24 max-w-full rounded-lg object-cover"
                                                                />

                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                                <div className="flex gap-5 ">
                                                    <button
                                                        className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                    >{
                                                            item.isProcessing ? 'Order is Processing' : 'Order is Delivered'
                                                        }

                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateOrderStatus(item)}
                                                        disabled={!item.isProcessing}
                                                        className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                                        {componentLevelLoader && 
                                                        componentLevelLoader.loading
                                                        && componentLevelLoader.id=== item.id?(
                                                            <componentLevelLoader
                                                            text={"Updating Order Status"}
                                                            color={"#ffffff"}
                                                            loading={
                                                              componentLevelLoader &&
                                                              componentLevelLoader.loading
                                                            }
                                                             />
                                                        ):('Update Order Status')}
                                                    </button>

                                                </div>

                                            </li>
                                        ))
                                    }

                                </ul>
                            ) : null}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    )
}

export default AdminView
