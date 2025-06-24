"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sendMoney } from "./actions"
import { useActionState, useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Send, Search, Users } from "lucide-react"


interface userData{
    firstName:string,
    lastName:string,
    email:string
}

interface props{
    data:userData[],
    balance:balance
}

interface balance{
  message:string,
  balance:{
    balance:number
  }
}



function DashboardPage({ data,balance }:props) {
 

  const [status,action, isLoading]=useActionState(sendMoney,undefined)

  useEffect(()=>{
   if(!status) return
   if(status.message=="error"){
    toast(status.message)
   }else{
    toast(status.message)
   }

  },[status])


console.log(balance);


  return (
    <>

  <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Wallet className="h-5 w-5" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              ${balance?.balance?.balance}
            </div>
            <p className="text-blue-100">Available to spend or transfer</p>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-1">
  {/* Users List */}
  <div className="lg:col-span-2">
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Send Money
            </CardTitle>
            <CardDescription>Choose a user to send money to</CardDescription>
          </div>
          <Badge variant="secondary">{data.length} users</Badge>
        </div>
        <div className="relative mt-4 sm:mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10 w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((user,idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              {/* Left side - Avatar and user info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              {/* Right side - Pay button */}
                      <div>
             <Dialog>
   <DialogTrigger asChild>
    <Button> <Send className="h-4 w-4" /> Pay</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle >Pay</DialogTitle>
      <DialogDescription>Select the amount</DialogDescription>
    </DialogHeader>
    <form action={action}>
      <div className="grid gap-4">
        <Label htmlFor="amount" className="sr-only">
          Amount
        </Label>
        <Input
          id="amount"
          name="amount"
          placeholder="Enter amount"
          type="number"
          required
        />
         <input type="hidden" name="email" value={user.email} />
      </div>

      <DialogFooter className="sm:justify-start mt-4">
          <Button type="submit"> {isLoading? <Spinner className="dark:text-black text-white"/>: 'Pay'}</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog> 

            </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
</div>



      </div>
    </div>








    </>
  );
}

export default DashboardPage;







