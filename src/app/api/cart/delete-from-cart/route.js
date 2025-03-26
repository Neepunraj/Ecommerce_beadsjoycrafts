import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function DELETE(req) {
    
    try{
        await connecttoDB();
        const isAuthUser = await AuthUser(req)
        if(isAuthUser){
            const {searchParams} = new URL(req.url);
            const id = searchParams.get('id')
            if(!id){
                return NextResponse.json({
                    success:false,
                    message:'Cart Item Id is Required'
                })
            }
            const deleteCartItem = await Cart.findByIdAndDelete(id)
            if(deleteCartItem){
                return NextResponse.json({
                    success:true,
                    message:'Cart Item Deleted Successfully'
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'Failed to Delete Cart Item! Please Try Again'
                })
            }

        }else{
            return NextResponse({
                success:false,
                message:'You are not Authenticated'
            })
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again",
          });
    }
    
}