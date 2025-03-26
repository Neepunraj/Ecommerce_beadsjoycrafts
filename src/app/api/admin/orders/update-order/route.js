import connecttoDB from "@/database"
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function PUT(req){

    try{
        await connecttoDB();

        const isAuthUser = await AuthUser(req)
        const data = await req.json();
        if(isAuthUser?.role==='admin'){
            const {
                _id,
                orderItems,
                shippingAddress,
                paymentMethod,
                isPaid,
                paidAt,
                isProcessing,
            }= data
           const updateOrder = await Order.findOneAndUpdate(
            {_id:_id},
            {
                orderItems,
                shippingAddress,
                paymentMethod,
                isPaid,
                paidAt,
                isProcessing,
            },
            {
                new:true
            })
            if(updateOrder){
                return NextResponse.json({
                    success:true,
                    message:'Order Status updated Successfully'
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'Unable to update the status of the order'
                })
            }

        }else{
            return NextResponse.json({
                success:false,
                message:'You are not authorized'
            })
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'something Went Wrong Please Try again later'
        })
    }
}