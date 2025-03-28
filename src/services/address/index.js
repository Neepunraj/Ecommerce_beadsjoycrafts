import Cookies from "js-cookie"

export const addNewAddress = async (formData)=>{

    try{
        const res = await fetch('/api/address/add-new-address',{
            method:'POST',
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${Cookies.get('token')}`
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json()
        return data;


    }catch(e){
        console.log(e)
    }

}
export const fetchAllAddress = async (id)=>{

    try{
        const res = await fetch(`/api/address/get-all-address?id=${id}`,
            {
                method:'GET',
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }
            }
        )
        const data = await res.json();
        return data;



    }catch(e){
        console.log(e)
    }

}

export const updateAddress = async (formData)=>{

    try{
        const res= await fetch('/api/address/update-address',{
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

export const deleteAddress = async (id)=>{

    try{
        const res = await fetch(`/api/address/delete-address?id=${id}`,{
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${Cookies.get('token')}`
            }
        })
        const data = await res.json();
        return data;


    }catch(e){
        console.log(e)
    }

}