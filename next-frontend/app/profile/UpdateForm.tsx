'use client'
import React, { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { updateUser } from "./actions";
import { handleLogout } from "./actions";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { toast } from "sonner";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Shield, User } from "lucide-react"




type userType={
_id:string, 
firstName:string, 
lastName: string, 
email:string,
  balance:{
    balance:number
  }
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

    if(!logoutError){
    return
  }
    if(error?.message=="error"){
      toast(error.message)
    }
    else{
      toast(error?.message)
    }
 },[error, logoutError])



  return (
    <>
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and set email preferences.</p>
        </div>

        {/* Profile Information */}
      <form action={action}> 
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your profile information and how others see you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-4 justify-between">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile picture" />
                <AvatarFallback className="text-lg">{data.firstName[0]}{data.lastName[0]}</AvatarFallback>
              </Avatar>

              <div className="text-right">
    <p className="text-sm text-muted-foreground">Current Balance</p>
    <p className="text-xl font-semibold text-green-600">
      ${data.balance.balance.toFixed(2)}
    </p>
  </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" 
                type="firstName"
                name="firstName"
                defaultValue={data?.firstName} 
                required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe"   
                type="lastName"
                name="lastName"
                defaultValue={data?.lastName} 
                required/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com"                 
                name="email"
                defaultValue={data?.email}
                required />
              <p className="text-sm text-muted-foreground">This email will be used for account notifications.</p>
            </div>

          <Card className="mt-4">
          <CardContent className="space-y-6">

       <div className="flex items-center justify-between py-2  ">
          <p className="text-sm text-muted-foreground">Make sure to save your changes before leaving this page.</p>
          <div className="flex gap-2">
            <Button className="gap-2">
               {isLoading ?   <Spinner className="dark:text-black text-white"/> : 'Update'}
            </Button>
          </div>
        </div>

          </CardContent>
        </Card>
          </CardContent>
        </Card>

      </form>

       
 <form action={logoutAction}>
        <Card className="border-destructive mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              Session
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Sign Out</h4>
                <p className="text-sm text-muted-foreground">
                 Sign out of your account on this device.
                </p>
              </div>
              <Button variant="destructive" size="sm" type="submit">
                {LogoutLoading? <Spinner className="dark:text-black text-white"/>: 'Logout' }
              </Button>
            </div>
          </CardContent>
        </Card>
</form>

      </div>
    </div>







    </>
  );
}

export default UpdateForm;
