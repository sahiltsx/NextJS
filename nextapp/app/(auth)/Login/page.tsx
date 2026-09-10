"use client"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"


export default function login(){
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState<string|null>(null)


    const route=useRouter();

    async function handleLogin(e:React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res=await axios.post("/api/v1/login",{
                email,
                password
            },
                {
                headers:{
                    "Content-Type":"application/json"
                },
              
            })

            const data=await res.data()
            if(!res.data){
               setError(data.error || "Login failed")
            return
            }
            route.push("/")
        } catch (err) {
            console.error("Something went wrong.please try again",err)
        }
        finally{
            setLoading(false)
        }
    }

    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
           <form 
           onSubmit={handleLogin}
           className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
           >
           <h1 className="text-2xl font-semibold text-center">Login</h1>
           <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
             />
           </div>
        <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
             type="password"
             value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500"
             />
        </div>
        {error && <p className="text-red-500 text-sm">error</p>}

        <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 disabled:opacity-50"
        >
         {loading ?"Logging in....":"Login"}
        </button>
           </form>
        </div>
    )
}