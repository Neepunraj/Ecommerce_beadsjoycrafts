


//add new product service 

import { cache } from "joi";
import Cookies from "js-cookie"

export const addNewProduct = async (formData)=>{

    try{
        const response = await fetch('/api/admin/add-product',{
            method:'POST',
            headers:{
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body:JSON.stringify(formData)
        })
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err)
    }
}

export const getAllAdminProducts = async()=>{
    try{
        const response = await fetch('http://localhost:3000/api/admin/all-products',{
            method:'GET',
            cache:'no-store'
        })
        const data = await response.json();
            return data;

    }catch(error){
        console.log(error)
    }

}
export  const updateProduct = async (formData)=>{
    try{
        const response = await fetch('/api/admin/update-product',{
            method:'PUT',
            headers:{
                'content-type':'application/json',
            Authorization:`Bearer ${Cookies.get('token')}`
            },
            body:JSON.stringify(formData)
        })
        const data = await response.json();
        return data;

    }catch(error){
        console.log(error)
    }
}

export const deleteAProduct = async (id)=>{
    try{

        const response = await fetch( `/api/admin/delete-product?id=${id}`,{
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error)
    }
}   
export const productByCategory = async(id)=>{
    try{
        const response = await fetch (`http://localhost:3000/api/admin/product-by-category?id=${id}`,{
            method:'GET'}
        )
        const data = await response.json();
        return data;

    }catch(error){
        console.log(error)
    }

}

export const productbyId = async(id)=>{
    try{
        const response = await fetch(`http://localhost:3000/api/admin/product-by-id?id=${id}`,{
            method:'GET',
            cache:'no-store'
            
        })
        const data = await response.json()
        return data;

    }catch(error){
        console.log(error)
    }
}