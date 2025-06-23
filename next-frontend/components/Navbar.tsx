"use server"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
  import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ModeToggle } from "./ModeToggle";

async function Navbar() {


const cookieStore = await cookies()
const token =cookieStore.get('token')?.value
  
  return (
    <>
          <div className="flex justify-between items-center px-[16vh] py-[4vh] border-b-2">
         <Link href='/dashboard' className="text-3xl font-bold">Paytm</Link>
         <div className="flex gap-5"> 
{token ? (
  <Link href="/profile">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </Link>
) : (
  <>
    <Link href="/signIn"><Button>Login</Button></Link>
    <Link href="/signUp"><Button>SignUp</Button></Link>
  </>
)}

          <div>
            <ModeToggle/>
          </div>
         
         
         </div>
      </div>
    </>
  );
}

export default Navbar;
