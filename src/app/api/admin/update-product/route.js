import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {

    try {
        const isAuthUser = await AuthUser(req)
        await connecttoDB();
        if (isAuthUser?.role === 'admin') {
            const extractData = await req.json();
            const { _id,
                name,
                 price,
                  description,
                category,
                sizes,
                deliveryInfo,
                onSale, 
                priceDrop,
                imageUrl

            } = extractData
            const updateProduct = await Product.findOneAndUpdate({
                _id: _id
            },
                {
                    name, 
                    price,
                     description,
                    category,
                    sizes,
                    deliveryInfo,
                    onSale,
                    priceDrop,
                    imageUrl
                }, {
                new: true
            })
            if (updateProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product Updated Successfully",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to Update! Please try again later",
                });
            }

        }else{
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
              });
        }


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }

}