import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export  async function DELETE(req) {


    try{
        const isAuthUser = await AuthUser(req)
        
        await connecttoDB();
        if(isAuthUser?.role==='admin'){
            const {searchParams} = new URL(req.url)
        const id = searchParams.get('id')
        if(!id){
        
            return NextResponse.json({
                success: false,
                message: "Product ID is Required",
            });
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(deletedProduct){
            
            return NextResponse.json({
                success: true,
                message: "Product deleted Successfully",
            });
        }else{
            
            return NextResponse.json({
                success: false,
                message: "Failed to delete Product ! please Try Again",
            });
        }

        }else{
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
            });
        }
        

    }catch(error){
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });

    }
}
