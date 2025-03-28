import connecttoDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export  async function GET(req){

    try{
        await connecttoDB();
        const {searchParams} = new URL(req.url)
        const productID = searchParams.get('id')
        if(!productID){
            return NextResponse.json({
                success:false,
                status:204,
                message:'Product id is Required'
            })
        }
        const getData = await Product.find({_id:productID})
        if(getData && getData.length){
            return NextResponse.json({
                success:true,
                data:getData[0]
            })
        }else{
            return NextResponse.json({
                success:false,
                message:'No Product Found'
            })
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'Something Went Wrong! Please Try Again Later'
        })
    }
}