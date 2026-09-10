import prisma from "@/app/lib/db";
import { NextRequest ,NextResponse} from "next/server";
import { signToken } from "@/app/lib/auth";


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
        where:{email:email}
      })
      if(!user){
        return NextResponse.json({
            message:"Invalid email or password"
        },{
            status:401
        })
      }
      
      const token=signToken({userId:user.id})
      const response=NextResponse.json({
        success:true,
        user:{
          id:user.id,
          email:user.email,
        }
      })
      response.cookies.set("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax",     
        path:"/",
        maxAge:60*60*24*7   // 7 days
      })
      return response
    }catch(err){
        console.log(err)
        return NextResponse.json({
          message:"something went wrong"
        },{
          status:500
        })
    }
}