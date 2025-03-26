import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {

    try{
        await connecttoDB();
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');

        if(!id){
            return NextResponse.json({
                success:false,
                message:'You are not Logged in'
            })
        }
        const isAuthUser = AuthUser(req)
        if(isAuthUser){
            const getAllAddress = await Address.find({userID:id});
            if(getAllAddress){
                return NextResponse.json({
                    success:true,
                    data:getAllAddress
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'Failed to get Address! Pleae Try again later'
                })
            }

        }else{
            return NextResponse.json({
                success:false,
                message:'You are not Authorized'
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