import jwt from "jsonwebtoken"

const JWT_SECRET=process.env.JWT_SECRET as string

export function signToken(payload:object){
    return jwt.sign(payload,JWT_SECRET,{expiresIn:"7d"})      // this function create jwt token 
}

export function verifyToken(token:string){
try{
   return jwt.verify(token,JWT_SECRET)
}catch(err){
   console.log("token wrong :",err)
}
}