"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { handleSignUp } from "./actions"
import { useActionState } from "react"
import { Spinner } from "@/components/ui/spinner"


function Page() {

  const [error, action, isLoading]= useActionState(handleSignUp, undefined)


  return (
    <>
        
            
<form action={action}  className="">
   <Card className="w-full max-w-sm mx-auto mt-[5%]" >
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
            <Link href='/signIn'><Button variant="link" type="button">Sign IN</Button> </Link>
        </CardAction>
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
                placeholder="First Name"
                required

              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="lastName"
                name="lastName"
                placeholder="Last Name"
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
                required

              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" name="password" placeholder="password" required />
            </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          {isLoading? <Spinner className="dark:text-black text-white"/> : 'Register' }
        </Button>

      </CardFooter>
      {error ? (<div className="text-center text-red-500">{error}</div>) : null}
    </Card>
    </form>
    </>
  );
}

export default Page;
