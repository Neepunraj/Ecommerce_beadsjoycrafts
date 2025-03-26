import connecttoDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const AddNewAddress = Joi.object(
    {
        userID: Joi.string().required(),
        fullName: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        postalCode: Joi.string().required(),
    }
)
export async function POST(req) {
    try {
        await connecttoDB();
        const isAuthUser = await AuthUser(req)
        if (isAuthUser) {
            const data = await req.json();
            const {
                userID,
                fullName,
                address,
                city,
                country,
                postalCode,
            } = data
            const { error } = AddNewAddress.validate({
                userID,
                fullName,
                address,
                city,
                country,
                postalCode,
            })
            if(error){
                return NextResponse.json({
                    success:false,
                    message:error.details[0].message
                })

            }
            const newlyCreatedAddress = await Address.create(data)
            if(newlyCreatedAddress){
                return NextResponse.json({
                    success:true,
                    message:'Address Added Successfully'
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'Failed to Add an Address! Please Try again later'
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