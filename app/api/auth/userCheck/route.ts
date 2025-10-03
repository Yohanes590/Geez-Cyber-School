import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
export async function POST(request: Request) {
      const prisma = new PrismaClient()
      const {token} = await request.json()
      const secret = process.env.AUTHENTICATION_KEY
      if(!token) return NextResponse.json({message:"no token provider"})
      if (!secret) {
            return NextResponse.json({
                  massage:"there is no access key"
            })
      }
      try {
            const payload = jwt.verify(token, secret) as JwtPayload
             const userInformation = await prisma.user.findUnique({
                  where:{id:payload.user_id}
             })
             return NextResponse.json(userInformation?.user_profile)
         
      } catch (error:any) {
            return NextResponse.json({message:error.message})
      }
}

