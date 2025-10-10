import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(userReqest: Request) {
    const prisma = new PrismaClient()
    const ReadRequest = await userReqest.json()
    try {

        const checkEmail = await prisma.user.findUnique({
            where: { user_email: ReadRequest.student_email }
        })

        if (checkEmail) {
            return NextResponse.json({
                message: "email already exists",
                status: 400
            })
        }

        const HashingPassword = await bcrypt.hash(ReadRequest.student_password, 10)
        const userRole = ReadRequest.role
    
 
        

        var AssignUserRole;
        if (!userRole) {
            AssignUserRole = "student"
        } else if (userRole == "student" || userRole == "teacher" || userRole == "parent") {
            AssignUserRole = userRole
        } else if (userRole == "admin") {
          return  NextResponse.json({
              message: "access denied",
              status:500
            })
        } else {
            return NextResponse.json({
                message: "invalid role",
                status:403
                
            })
        }

        const Subjects = [
            {
                "Teacher Yohanes": {
                    Subject01:"Mathematics",
                    Subject02:"Physics",
            }
            },
                 {
                "Teacher Nathan": {
                    Subject03:"Chemistry",
                    Subject04:"Biology",
                    Subject05:"Information Technology",
            }
            },
            {
                "Teacher Kaleb": {
                    Subject03:"Logistics",
                    Subject04:"Accounting",
            }
            },
            
        ]

          if (userRole == "parent") {
              const Parent = await prisma.user.create({
                  data: {
                   full_name: ReadRequest.student_name,
                   user_email: ReadRequest.student_email,
                   user_password: HashingPassword,
                    user_role: AssignUserRole,
                    user_profile: [
                    {
                        teacher_name: ReadRequest.student_name,
                        teacher_email: ReadRequest.student_email,
                        user_role: AssignUserRole,
                }
                ]
                   
                }
            })
              const GeezBankRegister = await prisma.geezBank.create({
                  data: {
                      name: ReadRequest.student_name,
                      email: ReadRequest.student_email,
                      balance:100
                    }
              })
     const private_key = process.env.PRIVATE_KEY?.replace(/\\n/g,"\n")
     if(!private_key) return NextResponse.json({message:"no acess key"})
     const user_token = jwt.sign({user_id:Parent.id},private_key,{algorithm:"RS256",expiresIn:"24h"})
     return NextResponse.json({ message: Parent, status: 200, token: user_token })
              
     }
        const RegisrationInfo = await prisma.user.create({
        data:{
            full_name: ReadRequest.student_name,
            user_email: ReadRequest.student_email,
            user_grade: ReadRequest.student_grade,
            user_section: ReadRequest.student_section,
            user_password: HashingPassword,
                user_role: AssignUserRole,
           
                user_profile: [
                    {
                        student_name: ReadRequest.student_name,
                        student_email: ReadRequest.student_email,
                        student_grade: ReadRequest.student_section,
                        user_role: AssignUserRole,
                        user_subject:Subjects
                }
                ],
                    user_subject:Subjects ,
        }
     })

     const private_key = process.env.PRIVATE_KEY?.replace(/\\n/g,"\n")
     if(!private_key) return NextResponse.json({message:"no acess key"})
     const user_token = jwt.sign({user_id:RegisrationInfo.id},private_key,{algorithm:"RS256",expiresIn:"24h"})
     return NextResponse.json({message:RegisrationInfo,status:200,token:user_token})
    } catch (error:any) {
   return NextResponse.json({message:error.message})
    }

}



