import connecttoDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connecttoDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id')
        const getData = await Product.find({ category: id })
        if (getData) {
            return NextResponse.json({
                success: true,
                data: getData
            })
        } else {

            return NextResponse.json({
                success: false,
                status:204,
                message: "No Products Found",
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