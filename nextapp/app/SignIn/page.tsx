import axios from "axios"
import { useState } from "react"

export default function Signin(){
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-amber-50 text-neutral-500">
            <div>
                <input type="text " placeholder="Enter your email" onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)}/>
                <button onClick={()=>
                    axios.post("http://localhost:3000/api/v1/Signin",{
                        email,
                        password
                    })
                }>Sign In</button>
            </div>
        </div>
    )
}