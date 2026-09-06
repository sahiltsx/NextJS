import axios from "axios";
import { useState } from "react"


export default function SignIn(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    return(
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="">
          <input type="text" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
          <button onClick={()=>
            axios.post("http://localhost:3000/api/v1/SignIn",{
                email,
                password
            })
          }>
            Sign in
          </button>
        </div>
      </div>
    )
}
