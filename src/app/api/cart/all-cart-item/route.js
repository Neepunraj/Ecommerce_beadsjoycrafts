import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req) {

    try {
        await connecttoDB();

        const isAuthUser = await AuthUser(req)
        if (isAuthUser) {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: 'Please login in!'
                })
            }
            const extractAllCartITems = await Cart.find({ userID: id }).populate("productID")
            if (extractAllCartITems) {
                return NextResponse.json({
                    success: true,
                    data: extractAllCartITems
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'No Cart Items are Found!',
                    status: 204,

                })

            }

        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not Authenticated'
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Something Went wrong ! Please try again later'
        })

    }

}