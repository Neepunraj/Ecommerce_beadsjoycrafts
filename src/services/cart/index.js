import Cookies from "js-cookie"

export const addToCart = async (formData)=>{
    try{
        const response = await fetch('/api/cart/add-to-cart',
            {
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${Cookies.get('token')}`
                },
                body:JSON.stringify(formData)
            }
        )
        const data = await response.json();
        return data;
        

    }catch(error){
        console.log(error)
    }
}
export const getAllCartItems = async (id)=>{
    try{
        const response = await fetch(`http://localhost:3000/api/cart/all-cart-item?id=${id}`,
            {
                method:'GET',
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }
            }
        )
        const data = await response.json();
        return data;

    }catch(error){
        console.log(error)
    }
}
export const deleteFromCart = async (id)=>{
    try{
        const response = await fetch(`http://localhost:3000/api/cart/delete-from-cart?id=${id}`,
            {
                method:'DELETE',
                headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }
            }
        )
        const data = await response.json();
        return data
        

    }catch(error){
        console.log(error)
    }
}