"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const sendMoney=async(previousState:unknown, formData:FormData)=>{

  const cookieStore=await cookies()
  const token=cookieStore.get('token')?.value
  
  const amountStr=formData.get('amount')?.toString()
  const email=formData.get('email')?.toString()
  const amount= amountStr ? parseInt(amountStr) : null

  const res=await fetch("http://localhost:8000/transfer",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json",
    },
    body:JSON.stringify({amount,email})
  })
  console.log(amount ,email);
  
 const data=await res.json()
 
  if(!res.ok){
    return{
      status:"error",
      message:data.message
    }
  }
  else{
     revalidatePath('/dashboard')
      return{
      status:"success",
      message:"Amount Sent Successfully"
    }
  }
  
  

  
}