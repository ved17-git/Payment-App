"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
import { useActionState } from "react"
import { Spinner } from "@/components/ui/spinner"

interface userData{
    firstName:string,
    lastName:string,
    email:string
}

interface props{
    data:userData[]
}


function DashboardPage({ data }:props) {
 

  const [error,action, isLoading]=useActionState(sendMoney,undefined)



  return (
    <>
      <div>dashboardPage</div>
 
    

 <div className=""> 
      {
        data.map((item, idx)=>( 

        <div key={idx} className="flex gap-3 py-3 my-3 bg-gray-600 item items-center justify-between px-16 mx-14 rounded-2xl text-white">
            <div> 
               <p>{item.firstName}</p>
               <p>{item.lastName}</p>
               <p>{item.email}</p>
               </div>

        <div>
             <Dialog>
  <DialogTrigger asChild>
    <Button>Pay</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Pay</DialogTitle>
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
      </div>

      <DialogFooter className="sm:justify-start mt-4">
        <DialogClose asChild> 
          <Button type="submit"> {isLoading? 'Paying...': 'Pay'}</Button>
         </DialogClose>
         {error? error : null}
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog> 

            </div>
        </div>

        ))
      }
   </div>





    </>
  );
}

export default DashboardPage;







