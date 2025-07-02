"use server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const handleSignIn = async (previousState:unknown, formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

  
    const data = await res.json()
    
    if (!res.ok) {
        return {
          status:"Error",
          message:"Something went wrong"
        }
    }
    
   
    if(!data.token){
         return {
          status:"Error",
          message:"User not found"
        }
    }
    
    const token = data.token
    
    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2 //2 hr
    })
    redirect("/dashboard")

}