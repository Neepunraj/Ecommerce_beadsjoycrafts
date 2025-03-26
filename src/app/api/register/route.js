import connecttoDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    role:Joi.string().required(),
})

export const dynamic = "force-dynamic"; 

export async function POST(req) {
    await connecttoDB();
    const {name,email,password,role} = await req.json();
    //validate the schmena
    const {error} = schema.validate({name,email,password,role});
    
    if(error){
        
        return NextResponse.json({
            success:false,
            message:error.details[0].message
        })
    }

    try{
        const isUserAlreadyExists = await User.findOne({email});
        if(isUserAlreadyExists){
            return NextResponse.json({
                success:false,
                message:"User already exists. Please Try again Later"
            })
        }else{
            const hashPassword = await hash(password,12);
            const newlyCreatedUser = await User.create({
                name,
                email,
                password:hashPassword,
                role,
            })
            if(newlyCreatedUser){
                return NextResponse.json({
                    success:true,
                    message:"Account Created Successfully"
                })
            }



        }

    }catch(error){
        console.log('Error in new User Registration')
    
    return NextResponse.json({
        success:false,
        message:'Something Went Wrong! please try again later'
    })
}
}