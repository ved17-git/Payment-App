"use server"

export const sendMoney=async(previousState:unknown, formData:FormData)=>{
  
  const amount=formData.get('amount')?.toString()

  if(amount?.length==0){
    return "error"
  }else{
   return "success"
  }
  
  
}