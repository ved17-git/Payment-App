"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Deployed_URL } from "../config"

export const updateUser=async (previousState:unknown, formData:FormData)=>{

    const firstName=formData.get("firstName")?.valueOf()
    const lastName=formData.get("lastName")?.valueOf()
    const email=formData.get("email")?.valueOf()

    const cookieStore=await cookies()
    const token =cookieStore.get('token')?.value
  
    

    try {

      const res=await fetch(`${Deployed_URL}/updateUser`,{
        method:"PUT",
        headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body:JSON.stringify({firstName, lastName, email})
      })
       
    
      const data=await res.json()
      console.log(data);
      
    if (!res.ok) {
        return {
          status:"error",
          message:"Updation Error"
        }
    }
      
      revalidatePath('/profile')

        return {
          status:"success",
          message:"Updated Successfully"
        }
     

      
    } catch (error) {
      console.log("Cannot update the data", error);
      
    }
  
}


export const handleLogout=async ()=>{
      const cookieStore= await cookies()
  const token =cookieStore.get('token')?.value

    const res=await fetch(`${Deployed_URL}/logout`,{
    method:"POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    }
    })
    if(res.ok){
      const cookieStore= await cookies()
      cookieStore.delete('token')
      redirect('/')
    }else{
      return "Something Went Wrong"
    }
  }



