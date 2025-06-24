"use server";

import { cookies } from "next/headers";
import UpdateForm from "./UpdateForm";
import { Suspense } from 'react'

type userType={
  _id:string,
  firstName:string,
  lastName:string,
  email:string,
  balance:{
    balance:number
  }
}


async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch("http://localhost:8000/CurrentUser", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  const user:userType=data

  console.log(user);
  
  

  return (
    <>
      <Suspense fallback={<p className="text-center">Loading....</p> }>
               <UpdateForm data={user}/>
      </Suspense>
    </>
  );
}

export default Page;
