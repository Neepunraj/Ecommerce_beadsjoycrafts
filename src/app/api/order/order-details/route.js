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
            const {searchParams}= new URL (req.url);
            const id = searchParams.get('id');
            if(!id){
                return NextResponse.json({
                    success:false,
                    message:'Product ID is required'
                })
            }
            const extractOrdersDetails = await Order.findById(id).populate('orderItems.product')
            if(extractOrdersDetails){
                return NextResponse.json({
                    success:true,
                    data:extractOrdersDetails
                })

            }else{
                return NextResponse.json({
                    success:false,
                    message:'Failed to get Order Details! Please try again'
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