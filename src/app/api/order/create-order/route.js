import connecttoDB from "@/database"
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";


export async function POST(req){

    try{
        await connecttoDB();
        const isAuthUser = await AuthUser(req)
        if(isAuthUser){
            const data = await req.json();
            const {user} = data;
            const saveNewOrder = await Order.create(data)
            if(saveNewOrder){
                await Cart.deleteMany({userID:user});
                
                return NextResponse.json({
                    success:true,
                    mesage:'Products are on the way !'
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'Failed to create order! Please try again'
                })
            }

        }else{
            return NextResponse.json({
                success:false,
                message:'You are not authenticated'
            })
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'Something Went Wrong Please Try again!'

        })
    }
}