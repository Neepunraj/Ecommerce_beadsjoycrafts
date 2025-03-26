import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req){
    try{
        await connecttoDB();
        const isAuthUser = await AuthUser(req)
        
        if(isAuthUser){
            const {searchParams} = new URL(req.url);
            const id = searchParams.get('id');
            const extractAllOrders = await Order.find({user:id}).populate('orderItems.product')
            if(extractAllOrders){
                return NextResponse.json({
                    success:true,
                    data:extractAllOrders
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'Unable to get all the Orders! Please try again '
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
            message:'Something Went Wrong! Please Try again '
        })
    }
}