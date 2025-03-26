import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function DELETE(req) {

    try{
        await connecttoDB();
        const {searchParams} = new URL(req.url)
        const id = searchParams.get('id')
        if(!id){
            return NextResponse.json({
                success:false,
                message:'Address ID is required'
            })
        }
        const isAuthUser = await AuthUser(req)
        if(isAuthUser){
            const deleteAddress = await Address.findByIdAndDelete(id)
            if(deleteAddress){
                return NextResponse.json({
                    success:true,
                    message:'Address Deleted Successfully'
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'Unable to Delete Address! Please try again later'
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
            message:'Something went wrong please Try Again Later'
        })
    }
    
}