"use server";

import { cookies } from "next/headers";
import UpdateForm from "./UpdateForm";
import { Suspense } from 'react'
import { Deployed_URL } from "../config";

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

  const res = await fetch(`${Deployed_URL}/CurrentUser`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  const user:userType=data
  

  return (
    <>
      <Suspense fallback={<p className="text-center">Loading....</p> }>
               <UpdateForm data={user}/>
      </Suspense>
    </>
  );
}

export default Page;
