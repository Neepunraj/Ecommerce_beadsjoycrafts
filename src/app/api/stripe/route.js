import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";
const stripe = require('stripe')(
    "sk_test_51PqEEhRogN8CI6sDKCbDE7lb8k0lwI0VaFBcFkOfVuVLUTMaJWVWwARR1T9Gmz1krNRQeFWq5DZNxyMBEZwcgdDq00X0nPLbEV"
)

export async function POST(req) {
    try {
        const isAuthUser = await AuthUser(req);
        if(isAuthUser){
            const res = await req.json();
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: res,
                mode: "payment",
                success_url: "http://localhost:3000/checkout" + "?status=success",
                cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
    
            })
            return NextResponse.json({
                succes:true,
                id:session.id,
            })

        }else {
            return NextResponse.json({
                succes:false,
                message:'You are not Authenticated'
            })
        }

      


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            status: 500,
            message: 'Something Went Wrong Please Try Again Later'

        })
    }
}