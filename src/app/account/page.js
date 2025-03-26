'use client'

import InputComponent from "@/components/formElements/inputComponent"
import ComponentLevelLoader from "@/components/loader/componentlevel"
import Notification from "@/components/Notification"
import { Globalcontext } from "@/contex"
import { addNewAddress, deleteAddress, fetchAllAddress, updateAddress } from "@/services/address"
import { AddnewAddressFormControls } from "@/utils"
import { get } from "mongoose"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"

export default function Account() {
    const [showAddressForm, setShowAddressForm] = useState(false)
    const { user, addressFormData, setAddressFormData, componentLevelLoader, setComponentLevelLoader, pagelevelLoader, setPageLevelLoader,
        addresses, setAddresses, initaladdressFormdata } = useContext(Globalcontext)
    const [currentEditedAddressID, setCurrentEditedAddressID] = useState(null)
    const router = useRouter()


    async function extractAllAddresses() {
        setPageLevelLoader(true)

        const res = await fetchAllAddress(user?._id)
        if (res.success) {
            setPageLevelLoader(false)
            setAddresses(res.data);
        }
    }

    async function handleDeleteAddress(getcurrentAddressId) {

        setComponentLevelLoader({ loading: true, id: getcurrentAddressId })
        const res = await deleteAddress(getcurrentAddressId)
        if (res.success) {
            extractAllAddresses();
            toast.success(res.message, {
                position: 'top-right'
            })
            setComponentLevelLoader({ loading: false, id: '' })


        } else {
            toast.error(res.message, {
                position: 'top-right'
            })
            setComponentLevelLoader({ loading: false, id: '' })

        }

    }
    async function handleAddOrUpdateAddress() {

        setComponentLevelLoader({ loading: true, id: '' })

        const res = currentEditedAddressID !== null ?
            await updateAddress({
                ...addressFormData, _id: currentEditedAddressID
            }) : await addNewAddress({
                ...addressFormData, userID: user?._id
            })
        if (res.success) {
            setShowAddressForm(false)
            setComponentLevelLoader({ loading: false, id: '' })

            toast.success(res.message, {
                position: 'top-right'
            })

            setAddressFormData(initaladdressFormdata)
            extractAllAddresses();
            setCurrentEditedAddressID(null);

        } else {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.error(res.message, {
                position: 'top-right'
            })
            setAddressFormData(initaladdressFormdata)
            setCurrentEditedAddressID(null);

        }

    }
    console.log(addressFormData)
    function handleUpdateAddress(itemAddress) {

        setShowAddressForm(true)

        setAddressFormData({
            fullName: itemAddress.fullName,
            city: itemAddress.city,
            country: itemAddress.country,
            postalCode: itemAddress.postalCode,
            address: itemAddress.address,
        })
        setCurrentEditedAddressID(itemAddress._id)

    }


    useEffect(() => {
        if (user !== null) extractAllAddresses();

    }, [user])
    return (
        <section>
            <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow">
                    <div className="p-6 sm:p-12">
                        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                            {/* we have to render random user image here */}

                        </div>
                        <div className="flex flex-col flex-1">
                            <h4 className="text-lg font-semibold text-center md:text-left uppercase" >
                                {user?.name}

                            </h4>
                            <p>{user?.email}</p>
                            <p>{user?.role}</p>

                        </div>
                        <button
                            onClick={() => router.push('/orders')}
                            className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            View Your Orders
                        </button>
                        <div className="mt-6">
                            <h1 className="font-bold text-lg ">
                                Your Address:

                            </h1>
                            {
                                pagelevelLoader ? (
                                    <PulseLoader
                                        color={"#000000"}
                                        loading={pagelevelLoader}
                                        size={15}
                                        data-testid="loader"

                                    />
                                ) : (
                                    <div className='mt-4 flex flex-col gap-4'>
                                        {
                                            addresses && addresses.length ? (
                                                addresses.map((item) =>
                                                    <div className="border  p-6" key={item._id}>
                                                        <p>Name: {item.fullName}</p>
                                                        <p>Address: {item.address}</p>
                                                        <p>City: {item.city}</p>
                                                        <p>Country: {item.country}</p>
                                                        <p>PostalCode: {item.postalCode}</p>
                                                        <button
                                                            onClick={() => handleUpdateAddress(item)}
                                                            className="mt-5   inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                                            update
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAddress(item._id)}
                                                            className="mt-5 ml-6 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                                            {
                                                                componentLevelLoader && componentLevelLoader.loading &&
                                                                    componentLevelLoader.id === item._id ? (
                                                                    <ComponentLevelLoader
                                                                        text={"Deleting "}
                                                                        color={"#ffffff"}
                                                                        loading={
                                                                            componentLevelLoader && componentLevelLoader.loading
                                                                        }
                                                                    />

                                                                ) : 'Delete'
                                                            }
                                                        </button>
                                                    </div>)
                                            )
                                                : <p>
                                                    No Address Found! Please add New Address
                                                </p>
                                        }

                                    </div>
                                )
                            }

                        </div>
                        <div className="mt-4" >
                            <button
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                {showAddressForm ? 'Hide Address Form' : 'Add New Address'}
                            </button>

                        </div>
                        {
                            showAddressForm ? (
                                <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                                    <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                                        {
                                            AddnewAddressFormControls.map((controlItem) =>
                                            (
                                                <InputComponent
                                                    type={controlItem.type}
                                                    placeholder={controlItem.placeholder}
                                                    label={controlItem.label}
                                                    value={addressFormData[controlItem.id]}
                                                    onChange={(event) => {
                                                        setAddressFormData({
                                                            ...addressFormData,
                                                            [controlItem.id]: event.target.value,
                                                        })
                                                    }}
                                                />
                                            ))

                                        }
                                    </div>
                                    <button
                                        onClick={handleAddOrUpdateAddress}
                                        className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                                        {
                                            componentLevelLoader && componentLevelLoader.loading ?
                                                (
                                                    <ComponentLevelLoader
                                                        text={"Saving"}
                                                        color={"#ffffff"}
                                                        loading={
                                                            componentLevelLoader && componentLevelLoader.loading
                                                        }
                                                    />
                                                ) : 'Save'
                                        }
                                    </button>

                                </div>
                            ) : null
                        }


                    </div>


                </div>
                <Notification />
            </div>
        </section>
    )
}