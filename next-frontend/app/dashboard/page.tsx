"use server"
import { cookies } from "next/headers";
import DashboardPage from "./DashboardPage";

interface allUsers {
  firstName: string;
  lastName: string;
  email: string;
}

async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;


  const res = await fetch("http://localhost:8000/getUsers", {
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

  return (
    <>
    
    <DashboardPage data={users}/>

    </>
  );
}

export default Page;
