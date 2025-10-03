import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export async function POST(userReqest: Request) {
    const ReadRequest = await userReqest.json()
    const prisma = new PrismaClient()
    try {
        const DBResponse = await prisma.user.findUnique({
           where:{user_email:ReadRequest.user_email}
        })
        const PickUserPassword = ReadRequest.user_password;
        if (!DBResponse || !PickUserPassword) {
            return NextResponse.json({ message: "no user found", status: 400})
        }
        const passwordCheck = await bcrypt.compare(PickUserPassword,DBResponse?.user_password)
        if (passwordCheck) {
            
            const private_key = process.env.PRIVATE_KEY?.replace(/\\n/g,"\n")
            if (!private_key) {
                return NextResponse.json({message:"empty access key!!",status:500})
            }
        const JWTToken = jwt.sign({user_id:DBResponse.id} ,private_key ,{algorithm:"RS256", expiresIn:"24h"})
        return NextResponse.json({message:"login success",token:JWTToken , status:200})
        } else {
            return NextResponse.json({message:"no user found" , status:400})
        }
    } catch (error:any) {
        return NextResponse.json({message:error.message})
    }
}