import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function PUT(req) {
    try {
        await connecttoDB();
        const isAuthUser = await AuthUser(req)
        if (isAuthUser) {
            const data = await req.json();
            const { _id,
                fullName,
                address,
                city,
                country,
                postalCode, } = data;

            const updateAddress = await Address.findByIdAndUpdate(
                { _id: _id },
                {
                    fullName,
                    address,
                    city,
                    country,
                    postalCode,
                },
                {
                    new: true
                }
            )
            if (updateAddress) {
                return NextResponse.json({
                    success: true,
                    message: 'Address Updated Successfully'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'failed to update Address! please try again later'
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
            message: "Something went wrong ! Please try again later",
        });

    }
}