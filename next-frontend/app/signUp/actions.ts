"use server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Deployed_URL } from "../config"

export const handleSignUp=async(previousState:unknown, formData:FormData):Promise<string>=>{

const firstName=formData.get("firstName")
  const lastName=formData.get("lastName")
  const email=formData.get("email")
  const password=formData.get("password")

  
    const res= await fetch (`${Deployed_URL}/signUp`,{
    method:"POST",
    headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify({ firstName, lastName, email, password })
  })
 
    const data = await res.json()
    if (!res.ok) {
      return data.message
    }
   
    const token = data.token
    
    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2 // 2 hr => 60x60 = 1 hr
    })
    
    redirect("/dashboard") 
  

}

