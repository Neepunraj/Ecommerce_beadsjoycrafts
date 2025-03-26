import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const addNewProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
  
})

export const dynamic = "force-dynamic";

export async function POST(req) {

    try {
        const isAuthUser = await AuthUser(req)
        await connecttoDB();
       
        if (isAuthUser?.role === 'admin') {
            const extractData = await req.json();
            const {
                name,
                description,
                price,
                category,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl,

            } = extractData;
            const { error } = addNewProductSchema.validate({
                name,
                description,
                price,
                category,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl,
               

            })
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                })
            }


            const newlyCreatedProduct = await Product.create(extractData)

            if (newlyCreatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: 'Product Added Successfully'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Failed to Add the Product ! Please Try again'
                })
            }

        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not Authorized'
            })
        }


    } catch (err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: 'Something Went Wrong! please try again later'
        })

    }
}