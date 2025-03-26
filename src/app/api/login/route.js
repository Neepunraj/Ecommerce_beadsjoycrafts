import connecttoDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const dynamic = "force-dynamic";
export async function POST(req) {

    await connecttoDB();

    const { email, password } = await req.json();

    const { error } = schema.validate({ email, password })

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message
        })
    }

    try {
        const checkUser = await User.findOne({ email })
        if (!checkUser) {
            return NextResponse.json({
                success: false,
                message: 'Account not found with this email'
            })
        }
        const checkPassword = await compare(password, checkUser.password);
        if (!checkPassword) {
            return NextResponse.json({
                success: false,
                message: 'Incorrect password please try again!'
            })
        }
        const token = jwt.sign(
            {
                id: checkUser._id,
                email: checkUser?.email,
                role: checkUser?.role,

            },
            'default_secret_key',
            { expiresIn: '1d' }
        )
        const finalData = {
            token,
            user: {
                email: checkUser.email,
                name: checkUser.name,
                _id: checkUser._id,
                role: checkUser.role

            }
        }
        return NextResponse.json({
            success: true,
            message: 'login Successful',
            finalData
        });





    } catch (e) {
        console.log('Error while Login in Plese try Again')
        return NextResponse.json({
            success: false,
            message: 'Something Went wrong ! pleae try again later'
        })

    }


}