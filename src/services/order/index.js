import Cookies from "js-cookie"


export const createNewOrder = async (formData) => {
    try{
        const res = await fetch('/api/order/create-order',{
            method:'POST',
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${Cookies.get('token')}`
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json();
        return data;

    }catch(e){
        console.log(e)
    }
    
}
export const getAllOrdersForUser =async (id)=>{
    try{
        const res = await fetch(`/api/order/get-all-orders?id=${id}`,{
            method:'GET',
            headers:{
                
                Authorization:`Bearer ${Cookies.get('token')}`
            },
        })
        const data = await res.json();
        return data;

    }catch(e){
        console.log(e)
    }
}
export const getOrderDetails =async (id)=>{
    try{
        const res = await fetch(`/api/order/order-details?id=${id}`,{
            method:'GET',
            headers:{
                
                Authorization:`Bearer ${Cookies.get('token')}`
            },
        })
        const data = await res.json();
        return data;

    }catch(e){
        console.log(e)
    }

}
export const getAllOrdersForAllUSers = async()=>{
    try{
        const res = await fetch(`/api/admin/orders/get-all-orders`,{
            method:'GET',
            headers:{
                
                Authorization:`Bearer ${Cookies.get('token')}`
            },
        })
        const data = await res.json();
        return data;

    }catch(e){
        console.log(e)
    }

}
export const updateStatusofOrder = async (formData)=>{
    try{
        const res = await fetch(`/api/admin/orders/update-order`,{
            method:'PUT',
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${Cookies.get('token')}`
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json();
        return data;

    }catch(e){
        console.log(e)
    }
}