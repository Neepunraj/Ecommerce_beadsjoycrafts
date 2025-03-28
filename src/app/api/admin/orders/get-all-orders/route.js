import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(req){
    try{
        await connecttoDB();
        const isAuthUser = await AuthUser(req)
        if(isAuthUser?.role === 'admin'){
            const getAllOrders = await Order.find({}).populate("orderItems.product").populate('user')
            if(getAllOrders){
                return NextResponse.json({
                    success:true,
                    data:getAllOrders
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'Failed to fetch the orders! please try again '
                })
            }
            

        }else{
            return NextResponse.json({
                success:false,
                message:'You are not Authenticated'
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

