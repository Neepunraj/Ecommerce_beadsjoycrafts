import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";
const AddtoCart = Joi.object(
    {
        userID:Joi.string().required(),
        productID:Joi.string().required()
    }
)

export const dynamic = "force-dynamic";
export async function POST(req){
    try{
        await connecttoDB();
        const isAuthUser = await AuthUser(req)
        console.log(isAuthUser)
        if(isAuthUser){
            const data = await req.json();
        const {productID,userID}= data;
        const {error} = AddtoCart.validate({userID,productID})
        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message,
            })
        }
        const isCurrentCartItemAlreadyExists = await Cart.find({
            productID:productID,
            userID:userID,
        })
        if(isCurrentCartItemAlreadyExists?.length>0){
            return NextResponse.json({
                success:false,
                message:'Product is Already Added in Cart'
            })
        }
        const saveProductToCart = await Cart.create(data)
        if(saveProductToCart){
            return NextResponse.json({
                success:true,
                message:'Product Added To Cart'
            })
        }else{
            return NextResponse.json({
                success:false,
                message:'Fail to add the Product to the cart'
            })
        }



        }else{
            return NextResponse.json1(
                {
                    success:false,
                    message:'You are not Authenticated'
                }
            )
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'Something went Wrong! Please try again'
        })
    }
}