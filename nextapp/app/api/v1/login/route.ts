import prisma from "@/app/lib/db";
import { NextRequest ,NextResponse} from "next/server";
import bcrypt from "bcrypt"


export async function POST(req:NextRequest) {
    try{
      const {email,password}=await req.json()

      if(!email || !password){
        return NextResponse.json({
            message:"Email or password is required",
        },{
            status:400
        })
      }

      const user=await prisma.user.findUnique({
        where:email
      })
      if(!user){
        return NextResponse.json({
            message:"Invalid email or password"
        },{
            status:401
        })
      }
      const isValidPassword=await bcrypt.compare(password,user.password)

      if(!isValidPassword){
        return NextResponse.json({
            message:"Password is not valid"
        },{
            status:401
        })
      }
    }catch(err){


    }
}