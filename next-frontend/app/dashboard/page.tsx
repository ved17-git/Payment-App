"use server"
import { cookies } from "next/headers";
import DashboardPage from "./DashboardPage";
import { Deployed_URL } from "../config";

interface allUsers {
  firstName: string;
  lastName: string;
  email: string;
}

interface balance{
  message:string,
  balance:{
    balance:number
  }
}

async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;


  const res = await fetch(`${Deployed_URL}/getUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if(!res.ok){
      console.log("fetching error");
      throw new Error
    }

  const data = await res.json();
  const users:allUsers[] = data.users; 


  const res2=await fetch(`${Deployed_URL}/currentBalance`,{
    method:"GET",
    headers:{
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json"
    }
  })
  if(!res.ok){
      console.log("fetching error");
      throw new Error
  }
  const balance:balance=await res2.json()
  

  return (
    <>
     
    <DashboardPage data={users} balance={balance}/>

    </>
  );
}

export default Page;
