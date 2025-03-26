"use client";

import InputComponent from "@/components/formElements/inputComponent";
import SelectComponent from "@/components/formElements/selectComponent";
import TileComponent from "@/components/formElements/TileComponent";
import { adminAddProductformControls, AvailableSizes, firebaseConfig, firebaseStorageURL } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { get, set } from "mongoose";
import { addNewProduct, updateProduct } from "@/services/product";
import { Globalcontext } from "@/contex";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import ComponentLevelLoader from "@/components/loader/componentlevel";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL)
const initialFormData = {
    name: '',
    price: 0,
    description: '',
    category: 'men',
    sizes: [],
    deliveryInfo: '',
    onSale: 'no',
    imageUrl: '',
    priceDrop: 0,
   
}
const createuniqueFilename = (getFile) => {
    const timestamp = Date.now();
    const randomStringvalue = Math.random().toString(36).substring(2, 12)
    return `${getFile.name}-${timestamp}-${randomStringvalue}`

}
async function helperForUploadingImageTOFirebase(file) {
    const getFileName = createuniqueFilename(file);
    const storageReference = ref(storage, `ecommerce/${getFileName}`)
    const uploadImage = uploadBytesResumable(storageReference, file)

    return new Promise((resolve, reject) => {
        uploadImage.on(
            'state_changed',
            (snapshot) => { },
            (error) => {
                console.log(error);
                reject(error)
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref)
                    .then((downloadUrl)=>resolve(downloadUrl))
                    .catch((error)=>reject(error))
            }
        )
    })

}

function AdminAddNewProduct() {
    const [formData, setFormData] = useState(initialFormData)
    const {componentLevelLoader, setComponentLevelLoader, currentUpdatedProduct, setCurrentUpdatedProduct} = useContext(Globalcontext)
    const router = useRouter()


    async function handleImage(event) {
        const extractImageUrl = await helperForUploadingImageTOFirebase(event.target.files[0])
        console.log(extractImageUrl);
        if (extractImageUrl !== ''){
            setFormData({
                ...formData,
                imageUrl:extractImageUrl
            })
        }


    }
    console.log(formData)
    function handleTileClick(getcurrentItem) {
        let  cpySizes = [...formData.sizes];
        const index= cpySizes.findIndex((item)=>item.id === getcurrentItem.id)

        if(index=== -1){
            cpySizes.push(getcurrentItem)
        }else{
            cpySizes = cpySizes.filter((item)=>item.id !== getcurrentItem.id)
        }
        setFormData({
            ...formData,
            sizes:cpySizes,
        })

    }
    async function handleAddProduct(){
        setComponentLevelLoader({loading:true,id:''})
        const res =currentUpdatedProduct !== null? 
        await updateProduct(formData):await addNewProduct(formData)

        if(res.success){
            setComponentLevelLoader({loading:false,id:''})
            toast.success(res.message,{
                position:"top-right"
            })
            setFormData(initialFormData)
            setCurrentUpdatedProduct(null)
            setTimeout(() => {
                router.push('/admin-view/all-products')
            }, 1000);

        }else{
            setComponentLevelLoader({loadinf:false,id:''})
            toast.error(res.message,{
                position:'top-right'
            })
            

        }

    }
    useEffect(()=>{
        if(currentUpdatedProduct !== null){
            setFormData(currentUpdatedProduct)
        }

    },[currentUpdatedProduct])
    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 ml-0 space-y-8">
                    <input
                        accept="image/*"
                        max='1000000'
                        type="file"
                        onChange={handleImage}
                    />
                    <div className="flex gap-2 flex-col">
                        <label>Available Sizes</label>
                        <TileComponent
                            selected={formData.sizes}
                            onClick={handleTileClick}
                            data={AvailableSizes}
                        />
                    </div>
                    {
                        adminAddProductformControls.map((controlITem) =>
                            controlITem.componentType === 'input' ?
                                (<InputComponent
                                    key={controlITem.id}
                                    label={controlITem.label}
                                    type={controlITem.type}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            [controlITem.id]: event.target.value
                                        })
                                    }
                                    value={formData[controlITem.id]}
                                    placeholder={controlITem.placeholder}
                                />) : (controlITem.componentType === 'select') ? (
                                    <SelectComponent
                                       key={controlITem.id}
                                        label={controlITem.label}
                                        options={controlITem.options}
                                        onChange={(event) =>
                                            setFormData({
                                                ...formData,
                                                [controlITem.id]: event.target.value
                                            })
                                        }
                                        value={formData[controlITem.id]}

                                    />
                                ) : null)
                    }
                    <button
                    onClick={handleAddProduct}
                     className="'inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide">
                      {
                        componentLevelLoader && componentLevelLoader.loading?
                        <ComponentLevelLoader
                        text={currentUpdatedProduct !==null? 'Updating Product':"Adding Product"}
                        color={"#ffffff"}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                        />:(currentUpdatedProduct !== null ?'Update Product':'Add Product')
                      }
                    </button>

                </div>
            </div>
            <Notification />

        </div>
    )
}

export default AdminAddNewProduct
