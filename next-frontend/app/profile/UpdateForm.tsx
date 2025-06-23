'use client'
import React, { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { updateUser } from "./actions";
import { handleLogout } from "./actions";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { toast } from "sonner";


type userType={
_id:string, 
firstName:string, 
lastName: string, 
email:string
}
type props={
    data:userType
}



function UpdateForm({data}:props) {
    

    
const [error, action, isLoading] = useActionState(updateUser, undefined)

 const [logoutError, logoutAction, LogoutLoading]=useActionState(handleLogout, "")

 useEffect(()=>{
  if(!error){
    return
  }
    if(error?.message=="error"){
      toast(error.message)
    }
    else{
      toast(error?.message)
    }
 },[error])



  return (
    <>
    <Button> <Spinner className="dark:text-black text-white"/> Loading...</Button>


<form action={action} className="">
   <Card className="w-full max-w-sm " >
      <CardHeader>
        <CardTitle>Update Your Account</CardTitle>
        <CardDescription>
          Update
        </CardDescription>
      </CardHeader>
      <CardContent>
        
        <div className="flex flex-col gap-6">

         <div className="flex gap-7">                    
           <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="firstName"
                name="firstName"
                placeholder="firstName"
                defaultValue={data?.firstName}
                required

              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="lastName"
                name="lastName"
                placeholder="m@example.com"
                defaultValue={data?.lastName}
                required

              />
         </div>
        </div> 
       
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                defaultValue={data?.email}
                required

              />
            </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
            {isLoading ?   <Spinner className="dark:text-black text-white"/> : 'Update'}
        </Button>
        {/* {error? error.message: null} */}
      </CardFooter>
      
    </Card>
    </form>


    <form action={logoutAction}>
         <Button type="submit">
                      {LogoutLoading? <Spinner className="dark:text-black text-white"/>: 'Logout' }
            
         </Button>
         {logoutError? logoutError : null}
    </form>

    </>
  );
}

export default UpdateForm;
